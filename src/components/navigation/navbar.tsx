import React from 'react'
import MaxWidthWrapper from "../global/max-width-wrapper";
import Link from "next/link";
import Icons from "../global/icons";
import { buttonVariants } from "../ui/button";

const Navbar = () => {

    const user = false;

    return (
        <header className="sticky top-0 inset-x-0 w-full h-14 border-b border-border bg-background/20 backdrop-blur-md z-50">
            <MaxWidthWrapper>
                <div className="flex items-center justify-between w-full h-full">
                    <div className="flex">
                        <Link href="/" className="flex items-center font-semibold gap-2 text-lg">
                            <Icons.logo className="w-8 h-8" />
                            Cura
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/auth/signin" className={buttonVariants({ size: "sm", variant: "ghost" })}>
                                    Login
                                </Link>
                                <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
                                    Start for free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </header>
    )
};

export default Navbar
