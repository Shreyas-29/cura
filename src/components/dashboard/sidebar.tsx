"use client";

import React from 'react'
import Icons from "../global/icons";
import { LINKS } from "@/constants";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { usePathname } from "next/navigation";
import { cn } from "@/lib";

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <div className="fixed left-0 inset-y-0 h-full w-12 md:w-16 border-r border-border bg-background z-40">
            <div className="flex flex-col items-center w-full h-full pt-16">
                
                <TooltipProvider>
                    <ul className="space-y-2 flex flex-col items-center justify-center w-full">
                        {LINKS.map((link, index) => {
                            const isActive = pathname === link.href;
                            // console.log(pathname, link.href)
                            return (
                                <Tooltip key={link.label} delayDuration={0}>
                                    <TooltipTrigger>
                                        <li className={cn(
                                            "flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-primary hover:bg-neutral-100 transition-all cursor-pointer",
                                            isActive && "bg-primary/10 text-primary hover:bg-primary/20"
                                        )}>
                                            <Link href={`${link.href}`} className="flex items-center justify-center w-full h-full">
                                                <link.icon strokeWidth={1.7} className="w-5 h-5" />
                                                <span className="sr-only">{link.label}</span>
                                            </Link>
                                            <TooltipContent side="right" className="text-xs hidden md:flex">
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
