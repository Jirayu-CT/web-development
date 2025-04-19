import { useState } from 'react'
import { toast } from 'react-toastify'
import Resize from 'react-image-file-resizer'
import { removeFile, uploadFiles } from '../../api/product'
import useEcomStore from '../../store/ecom-store'

const Uploadfile = ({ form, setForm }) => {

    const [isLoading, setIsLoading] = useState(false)
    const token = useEcomStore((state) => state.token)

    const handleOnChange = (e) => {
        const files = e.target.files

        if (files) {
            setIsLoading(true)
            let allFiles = form.images //[] empty array

            for (let i = 0; i < files.length; i++) {
                // console.log(files[i])

                //Validate file type
                const file = files[i]
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} is not an image`)
                    continue
                }

                //Image Resize
                Resize.imageFileResizer(
                    files[i],
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        console.log('UploadFile Data', data)
                        //fuction to upload image to server
                        uploadFiles(token, data)
                            .then((res) => {
                                // console.log(res)
                                allFiles.push(res.data)

                                setForm({
                                    ...form,
                                    images: allFiles
                                })
                                toast.success('Image uploaded successfully')

                            })
                            .catch((err) => {
                                console.log(err)
                                toast.error('Error uploading image')
                            })
                    },
                    "base64"
                )
            }

        }

    }

    console.log('form', form)
    const handleRemoveImage = (public_id) => {
        const images = form.images
        removeFile(token, public_id)
            .then((res) => {
                // console.log(res)
                const filterImages = images.filter((item) => {
                    console.log(item)
                    return item.public_id !== public_id
                })

                // console.log('FilterImages: ', filterImages)
                setForm({
                    ...form,
                    images: filterImages
                })
                toast.error(res.data)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Error remove image')
            })
    }

    return (
        <div className='my-4'>


            <div className='flex mx-4 gap-4 my-4'>
                {/* Image */}
                {
                    form.images.map((item, index) =>
                        <div className='relative' key={index}>
                            <img
                                className='w-24 h-24 hover:scale-105 transition-all duration-300'
                                src={item.url}
                            />
                            <span
                                className='absolute top-0 right-0 bg-red-500 p-1 rounded-md cursor-pointer'
                                onClick={() => handleRemoveImage(item.public_id)}
                            >X</span>
                        </div>
                    )
                }
            </div>


            <div>
                <input
                    onChange={handleOnChange}
                    type="file"
                    name="images"
                    multiple
                />
            </div>
        </div>
    )
}
export default Uploadfile