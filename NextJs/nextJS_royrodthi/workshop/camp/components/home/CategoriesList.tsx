import { categories } from "@/utils/category"
import Link from "next/link"

const CategoriesList = ({ search, category }: { search?: string, category?: string }) => {
    const searchTerm = search ? `$search=${search}` : ''
    return (
        <div>
            <div className="flex justify-center items-center my-5 text-bold">
                {

                    categories.map((item) => {
                        const isActive = item.label === category
                        return (
                            <Link
                                key={item.label}
                                href={`/?category=${item.label}${searchTerm}`}>
                                <article className={`flex flex-col p-3 justify-center items-center 
                                    hover:text-primary hover:scale-105 hover: duration-300
                                    ${isActive ? 'text-primary' : ''}
                                    `}>
                                    <item.icon />
                                    <p>
                                        {item.label}
                                    </p>
                                </article>
                            </Link>
                        )
                    })

                }
            </div>
        </div>
    )
}
export default CategoriesList