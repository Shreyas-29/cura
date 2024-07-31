"use client";

import React from 'react'
import Icons from "../global/icons";
import { inter, LINKS } from "@/constants";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation";
import { cn } from "@/lib";

interface Props {
    show?: boolean;
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ show = true, setIsOpen }: Props) => {

    const pathname = usePathname();

    return (
        <div
            className={cn(
                "left-0 inset-y-0 h-full sm:w-16 sm:bg-background z-40",
                show ? "hidden sm:block sm:fixed border-r border-border" : "block relative w-full",
            )}
        >
            <div className={cn(
                "flex flex-col items-center w-full h-full",
                show ? "pt-16" : "pt-10"
            )}>

                <TooltipProvider>
                    <ul className="space-y-2 flex flex-col items-start sm:items-center w-full">
                        {LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Tooltip key={link.label} delayDuration={0}>
                                    <TooltipTrigger asChild>
                                        <li
                                            className={cn(
                                                "flex items-start sm:items-center justify-start sm:justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-neutral-100 transition-all cursor-pointer",
                                                isActive && "bg-primary/10 text-primary hover:bg-primary/20",
                                                show ? "w-9 h-9" : "w-full h-auto py-2 px-4",
                                            )}
                                            onClick={() => {
                                                (!show && setIsOpen) && setIsOpen(false);
                                            }}
                                        >
                                            <Link href={`${link.href}`} className="flex items-start sm:items-center sm:justify-center gap-x-2 w-full h-full">
                                                <link.icon strokeWidth={1.7} className="w-5 h-5" />
                                                <span className="text-sm sm:hidden">{link.label}</span>
                                            </Link>
                                            <TooltipContent side="right" className="text-xs hidden sm:flex">
                                                {link.label}
                                            </TooltipContent>
                                        </li>
                                    </TooltipTrigger>
                                </Tooltip>
                            )
                        })}
                    </ul>
                </TooltipProvider>
            </div>
        </div>
    )
};

export default Sidebar
