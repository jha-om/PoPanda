"use client"
import { ReactNode } from "react"
import { Button } from "./ui/button"
import { ArrowLeft } from "lucide-react"
import { Heading } from "./heading"
import { useRouter } from "next/navigation"

interface DashboardPageProps {
    title: string,
    children?: ReactNode,
    hideBackButton?: boolean,
    cta?: ReactNode
}

export const DashboardPage = ({
    title,
    children,
    hideBackButton,
    cta,
}: DashboardPageProps) => {
    const router = useRouter();

    return (
        <section className="flex-1 h-full w-full flex flex-col">
            <div className="p-6 sm:p-8 flex justify-between border-b border-gray-200">
                <div className="flex flex-col sm:items-center gap-y-2 gap-x-8">
                    <div className="flex items-center gap-8">
                        {hideBackButton ? null : (
                            <Button
                                onClick={() => router.push("/dashboard")}
                                className="w-fit bg-white" variant={"outline"}>
                                <ArrowLeft className="size-4" />
                            </Button>
                        )}
                        <Heading>{title}</Heading>

                        {cta ? (
                            <div>{cta}</div>
                        ) : null}
                    </div>
                </div>
            </div>

            <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">{children}</div>
        </section>
    )
}