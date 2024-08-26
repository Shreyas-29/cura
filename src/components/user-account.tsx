"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useClerk } from "@clerk/nextjs";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserAccount = () => {

    const { signOut, user } = useClerk();

    const handleSignOut = () => {
        signOut();
    };

    if (!user) {
        return (
            <div className="relative aspect-square w-8 h-8 rounded-full border border-border cursor-pointer group">
                <Image
                    src="https://api.dicebear.com/9.x/adventurer/svg?backgroundType=gradientLinear,solid"
                    alt="User"
                    width={1024}
                    height={1024}
                    unoptimized
                    className="rounded-full w-full h-full object-cover group-hover:scale-105 transition-all"
                />
            </div>
        );
    };

    const { firstName, emailAddresses, imageUrl } = user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative aspect-square w-8 h-8 rounded-full border border-border cursor-pointer group">
                    <Image
                        src={imageUrl ? imageUrl : "https://api.dicebear.com/9.x/adventurer/svg?backgroundType=gradientLinear,solid"}
                        alt="User"
                        referrerPolicy="no-referrer"
                        width={1024}
                        height={1024}
                        unoptimized
                        className="rounded-full w-full h-full object-cover group-hover:scale-105 transition-all"
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl min-w-56 w-full shadow-lg shadow-neutral-500/10">
                <div className="flex flex-col items-start text-start px-4 py-3">
                    <h5 title={firstName!} className="text-sm font-medium font-heading capitalize">
                        {firstName}
                    </h5>
                    <p title={emailAddresses[0]?.emailAddress} className="text-sm text-muted-foreground max-w-full overflow-hidden line-clamp-1">
                        {emailAddresses[0]?.emailAddress.slice(0, 20)}{emailAddresses[0]?.emailAddress.length > 20 ? "..." : ""}
                    </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                    <Link href="/dashboard/account" className="flex items-center gap-2 px-4 py-2 w-full hover:bg-accent rounded-md">
                        <>
                            <UserIcon className="w-4 h-4" />
                            Account
                        </>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                    <Link href="/dashboard/account/settings" className="flex items-center gap-2 px-4 py-2 w-full hover:bg-accent rounded-md">
                        <>
                            <SettingsIcon className="w-4 h-4" />
                            Settings
                        </>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive hover:!bg-destructive/10 hover:!text-destructive flex items-center gap-2 px-4 py-2 rounded-md">
                    <LogOutIcon className="w-4 h-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default UserAccount