import Link from "next/link";
import React from 'react'
import { buttonVariants } from "../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Icons from "../global/icons";

const Header = () => {
    return (
        <header className="w-full px-4 py-10 bg-background">
            <div className="flex flex-col items-center w-full h-full">
                <h2 className="text-3xl font-semibold font-heading">
                    Complete your profile
                </h2>
                <p className="mt-2 text-muted-foreground">
                    Your personal details are required to get more personalized recommendations
                </p>
            </div>
        </header>
    )
};

export default Header
