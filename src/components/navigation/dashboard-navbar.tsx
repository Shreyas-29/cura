"use client";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "../dashboard/sidebar";
import Icons from "../global/icons";
import { Button } from "../ui/button";
import UserAccount from "../user-account";


interface Props {
    isPro: boolean;
}

const DashboardNavbar = ({ isPro }: Props) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className="sticky top-0 inset-x-0 h-14 w-full px-2 sm:px-4 border-b border-border bg-background backdrop-blur-md z-50">
            <div className="w-full h-full flex items-center justify-between mx-auto">
                <div className="flex items-center gap-x-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="sm:hidden hover:translate-y-0"
                            >
                                <MenuIcon className="w-4 h-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <Sidebar show={false} setIsOpen={setIsOpen} />
                        </SheetContent>
                    </Sheet>
                    <div className="flex items-center justify-center py-4">
                        <Link href="/dashboard" className="flex items-center gap-2">
                            <Icons.logo className="w-8 h-8 rounded-lg" />
                            <h2 className="font-semibold hidden md:inline-flex">
                                Cura
                            </h2>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {!isPro && (
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
