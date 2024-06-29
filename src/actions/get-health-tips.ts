"use server";

import ai from "@/lib/google";
import { Symptom, Medication, User } from "@prisma/client";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const generateTips = ({ symptoms, medications, user }: Props) => {
    const { age, bloodGroup, firstName, gender, height, medicalIssues, weight } = user;

    const formattedSymptoms = symptoms.map(symptom => {
        return `- ${symptom.name} (Intensity: ${symptom.intensity}, Frequency: ${symptom.frequency})`;
    }).join("\n");

    const formattedMedications = medications.map(medication => {
        return `- ${medication.name} (Dosage: ${medication.dosage}, Frequency: ${medication.frequency})`;
    }).join("\n");

    const prompt = `
        The user ${firstName ? firstName : ""} is ${age ? `${age} years old` : "of unknown age"}, ${gender ? gender : "of unknown gender"}. 
        Their blood group is ${bloodGroup ? bloodGroup : "unknown"}, height is ${height ? `${height} cm` : "unknown"}, and weight is ${weight ? `${weight} kg` : "unknown"}. 
        They have the following medical issues: ${medicalIssues ? medicalIssues : "none reported"}.

        Here are the details of their health condition:

        Symptoms:
        ${formattedSymptoms}

        Medications:
        ${formattedMedications}

        Based on the above information, provide a very concise personalized health tips. Please provide up to 10 of the most important and relevant tips. Please do not give any medical advice, disclaimers, warnings, or any other information that could be considered as medical advice. Do not tell the user to consult a doctor or seek medical help. Just provide general health tips based on the information provided.
    `;

    return prompt;
};

const getHealthTips = async ({ symptoms, medications, user }: Props) => {
    const prompt = generateTips({ symptoms, medications, user });

    const model = ai.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Generate health tips based on the user's symptoms and medications.Please only provide general health tips and do not give any medical advice.Do not tell the user to consult a doctor or seek medical help.Just provide general health recommendations based on the information provided."
    });

    if (!prompt) {
        throw new Error("Prompt not generated");
    }

    try {
        const result = await model.generateContent(prompt);

        const res = await result.response;

        const recommendations = res.text();

        return recommendations;
    } catch (error) {
        console.error(error);
        throw new Error("Error generating health tips");
    }
};

export default getHealthTips;
