import { db, StepOneSchema } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {

    const body = await request.json();

    const { age, bloodGroup, gender, height, weight } = StepOneSchema.parse(body);

    const user = await currentUser();

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!age || !bloodGroup || !gender || !height || !weight) {
        return new NextResponse("Invalid data passed", { status: 422 });
    }

    try {
        // check here if the user already has these details if yes then update them else create new
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                age,
                bloodGroup,
                gender,
                height,
                weight,
            },
        });

        return NextResponse.json("User updated!", { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new NextResponse("Invalid request data passed", { status: 422 })
        }

        return new NextResponse("Could not update user", { status: 500, })
    }
};