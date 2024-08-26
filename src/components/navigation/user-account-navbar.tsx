"use client";

import { cn } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react"

const UserAccountNavbar = () => {

    const pathname = usePathname(); 

    return (
        <nav className="flex items-center justify-evenly md:justify-start w-full pt-4 max-w-3xl mx-auto overflow-x-scroll scrollbar-hide">
            <Link
                href="/dashboard/account"
                className={cn(
                    "text-sm font-medium px-6 py-2 relative border-b-2 border-transparent",
                    pathname === "/dashboard/account" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                )}
            >
                Account
            </Link>
            <Link
                href="/dashboard/account/symptoms"
                className={cn(
                    "text-sm font-medium px-6 py-2 relative border-b-2 border-transparent",
                    pathname === "/dashboard/account/symptoms" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                )}
            >
                Symptoms
            </Link>
            <Link
                href="/dashboard/account/medications"
                className={cn(
                    "text-sm font-medium px-6 py-2 relative border-b-2 border-transparent",
                    pathname === "/dashboard/account/medications" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                )}
            >
                Medications
            </Link>
            <Link
                href="/dashboard/account/billing"
                className={cn(
                    "text-sm font-medium px-6 py-2 relative border-b-2 border-transparent",
                    pathname === "/dashboard/account/billing" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                )}
            >
                Billing
            </Link>
            <Link
                href="/dashboard/account/settings"
                className={cn(
                    "text-sm font-medium px-6 py-2 relative border-b-2 border-transparent",
                    pathname === "/dashboard/account/settings" ? "text-foreground border-b-2 border-foreground" : "text-muted-foreground"
                )}
            >
                Settings
            </Link>
        </nav>
    )
};

export default UserAccountNavbar
