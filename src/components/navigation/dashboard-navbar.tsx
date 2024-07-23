import React from "react"
import Icons from "../global/icons";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAccount from "../user-account";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
    isSubscribed: boolean;
}

const DashboardNavbar = ({ isSubscribed }: Props) => {
    return (
        <header className="sticky top-0 inset-x-0 h-14 w-full px-4 border-b border-border bg-background backdrop-blur-md z-50">
            <div className="w-full h-full flex items-center justify-between md:max-w-screen-xl mx-auto">
                {/* <Link href="/dashboard" className="flex items-center gap-2">
                </Link> */}
                <div className="flex items-center justify-center py-4">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <Icons.logo className="w-8 h-8 rounded-lg" />
                        <h2 className="font-semibold hidden md:inline-flex">
                            Cura
                        </h2>
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    {!isSubscribed && (
                        <Button asChild size="sm" variant="secondary">
                            <Link href="/dashboard/account/billing">
                                Upgrade
                            </Link>
                        </Button>
                    )}
                    <UserAccount />
                </div>
            </div>
        </header>
    )
};

export default DashboardNavbar
