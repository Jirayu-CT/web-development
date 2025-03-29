'use server'

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const createCamps = async (prevState: any, formData: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // const title = formData.get("title")
    // const location = formData.get("location")

    const rawData = Object.fromEntries(formData)
    console.log(rawData)
    //prisma.camps.create()
    revalidatePath('/camp') //การรีเฟรชข้อมูล
    // redirect('/') //ให้ไปที่หน้า camp
    return 'Crate Camps success.'
}

export const fetchCamps = async () => {
    //prisma.camps.findMany({})
    const camps = [
        {
            id: 1,
            title: "buriram"
        }
        , {
            id: 2,
            title: "surin"
        }
        , {
            id: 3,
            title: "satuek"
        }
    ]
    return camps
}