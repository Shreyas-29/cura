import { Header } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
    children: React.ReactNode
}

const OnboardingLayout = async ({ children }: Props) => {

    const user = await currentUser();

    if (!user) {
        redirect("/auth/signin");
    }

    const isLoggedUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            symptoms: true,
            medications: true,
        }
    });

    if (isLoggedUser?.symptoms.length || isLoggedUser?.medications.length) {
        redirect("/dashboard");
    }

    // TODO: in here update the user with the how you were doing on auth-callback

    return (
        <main className="relative w-full bg-background h-full">
            <Header />
            <div className="h-full w-full">
                {children}
            </div>
        </main>
    );
};

export default OnboardingLayout