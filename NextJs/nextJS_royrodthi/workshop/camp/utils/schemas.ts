import { z, ZodSchema } from 'zod'

// const profileSchema = z.string().min(2, {message: 'First name must be at least 2 characters long'}).max(50, {message: 'First name must be at most 50 characters long'})

export const profileSchema = z.object({
    firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }).max(50, { message: 'First name must be at most 50 characters long' }),
    lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }).max(50, { message: 'Last name must be at most 50 characters long' }),
    userName: z.string().min(2, { message: 'User name must be at least 2 characters long' }).max(50, { message: 'User name must be at most 50 characters long' }),
})


const validateImage = () => {
    const maxFileSize = 1024 * 1024 * 10 // 10MB
    return z.instanceof(File)
        .refine((file) => {
            return file.size <= maxFileSize
        }, 'File size must be less than 1MB')
}

export const imageSchema = z.object({
    image: validateImage()
})


export const landmarkSchema = z.object({
    name: z.string().min(2, {message: 'Landmark name must be at least 2 characters long'}).max(50, {message: 'Landmark name must be at most 50 characters long'}),
    category: z.string(),
    description: z.string().min(2, {message: 'Description must be at least 2 characters long'}).max(500, {message: 'Description must be at most 500 characters long'}),
    price: z.coerce.number().int().min(0, {message: 'The price must be greater than 0.'}),
    province: z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
})


export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
    const result = schema.safeParse(data)
    // ถ้าทำไม่สำเร็จให้แสดง error message false
    if (!result.success) {
        const errors = result.error?.errors.map((error) => error.message)
        throw new Error(errors.join(', '))
    }
    return result.data
}