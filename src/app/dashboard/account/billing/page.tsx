import { CheckoutButton } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const BillingPage = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    const isPro = dbUser?.stripeCustomerId ? true : false;

    return (
        <div className="flex flex-col items-start justify-start w-full max-w-3xl py-8 mx-auto">
            <div className="flex flex-col items-start gap-2">
                <h2 className="text-xl font-semibold">
                    Manage your billing
                </h2>
                <p className="text-sm text-muted-foreground">
                    Check your billing information
                </p>
            </div>
            <div className="flex flex-col items-start w-full py-8">
                <h4 className="text-lg font-medium">
                    {isPro ? "Pro" : "Free"} Plan
                </h4>
                <p className="text-muted-foreground mt-1">
                    {isPro ? "You are subscribed to the Pro plan. Enjoy all the features!" : "You are using the Free plan."}
                </p>
                <CheckoutButton isPro={isPro!} />
            </div>
        </div>
    )
};

export default BillingPage
