"use client"
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const intent = searchParams.get("intent");

    return (
        <div className="w-full min-h-[94vh] flex items-center justify-center">
            <SignIn forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : '/dashboard'} />
        </div>
    )
}

export default Page;