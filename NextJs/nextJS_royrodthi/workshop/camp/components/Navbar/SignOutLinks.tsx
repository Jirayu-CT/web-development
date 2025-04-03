'use client'
import { SignOutButton } from "@clerk/nextjs"
import { toast } from "sonner"

const SignOutLinks = () => {
    const handleLogout = () => {
        toast("Logout successful")
    }
    return (
        <SignOutButton redirectUrl="/">
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
        </SignOutButton>
    )
}
export default SignOutLinks