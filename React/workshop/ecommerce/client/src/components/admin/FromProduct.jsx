import { toast } from "react-toastify"
import { createProduct } from "../../api/product"
import useEcomStore from "../../store/ecom-store"
import { useEffect, useState } from "react"
import Uploadfile from "./Uploadfile"

const initialSatate = {
    title: "GeForce RTX 4090 super",
    description: "desc",
    price: 50500,
    quantity: 5,
    categoryId: '',
    images: []
}

const FromProduct = () => {
    const token = useEcomStore((state) => state.token)

    const getCategory = useEcomStore((state) => state.getCategory)
    const categories = useEcomStore((state) => state.categories)

    const getProduct = useEcomStore((state) => state.getProduct)
    const products = useEcomStore((state) => state.products)
    // console.log(products)

    const [form, setForm] = useState(initialSatate)



    useEffect(() => {
        getCategory(token)
        getProduct(token, 10)
    }, [])

    const handleOnChange = (e) => {
        console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await createProduct(token, form)
            toast.success(`Add Product ${res.data.title} created successfully`)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
            <form onSubmit={handleSubmit}>
                <h1>เพิ่มข้อมูลสินค้า</h1>
                <input
                    type="text"
                    className="border"
                    value={form.title}
                    onChange={handleOnChange}
                    placeholder="ชื่อสินค้า"
                    name="title"
                />

                <input
                    type="text"
                    className="border"
                    value={form.description}
                    onChange={handleOnChange}
                    placeholder="description"
                    name="description"
                />
                <input
                    type="number"
                    className="border"
                    value={form.price}
                    onChange={handleOnChange}
                    placeholder="price"
                    name="price"
                />
                <input
                    type="number"
                    className="border"
                    value={form.quantity}
                    onChange={handleOnChange}
                    placeholder="quantity"
                    name="quantity"
                />
                <select
                    className="border"
                    name="categoryId"
                    onChange={handleOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value="" disabled>Please Select</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id}>{item.name}</option>
                        )
                    }
                </select>
                <hr />
                {/* Upload file */}
                <Uploadfile form={form} setForm={setForm} />

                <button className="bg-blue-500">เพิ่มข้อมูลสินค้า</button>

                <hr />
                <br />
                <table className="table w-full table-auto border-collapse border border-slate-400">
                    <thead className="bg-gray-200">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">ชื่อสินค้า</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ราคา</th>
                            <th scope="col">จำนวน</th>
                            <th scope="col">ขายแล้ว</th>
                            <th scope="col">วันที่อัพเดท</th>
                            <th scope="col">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {
                            products.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{index+1}</th>
                                        <td>{ item.title }</td>
                                        <td>{ item.description }</td>
                                        <td>{ item.price }</td>
                                        <td>{ item.quantity }</td>
                                        <td>{ item.sold }</td>
                                        <td>{ item.updatedAt }</td>
                                        <td>
                                            <button className="bg-red-500">ลบ</button>
                                            <button className="bg-blue-500">แก้ไข</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </form>
        </div>
    )
}
export default FromProduct