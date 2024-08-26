import { db, stripe } from "@/lib";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {

    const body = await request.text();

    const sig = request.headers.get("Stripe-Signature") || "";

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
    } catch (error) {
        return new Response("Webhook Error: Invalid payload", { status: 400 });
    }

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session;

            if (session.mode === "payment" && session.payment_status === "paid") {
                const customerId = session.customer as string;

                const user = await db.user.findFirst({
                    where: {
                        stripeCustomerId: customerId,
                    },
                });

                if (user) {
                    await db.user.update({
                        where: {
                            id: user.id,
                        },
                        data: {
                            stripeCustomerId: customerId,
                        },
                    });
                }
            }
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
            return new Response("Unhandled event type", { status: 400 });
    }

    return new Response("Webhook received", { status: 200 });
};
