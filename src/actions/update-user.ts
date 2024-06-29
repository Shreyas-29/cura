"use server";

import { db, StepOneSchemaType } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const updateUser = async ({ age, bloodGroup, gender, height, weight }: StepOneSchemaType) => {
    const user = await currentUser();

    if (!user?.id) {
        throw new Error("User not found");
    }

    try {
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                age: Number(age),
                bloodGroup,
                gender,
                height: Number(height),
                weight: Number(weight),
            },
        });
    } catch (error) {
        console.error("Error updating user", error);
        throw new Error("Error updating user");
    }
};

export default updateUser;
