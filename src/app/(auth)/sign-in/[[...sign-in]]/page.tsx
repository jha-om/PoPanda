"use client"
import { SignIn } from "@clerk/nextjs";

const Page = () => {
    return (
        <div className="w-full min-h-[94vh] flex items-center justify-center">
            <SignIn />
        </div>
    )
}

export default Page;