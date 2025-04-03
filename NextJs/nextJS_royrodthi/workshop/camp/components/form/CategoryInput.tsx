import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categories } from "@/utils/category"

const CategoryInput = ({ defaultValue }: { defaultValue?: string }) => {

    const name = "category"

    return (
        <div className="mb-4">
            <Label htmlFor={name} className="capitalize">
                {name}
            </Label>
            <Select
                name={name}
                defaultValue={defaultValue || categories[0].label}
                required>

                <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>
                    {
                        categories.map((item, index) => {
                            return <SelectItem key={index} value={item.label}>
                                <span className="capitalize flex items-center gap-2">
                                    < item.icon />
                                    {item.label}
                                </span>
                            </SelectItem>
                        })
                    }

                </SelectContent>
            </Select>

        </div>
    )
}
export default CategoryInput