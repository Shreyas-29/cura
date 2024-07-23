import { Medication, Symptom, User } from "@prisma/client";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const generatePrompt = ({ symptoms, medications, user }: Props) => {
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

        Based on the above information, provide very concise, personalized health recommendations. Please provide up to 5 of the most important and relevant recommendations. If asked suggest the necessary medicines and precautions to be taken whenever needed.

        Instructions:
        - Do not include any disclaimers, warnings.
        - Do not tell the user to consult a doctor or seek medical help.
        - Only provide general health recommendations based on the information provided and the user's question.
        - Ignore questions unrelated to health conditions, symptoms, and medications provided.
        
        Note: Only answer questions related to the user's health conditions, symptoms, and medications or any other health-related queries. Do not provide answers related to coding, sports, or any other unrelated topics.
        `;
        
        // - Do not include any disclaimers, warnings, or other information not directly related to the user's question.
    return prompt;
};

export default generatePrompt;
