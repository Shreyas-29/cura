import { db, StepThreeSchema } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {

    const body = await request.json();

    const { adherence, dosage, frequency, name, purpose } = StepThreeSchema.parse(body);

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!adherence || !dosage || !frequency || !name || !purpose) {
        return new NextResponse("Invalid data passed", { status: 422 });
    }

    try {
        // check here if the user already has these details if yes then update them else create new
        await db.medication.create({
            data: {
                userId: user.id,
                name,
                frequency,
                adherence,
                dosage,
                purpose,
            },
        });

        return NextResponse.json("Medications created!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 })
        }

        return new NextResponse("Could not create medications", { status: 500, })
    }
};