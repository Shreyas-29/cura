import React from "react";
import {  DashboardNavbar, Sidebar } from "@/components";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib";

interface Props {
    children: React.ReactNode
}

const DashboardLayout = async ({ children }: Props) => {

    const user = await currentUser();

    if (!user) {
        redirect("/auth/signin");
    }

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
        include: {
            symptoms: true,
            medications: true,
            mentalwellness: true,
        },
    });

    if (!dbUser) {
        redirect("/onboarding?step=1");
    }

    const isPro = dbUser?.stripeCustomerId ? true : false;

    return (
        <main className="mx-auto w-full min-h-screen relative">
            <DashboardNavbar isPro={isPro} />
            <Sidebar />
            <div className="sm:pl-20 lg:pl-16 flex flex-col w-full px-2 py-4 lg:p-4">
                {children}
            </div>
        </main>
    );
};

export default DashboardLayout
