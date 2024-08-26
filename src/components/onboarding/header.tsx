import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const Header = () => {
    return (
        <header className="w-full px-4 py-10 bg-background/40 backdrop-blur-md z-50">
            <Link href="/" className={buttonVariants({ size: "sm", variant: "outline", className: "absolute top-4 left-4" })}>
                <ArrowLeftIcon className="w-4 h-4 mr-1" />
                Home
            </Link>
            <div className="flex flex-col items-center w-full h-full pt-6">
                <h2 className="text-2xl font-semibold">
                    Complete your profile
                </h2>
                <p className="mt-2 text-muted-foreground">
                    Please provide the following information
                </p>
            </div>
        </header>
    )
};

export default Header
