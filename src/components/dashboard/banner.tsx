"use client";

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";

const Banner = () => {

    const { user } = useClerk();

    return (
        <div className="flex items-center justify-between w-full px-4 py-4 md:px-6 bg-green-50 rounded-lg md:rounded-2xl border border-green-300 relative overflow-hidden">
            <div className="absolute inset-0 -z-1 bg-[linear-gradient(to_right,#dcfce7_1px,transparent_1px),linear-gradient(to_bottom,#dcfce7_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%) h-full rounded-lg md:rounded-2xl" />
            <div className="space-y-2 z-20">
                <h2 className="text-lg md:text-2xl font-semibold text-green-500">
                    Welcome back, {user?.firstName || "user"}!
                </h2>
                <p className="text-sm text-green-600">
                    Get started with your health journey
                </p>
            </div>
            <div className="flex justify-end z-20">
                <Image
                    src="/images/banner.svg"
                    alt="Health"
                    width={100}
                    height={100}
                    className="w-auto h-28"
                />
            </div>
        </div>
    )
};

export default Banner
