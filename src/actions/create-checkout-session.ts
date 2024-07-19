"use server";

import { db, stripe } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const createCheckoutSession = async () => {

    const user = await currentUser();

    if (!user) {
        throw new Error("You must be signed in to create a checkout session");
    }

    const dbUser = await db.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!dbUser) {
        throw new Error("User not found");
    }

    try {
        const sesion = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            invoice_creation: {
                enabled: true,
            },
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Cura Pro Subscription",
                        },
                        unit_amount: 900,
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/account/billing?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/account/billing`,
            metadata: { userId: dbUser.id },
        });

        // store the session id in user record
        await db.user.update({
            where: {
                id: dbUser.id,
            },
            data: {
                stripeCustomerId: sesion.id,
            },
        });

        console.log("Session created", sesion.id);

        return sesion;
    } catch (error) {
        console.error("Error creating session", error);
    }
};

export default createCheckoutSession;
