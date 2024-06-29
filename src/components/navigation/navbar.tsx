// "use client";

import React from "react"
import MaxWidthWrapper from "../global/max-width-wrapper";
import Link from "next/link";
import Icons from "../global/icons";
import { Button, buttonVariants } from "../ui/button";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// import { useClerk } from "@clerk/nextjs";
import UserAccount from "../user-account";

interface Props {
    user: User | null;
}

const Navbar = ({ user }: Props) => {
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
                            <>
                                <Link href="/dashboard" className={buttonVariants({ size: "sm" })}>
                                    Dashboard
                                </Link>
                                <UserAccount />
                            </>
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