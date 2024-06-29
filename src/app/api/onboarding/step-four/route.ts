import { db, StepFourSchema } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { Mood } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {

    const body = await request.json();

    const { happiness, mood, sleep, stress } = StepFourSchema.parse(body);

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!happiness || !mood || !sleep || !stress) {
        return new NextResponse("Invalid data passed", { status: 422 });
    }

    try {
        // check here if the user already has these details if yes then update them else create new
        await db.mentalWellness.create({
            data: {
                userId: user.id,
                happiness,
                mood,
                sleep,
                stress,
            },
        });

        return NextResponse.json("Mentalwellness created!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 })
        }

        return new NextResponse("Could not create mentalwellness", { status: 500, })
    }
};