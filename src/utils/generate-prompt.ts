import { Medication, Symptom, User } from "@prisma/client";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const generatePrompt = ({ symptoms, medications, user }: Props) => {

    const { age, bloodGroup, firstName, gender, height, medicalIssues, weight } = user;

    // Format symptoms into a readable list
    const formattedSymptoms = symptoms.map(symptom => {
        return `- ${symptom.name} (Intensity: ${symptom.intensity}, Frequency: ${symptom.frequency})`;
    }).join("\n");

    // Format medications into a readable list
    const formattedMedications = medications.map(medication => {
        return `- ${medication.name} (Dosage: ${medication.dosage}, Frequency: ${medication.frequency})`;
    }).join("\n");

    // Construct the prompt
    const prompt = `
    The user ${firstName ? firstName : ""} is ${age ? `${age} years old` : "of unknown age"}, ${gender ? gender : "of unknown gender"}. 
    Their blood group is ${bloodGroup ? bloodGroup : "unknown"}, height is ${height ? `${height} cm` : "unknown"}, and weight is ${weight ? `${weight} kg` : "unknown"}. 
    They have the following medical issues: ${medicalIssues ? medicalIssues : "none reported"}.

    Here are the details of their health condition:

    Symptoms:
    ${formattedSymptoms}

    Medications:
    ${formattedMedications}

    Based on the above information, provide a very concise, personalized health recommendations. Please provide up to 5 of the most important and relevant recommendations. Please do not give any medical advice, disclaimers, warnings, or any other information that could be considered as medical advice. Do not tell the user to consult a doctor or seek medical help. Just provide general health recommendations based on the information provided.
    
    Note: Please only answer questions related to health conditions, symptoms, and medications provided. Ignore questions about unrelated topics. Please do not provide answers related to coding, sports, or any other unrelated topics.
  `;

    return prompt;
};

export default generatePrompt;
