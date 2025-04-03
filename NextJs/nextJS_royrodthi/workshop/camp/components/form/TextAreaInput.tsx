import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import { string } from "zod"


type TextAreaImputProps = {
    name: string
    labelText?: string
    defaultValue?: string
}

const TextAreaInput = ({ name, labelText, defaultValue }: TextAreaImputProps) => {

    return (
        <div className="mb-4">
            <Label htmlFor={name} className="capitalize">
                {labelText || name}
            </Label>
            <Textarea
                id={name}
                name={name}
                defaultValue={defaultValue}
                rows={5}
                required
            />
        </div>
    )
}
export default TextAreaInput