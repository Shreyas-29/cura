"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import getMessags from "./get-messages";

interface Props {
    role: Role;
    message: string;
}

const createMessages = async ({ role, message }: Props) => {

    const user = await currentUser();

    if (!user) {
        throw new Error("User not found");
    }

    try {
        await db.message.create({
            data: {
                role,
                content: message,
                userId: user.id
            },
        });

        await getMessags();

    } catch (error) {
        console.log("Error creating message: ", error);
    }
};

export default createMessages;
