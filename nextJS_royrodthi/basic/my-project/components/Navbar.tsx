import Link from "next/link"

const Navbar = () => {
    return (
        <div className="mb-4">
            <nav className="flex justify-between text-2xl bg-gray-200 p-4">
                <div className="flex gap-4 ">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/info">info</Link>
                </div>

                <div className="flex gap-4 ">
                    <Link href="/login">login</Link>
                    <Link href="/register">register</Link>
                </div>
            </nav>
        </div>
    )
}
export default Navbar