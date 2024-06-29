import { db, StepOneSchema, StepTwoSchema } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { Frequency, SymptomName } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {

    const body = await request.json();

    const { name, frequency, intensity } = StepTwoSchema.parse(body);

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name || !frequency || !intensity) {
        return new NextResponse("Invalid data passed", { status: 422 });
    }

    try {
        // check here if the user already has these details if yes then update them else create new
        await db.symptom.create({
            data: {
                userId: user.id,
                name: name as SymptomName,
                frequency: frequency as Frequency,
                intensity,
            },
        });

        return NextResponse.json("Symptom created!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 })
        }

        return new NextResponse("Could not create symptom", { status: 500, })
    }
};