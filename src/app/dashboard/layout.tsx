import React from "react";
import { Banner, DashboardNavbar, Sidebar } from "@/components";
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
    console.log(user, "User");

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

    // if (dbUser?.symptoms.length! < 0 || dbUser?.medications.length! < 0 || dbUser?.mentalwellness.length! < 0) {
    //     redirect("/onboarding");
    // }
    if (!dbUser) {
        redirect("/onboarding?step=1");
    }

    return (
        <main className="mx-auto w-full relative">
            <DashboardNavbar />
            <Sidebar />
            <div className="pl-16 flex flex-col w-full">
                <div className="flexe flex-col items-start w-full p-4">
                    <Banner />
                    {children}
                </div>
            </div>
        </main>
    );
};

export default DashboardLayout
