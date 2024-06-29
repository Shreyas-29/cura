import { z } from "zod";

export const StepOneSchema = z.object({
    age: z.coerce.number().min(1, {
        message: "Age must be greater than 0",
    }).max(150).nonnegative(),
    weight: z.coerce.number().min(1, {
        message: "Weight must be greater than 0",
    }).max(300).nonnegative(),
    height: z.coerce.number().min(1, {
        message: "Height must be greater than 0",
    }).max(300).nonnegative(),
    gender: z.enum(["male", "female", "other"]),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
});

export type StepOneSchemaType = z.infer<typeof StepOneSchema>;