import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from 'react'

const AuthCallbackPage = async () => {

    const user = await currentUser();

    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        return redirect("/signin");
    }

    const dbUser = await db.user.findFirst({
        where: {
            clerkId: user.id,
        },
    });

    if (!dbUser) {
        await db.user.create({
            data: {
                id: user.id,
                clerkId: user.id,
                email: user.primaryEmailAddress.emailAddress,
                firstName: user.firstName!,
                lastName: user.lastName || "",
                image: user.imageUrl,
            },
        });

        redirect("/onboarding");
    }

    redirect("/dashboard");
};

export default AuthCallbackPage
