import Counter from "@/components/Counter"
import Image from "next/image";
const url = "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU";

const infoPage = () => {
    return (
        <div>
            infoPage
            <Counter />

            <hr />

            <Image
                src = {url}
                width={500}
                height={500}
                alt = "Image from picsum"
                priority 
            />
        </div>
    )
}
export default infoPage