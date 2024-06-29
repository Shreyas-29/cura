"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { User, Role } from "@prisma/client";

const getMessags = async () => {

    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    try {
        const messages = await db.message.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "asc",
            }
        });

        return messages;
    } catch (error) {
        console.log("Error creating message: ", error);
    }
};

export default getMessags;
