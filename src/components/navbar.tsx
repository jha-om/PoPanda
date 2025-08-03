import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";

export const Navbar = async () => {
    const user = await currentUser();
    return (
        <nav className="sticky z-[100] inset-x-0 h-16 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-16 items-center justify-between">
                    <Link href={"/"}>
                        P<span className="underline">o</span><span className="text-brand-700">Panda</span>
                    </Link>

                    <div className="h-full flex items-center space-x-4">
                        {user ? (
                            <>
                                <SignOutButton>
                                    <Button size="sm" variant="ghost">Sign Out</Button>
                                </SignOutButton>

                                <Link
                                    href={"/dashboard"}
                                    className={buttonVariants({
                                        size: "sm",
                                        className: "group overflow-hidden hover:rounded-none transition-all duration-400 ease-in-out hover:transition-all"
                                    })}
                                >
                                    <span className="flex items-center transition-all duration-400 ease-out">
                                        Dashboard
                                        <ArrowRight className="size-4 ml-0 opacity-0 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={"/pricing"}
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost"
                                    })}
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href={"/sign-in"}
                                    className={buttonVariants({
                                        size: "sm",
                                        variant: "ghost"
                                    })}
                                >
                                    Sign in
                                    </Link>
                                    
                                    <div className="h-8 w-px bg-gray-200"></div>
                                <Link
                                    href={"/sign-up"}
                                    className={buttonVariants({
                                        size: "sm",
                                        className: "group overflow-hidden hover:rounded-none transition-all duration-400 ease-in-out hover:transition-all"
                                    })}
                                >
                                    <span className="flex items-center transition-all duration-400 ease-out">
                                        Sign up
                                        <ArrowRight className="size-4 ml-0 opacity-0 transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}