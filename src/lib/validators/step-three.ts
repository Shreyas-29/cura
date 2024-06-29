import { z } from "zod";

export const StepThreeSchema = z.object({
    name: z.string().min(1).max(80),
    dosage: z.string().min(1).max(80),
    purpose: z.string().min(1).max(240).optional(),
    frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "RARELY"]),
    adherence: z.enum(["ALWAYS", "OFTEN", "SOMETIMES", "NEVER", "RARELY"]),
    startDate: z.date().optional(),
});

export type StepThreeSchemaType = z.infer<typeof StepThreeSchema>;