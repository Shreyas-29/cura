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

    // prev working prompt
    // const prompt = `
    //     The user ${firstName ? firstName : ""} is ${age ? `${age} years old` : "of unknown age"}, ${gender ? gender : "of unknown gender"}.
    //     Their blood group is ${bloodGroup ? bloodGroup : "unknown"}, height is ${height ? `${height} cm` : "unknown"}, and weight is ${weight ? `${weight} kg` : "unknown"}.
    //     They have the following medical issues: ${medicalIssues ? medicalIssues : "none reported"}.

    //     Here are the details of their health condition:

    //     Symptoms:
    //     ${formattedSymptoms}

    //     Medications:
    //     ${formattedMedications}

    //     Based on the above information, provide very concise, personalized health recommendations. Please provide up to 5 of the most important and relevant recommendations. If asked suggest the necessary medicines and precautions to be taken whenever needed.

    //     Instructions:
    //     - Do not include any disclaimers, warnings.
    //     - Do not tell the user to consult a doctor or seek medical help.
    //     - Only provide general health recommendations based on the information provided and the user's question.
    //     - Ignore questions unrelated to health conditions, symptoms, and medications provided.
        
    //     Note: Only answer questions related to the user's health conditions, symptoms, and medications or any other health-related queries. Do not provide answers related to coding, sports, or any other unrelated topics.
    //     `;
        
    // - Do not include any disclaimers, warnings, or other information not directly related to the user's question.
    
    const prompt = `
    You are a health recommendation system. Your task is to provide personalized health recommendations based on the user's information, symptoms, and medications.

         The user ${firstName ? firstName : ""} is ${age ? `${age} years old` : "of unknown age"}, ${gender ? gender : "of unknown gender"}.
     Their blood group is ${bloodGroup ? bloodGroup : "unknown"}, height is ${height ? `${height} cm` : "unknown"}, and weight is ${weight ? `${weight} kg` : "unknown"}.
     They have the following medical issues: ${medicalIssues ? medicalIssues : "none reported"}.

     Here are the details of their health condition:

     Symptoms:
     ${formattedSymptoms}

     Medications:
     ${formattedMedications}

     Analyze the provided information carefully. Consider the user's age, gender, blood group, height, weight, medical issues, symptoms, and medications. Based on this analysis, generate up to 5 of the most important and relevant health recommendations.

     When answering the user's question:
        - Only provide information related to the user's health conditions, symptoms, and medications.
        - If asked, suggest necessary medicines and precautions.
        - Ignore any questions unrelated to the provided health information.
        - Do not answer questions about general topics, coding, sports, or any non-health-related subjects.

    Important reminders:
        - Do not include any disclaimers or warnings.
        - Do not tell the user to consult a doctor or seek medical help.
        - Provide only general health recommendations based on the given information.
        - Keep your recommendations concise and to the point.
    `

    return prompt;
};

export default generatePrompt;
