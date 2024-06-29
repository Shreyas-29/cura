import React from "react";
import { Navbar, Footer } from "@/components";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
    children: React.ReactNode
}

const MarketingLayout = async ({ children }: Props) => {

    const user = await currentUser();

    return (
        <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] h-[150%]" />
            <Navbar user={user} />
            <main className="mx-auto w-full z-40 relative">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default MarketingLayout