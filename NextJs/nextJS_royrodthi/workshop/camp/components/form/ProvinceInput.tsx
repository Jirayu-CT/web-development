import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { provinces } from "@/utils/provinces"

const ProvinceInput = ({ defaultValue }: { defaultValue?: string }) => {

    const name = "province"

    return (
        <div className="mb-4">
            <Label htmlFor={name} className="capitalize">
                {name}
            </Label>
            <Select
                name={name}
                defaultValue={defaultValue || provinces[0].PROVINCE_NAME}
                required>

                <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                </SelectTrigger>
                <SelectContent>


                    {
                        provinces.map((item) => {
                            return <SelectItem key={item.PROVINCE_ID} value={item.PROVINCE_NAME}>
                                <span className="capitalize flex items-center gap-2">
                                    {item.PROVINCE_NAME}
                                </span>
                            </SelectItem>
                        })
                    }


                </SelectContent>
            </Select>

        </div>
    )
}
export default ProvinceInput