"use client"

import { SignUp } from "@clerk/nextjs";

const Page = () => {
    return (
        <div className="w-full min-h-[94vh] flex items-center justify-center">
            <SignUp />
        </div>
    )
}

export default Page;