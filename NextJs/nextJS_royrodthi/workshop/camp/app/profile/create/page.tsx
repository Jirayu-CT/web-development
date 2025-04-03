import { createProfileAction } from "@/actions/actions"
import { SubmitButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const CreateProfile = async() => {
    const user = await currentUser()
    if(user?.privateMetadata.hasProfile) redirect('/')

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">New User</h1>
            <div className="justify-center mx-auto border p-8 rounded border-gray-300 shadow-md">
                <FormContainer action={createProfileAction}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormInput name="firstName" label="Fist Name" type="text" placeholder="Enter your first name" defaultValue="jirayu" />
                        <FormInput name="lastName" label="Last Name" type="text" placeholder="Enter your last name" defaultValue="chomthong" />
                        <FormInput name="userName" label="User Name" type="text" placeholder="Username" defaultValue="lxibel" />
                    </div>
                    <SubmitButton text="Create Profile" size='lg' className="" />
                </FormContainer>
            </div>
        </section>
    )

}
export default CreateProfile