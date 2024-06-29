import React from "react";
import { DashboardNavbar } from "@/components";
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
        <>
            <main className="mx-auto w-full relative">
                <DashboardNavbar />
                {children}
            </main>
        </>
    );
};

export default DashboardLayout