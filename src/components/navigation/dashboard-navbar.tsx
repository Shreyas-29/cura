import React from "react"
import Icons from "../global/icons";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAccount from "../user-account";

const DashboardNavbar = () => {
    return (
        <header className="sticky top-0 inset-x-0 h-14 w-full px-4 border-b border-border bg-background backdrop-blur-md z-50">
            <div className="w-full h-full flex items-center justify-between md:max-w-screen-xl mx-auto pl-16">
                <Link href="/dashboard" className="flex items-center gap-2">
                    <h2 className="font-medium hidden md:inline-flex">
                        Cura
                    </h2>
                </Link>
                <div className="flex items-center gap-4">
                    <Button size="sm" variant="secondary">
                        Upgrade
                    </Button>
                    <UserAccount />
                </div>
            </div>
        </header>
    )
};

export default DashboardNavbar
