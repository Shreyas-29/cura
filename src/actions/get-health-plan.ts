"use server";

import ai from "@/lib/google";
import { generatePrompt } from "@/utils";
import { Medication, Symptom, User } from "@prisma/client";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const getHealthPlan = async ({ symptoms, medications, user }: Props) => {

    const prompt = generatePrompt({ symptoms, medications, user });

    const model = ai.getGenerativeModel({
        model: "gemini-1.5-flash"
    });

    if (!prompt) {
        throw new Error("Prompt not generated");
    }

    try {
        const result = await model.generateContent(prompt);

        const res = await result.response;

        // console.log("Response", res.text())

        const recommendations = res.text();
        // console.log("Recommendations", recommendations);

        return recommendations;
    } catch (error) {
        console.error(error);
        throw new Error("Error generating health plan");
    }
};

export default getHealthPlan;
