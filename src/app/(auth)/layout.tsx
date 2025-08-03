import { ReactNode } from "react"
import { Navbar } from "../../components/navbar"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen w-full bg-white relative z-10">
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: "#fefdfb",
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.35) 1px, transparent 0)",
                    backgroundSize: "20px 20px",
                }}
            />
            <Navbar />
            {children}
        </div>

        
    )
}

export default Layout;