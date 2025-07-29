import { cn } from "@/utils"
import { HTMLAttributes, ReactNode } from "react"

// what does this extends HTMLAttributes<HTMLHeadElement> means??
// lets say we create a h1 tag anywhere in our application and h1 tag has many attributes that can be passed as props,
// so we just said that whatever the HTML document for the tag consists of should be appended inside this interface and 
// can be used without explicitly sending all the properties of that tag, because it will create mess inside the tag.
interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
    children?: ReactNode
}

export const Heading = ({ className, children, ...props }: HeadingProps) => {
    return (
        <h1 className={cn("text-4xl sm:text-5xl text-pretty font-heading font-semibold tracking-tight text-zinc-800", className)} {...props}>{children}</h1>
    )
}