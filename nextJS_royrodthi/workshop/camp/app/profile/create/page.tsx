
import { SubmitButton } from "@/components/form/Buttons"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"

const createProfileAction = async (prevState: any, formData: FormData) => {
    'use server'
    const firstName = formData.get('firstName') as string
    // Validate the input
    // Insert the data into the database
    // return redirect('/profile')
    console.log(`First Name: ${firstName}`)
    return { message: 'Profile created successfully!'}
}

const CreateProfile = () => {
    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">New User</h1>
            <div className="justify-center mx-auto border p-8 rounded border-gray-300 shadow-md">
                <FormContainer action={createProfileAction}>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormInput name="firstName" label="Fist Name" type="text" placeholder="Enter your first name" defaultValue="jirayu" />
                        <FormInput name="lastName" label="Last Name" type="text" placeholder="Enter your last name" defaultValue="Chomthong" />
                        <FormInput name="userName" label="User Name" type="text" placeholder="Username" defaultValue="lxibel" />
                    </div>
                    <SubmitButton text="Create Profile" size='lg' className="" />
                </FormContainer>
            </div>
        </section>
    )

}
export default CreateProfile