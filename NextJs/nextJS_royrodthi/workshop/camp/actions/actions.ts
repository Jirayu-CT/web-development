'use server'

import { profileSchema, validateWithZod, imageSchema, landmarkSchema } from "@/utils/schemas"
import { clerkClient, currentUser } from "@clerk/nextjs/server"
import db from '@/utils/db'
import { redirect } from "next/navigation"
import { uploadFile } from "@/utils/supabase"
import { ChartNoAxesColumnIcon } from "lucide-react"
import { revalidatePath } from "next/cache"


const getAuthUser = async () => {
    //code body
    const user = await currentUser()
    if (!user) throw new Error('User not logged in')

    if (!user.privateMetadata.hasProfile) redirect('/profile/create')

    return user
}


const renderError = (error: unknown): { message: string } => {
    //code body
    return {
        message: error instanceof Error ? error.message : 'ServerError: creating profile'
    }
}

export const createProfileAction = async (prevState: any, formData: FormData) => {
    try {
        const user = await currentUser()
        if (!user) throw new Error('User not logged in');

        const rewData = Object.fromEntries(formData)
        const validateField = validateWithZod(profileSchema, rewData)
        // console.log("validated: ", validateField)
        // return { message: 'Profile created successfully!' }


        await db.profile.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
                profileImage: user.imageUrl ?? '',
                ...validateField
            }
        })

        const client = await clerkClient()
        await client.users.updateUserMetadata(user.id, {
            privateMetadata: {
                hasProfile: true
            }
        })
    }
    catch (error) {
        // console.error('Error creating profile:', error)
        return renderError(error)
    }
    redirect('/')
}


export const createLandmarkAction = async (prevState: any, formData: FormData): Promise<{ message: string }> => {
    try {
        const user = await getAuthUser()
        const rewData = Object.fromEntries(formData)
        const file = formData.get('image') as File
        //step 1: Validate the data
        const validateFile = validateWithZod(imageSchema, { image: file })
        const validateField = validateWithZod(landmarkSchema, rewData)
        // console.log("validated: ", rewData)
        // console.log("validated action: ", validateFile)
        // console.log("validated field: ", validateField)

        //Step2: Upload Image to Superbase
        const fullPath = await uploadFile(validateFile.image)
        // console.log("fullPath: ", fullPath)

        //Step3: Save the data to DB
        await db.landmark.create({
            data: {
                ...validateField,
                image: fullPath,
                profileId: user.id
            }
        })

        // return { message: 'Landmark created successfully!' }
    }
    catch (error) {
        // console.error('Error creating profile:', error)
        return renderError(error)
    }
    redirect('/')
}


export const fetchLandmaeks = async ({ search = '', category }: { search?: string, category?: string }) => {

    const landmarks = await db.landmark.findMany({
        where: {
            category: category,
            OR: [
                {
                    name: { contains: search, mode: 'insensitive' }
                }
                , {
                    description: { contains: search, mode: 'insensitive' }
                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return landmarks
}
export const fetchLandmarksHero = async () => {

    const landmarks = await db.landmark.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
    })
    return landmarks
}


export const fetchFavoriteId = async ({ landmarkId }: { landmarkId: string }) => {
    const user = await getAuthUser()
    const favorite = await db.favorite.findFirst({
        where: {
            landmarkId: landmarkId,
            profileId: user.id
        },
        select: {
            id: true
        }
    })

    return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
    favoriteId: string | null;
    landmarkId: string;
    pathname: string;
}) => {
    const { favoriteId, landmarkId, pathname } = prevState
    const user = await getAuthUser()

    try {
        //delete
        if (favoriteId) {
            await db.favorite.delete({
                where: {
                    id: favoriteId
                }
            })
        }
        //create
        else {
            await db.favorite.create({
                data: {
                    landmarkId: landmarkId,
                    profileId: user.id
                }
            })
        }

        revalidatePath(pathname)
        return { message: favoriteId ? 'Removed Favorite Seccessfully!' : 'Added Favorite Successfully!' }
    }
    catch
    (error) {
        return renderError(error)
    }

}

export const fetchFavorits = async () => {
    const user = await getAuthUser()
    const favorites = await db.favorite.findMany({
        where: {
            profileId: user.id
        },
        select: {
            landmark: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    description: true,
                    price: true,
                    province: true,
                    lat: true,
                    lng: true,
                    category: true,
                }
            }
        }
    })

    return favorites.map((favorite) => favorite.landmark)

}


export const fetchLandmarkDetail = async ({ id }: { id: string }) => {
    return db.landmark.findFirst({
        where: {
            id: id
        },
        include:{
            profile: true
        }
    })
}