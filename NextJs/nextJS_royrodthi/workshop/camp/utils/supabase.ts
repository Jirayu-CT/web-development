import { createClient } from '@supabase/supabase-js'


const bucket_name = 'landmark-bucket'
const url = process.env.SUPABASE_URL as string
const key = process.env.SUPABASE_KEY as string

// Create Supabase client
const supabase = createClient(url, key)

// Upload file using standard upload
export const uploadFile = async (image: File) => {

    const timeStamp = Date.now()
    const newName = `Jirayu-${timeStamp}-${image.name}`

    const { data, error } = await supabase.storage
    .from(bucket_name)
    .upload(newName, image,  {
        cacheControl: '3600'
    })


    if (!data) throw new Error('Error uploading file!!!');
    // const { data } = supabase.storage.from('bucket').getPublicUrl('filePath.jpg')
    // console.log(data.publicUrl)


    return supabase.storage.from(bucket_name).getPublicUrl(newName).data.publicUrl;

}