"use client"
import { use, useActionState } from "react"
import { toast } from "sonner"
import { useEffect } from "react"
import { actionFuncion } from "@/utils/types"

const initialState = {
    message: ''
}


const FormContainer = ({ action, children }: { action: actionFuncion, children: React.ReactNode }) => {
    const [state, formAction] = useActionState(action, initialState)
    console.log('FormContainer state:', state)

    useEffect(() => {
        //code body
        if (state.message) {
            toast(state.message)
        }
    }, [state])


    return (
        <form action={formAction}>
            {children}
        </form>
    )
}
export default FormContainer