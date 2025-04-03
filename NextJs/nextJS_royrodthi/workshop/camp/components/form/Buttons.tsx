"use client"
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Heart, Loader } from 'lucide-react';
import { SignInButton } from "@clerk/nextjs";


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
                    ?
                    <>
                        <Loader className="animate-spin" />
                        <span>Please wait...</span>
                    </>
                    : <p>{text}</p>
            }


        </Button>
    )
}

export const SignInCardButton = () => {
    return (
        <SignInButton mode='modal'>
            <Button size='icon' variant='outline'>
                <Heart />
            </Button>
        </SignInButton>
    )
}

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
    const { pending } = useFormStatus()
    return <Button
        type="submit"
        size='icon'
        variant='outline'
    >

        {
            pending
            ? <Loader className="animate-spin" />
            : isFavorite
            ? <Heart fill="black" />
            : <Heart />
        }
    </Button>
}