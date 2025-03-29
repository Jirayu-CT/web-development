import Link from "next/link";

// rafce
const page = async() => {
    // JavaScript
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return (
        <>
            <div>
                <h1>Hello</h1>
                <p>Description</p>
            </div>
        </>
    );
}
export default page