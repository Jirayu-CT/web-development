import { createLandmarkAction } from "@/actions/actions"
import { SubmitButton } from "@/components/form/Buttons"
import CategoryInput from "@/components/form/CategoryInput"
import FormContainer from "@/components/form/FormContainer"
import FormInput from "@/components/form/FormInput"
import ImageInput from "@/components/form/ImageInput"
import ProvinceInput from "@/components/form/ProvinceInput"
import TextAreaInput from "@/components/form/TextAreaInput"
import MapLandmark from "@/components/map/MapLandmark"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"


const CreateProfile = async () => {

    return (
        <section>
            <h1 className="text-2xl font-semibold mb-8 capitalize">Create Landmark</h1>
            <div className="justify-center mx-auto border p-8 rounded border-gray-300 shadow-md">
                <FormContainer action={createLandmarkAction}>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormInput name="name" label="Landmark Name" type="text" placeholder="Enter Landmark Name" defaultValue="Buriram" />

                        {/* Category */}
                        <CategoryInput />


                    </div>
                    <TextAreaInput name="description" />
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <FormInput name="price" label="price" type="number" placeholder="Enter Price" />
                        <ProvinceInput />
                    </div>
                    <ImageInput/>
                    <MapLandmark location={{lat: 14.990928595159593, lng:103.1024548539469}}/>  {/* Buriram */}
                    <SubmitButton text="Create Landmark" size='lg' className="" />
                </FormContainer>
            </div>
        </section>
    )

}
export default CreateProfile