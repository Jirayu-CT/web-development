"use client"
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader } from 'lucide-react';


type btnSize = 'default' | 'sm' | 'lg'

type SubmitButtonProps = {
    className?: string
    size?: btnSize
    text?: string
}

export const SubmitButton = (props: SubmitButtonProps) => {
    //code body
    const { pending, data, method, action } = useFormStatus();
    const { className, size, text } = props

    return (
        <Button
            disabled={pending}
            className={`${className} capitalize`}
            type="submit"
            size={size}
        >
            {
                pending
                    ? <Loader className="animate-spin" />
                    : <p>{ text }</p>
            }


        </Button>
    )
}