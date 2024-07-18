"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const getAuthStatus = async () => {
    const user = await currentUser();

    if (!user?.id || !user?.primaryEmailAddress?.emailAddress) {
        throw new Error("User not found");
    }

    const existingUser = await db.user.findFirst({
        where: {
            clerkId: user.id,
        }
    });

    if (!existingUser) {
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

        return { success: false };
    }

    return { success: true };
};

export default getAuthStatus;
