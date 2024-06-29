import { z } from "zod";

export const StepTwoSchema = z.object({
    name: z.enum([
        "HEADACHE",
        "NAUSEA",
        "VOMITING",
        "DIARRHEA",
        "FATIGUE",
        "INSOMNIA",
        "CONSTIPATION",
        "MUSCLE_PAIN",
        "JOINT_PAIN",
        "OTHER"
    ]),
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "RARELY"]),
    intensity: z.number().min(1).max(10),
    loggedAt: z.date().optional(),
});

export type StepTwoSchemaType = z.infer<typeof StepTwoSchema>;