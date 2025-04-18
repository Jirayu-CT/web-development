import { useState, useEffect } from "react"
import { createCategory, listCategory, removeCategory } from "../../api/Category"
import useEcomStore from '../../store/ecom-store'
import { toast } from 'react-toastify';

const FromCategory = () => {
    //js
    const token = useEcomStore((state) => state.token)
    const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useEcomStore((state) => state.categories)
    const getCategory = useEcomStore((state) => state.getCategory)

    useEffect(() => {
        getCategory(token)
    }, [])

    


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warning('Please enter a category name')
        }

        try {
            const res = await createCategory(token, { name })
            console.log(res.data.name)
            toast.success(`Add Category ${res.data.name} created successfully`)
            getCategory(token)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleRemove = async(id) => {
        console.log(id)

        try{
            const res = await removeCategory(token, id)
            console.log(res.data.name)
            toast.success(`Category ${res.data.name} deleted successfully`)
            getCategory(token)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1>Category Management</h1>
            <form className="my-4" onSubmit={handleSubmit} >
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="border "
                />

                <button className="bg-blue-500 px-2 rounded-md">Add Category</button>

            </form>

            <hr />
            <ul className="list-none">
                {
                    categories.map((item, index) =>
                        <li
                            key={index}
                            className="flex justify-between my-2"
                        >
                            <span>
                                {item.name}
                            </span>
                            <button
                            className="bg-red-500 text-white px-2 rounded"
                            onClick={() => handleRemove(item.id)}
                            >Delete</button>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}
export default FromCategory