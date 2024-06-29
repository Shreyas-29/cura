"use server";

import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { Frequency, SymptomName } from "@prisma/client";

interface Props {
    name: SymptomName;
    intensity: number;
    frequency: Frequency;
}

const createSymptom = async ({ name, intensity, frequency }: Props) => {

    const user = await currentUser();

    if (!user) {
        throw new Error("You must be logged in to perform this action");
    }

    if (!name || !intensity || !frequency) {
        throw new Error("Missing required fields");
    }

    try {
        await db.symptom.create({
            data: {
                userId: user.id,
                name,
                intensity,
                frequency,
            },
        });
    } catch (error) {
        console.error("Error creating symptom", error);
        throw new Error("Error creating symptom");
    }
};

export default createSymptom;
