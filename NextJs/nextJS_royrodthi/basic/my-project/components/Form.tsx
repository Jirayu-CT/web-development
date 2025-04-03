'use client';
import { createCamps } from "@/utils/actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";


const SubmitButton = () => {
    const { pending } = useFormStatus();
    return <button type="submit" disabled={pending}>
        {pending ? "Submitting..." : "Submit"}
    </button>
}

const Form = () => {
    const [message, formAcrion] = useActionState(createCamps, null)


    return (
        <>
            {message && <p>{message}</p>}
            <form action={formAcrion} className="mb-4">
                Form
                <input
                    className="border"
                    placeholder="Camping Name"
                    name="title"
                    defaultValue={"buriram route 3070"}
                />

                <input
                    className="border"
                    placeholder="location"
                    name="location"
                    defaultValue={"buriram"}
                />
                <SubmitButton />
            </form>
        </>
    )
}
export default Form