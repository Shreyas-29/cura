"use client";

import { createCheckoutSession } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import { LoaderIcon } from "lucide-react";
import { useState } from 'react';
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
    isPro: boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutButton = ({ isPro }: Props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            const session = await createCheckoutSession();

            const stripe = await stripePromise;
            const error = await stripe?.redirectToCheckout({ sessionId: session?.id! });

            if (error) {
                console.error(error);
                toast.error("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-start w-full">
            {!isPro && (
                <Button
                    type="button"
                    variant="black"
                    disabled={isLoading}
                    onClick={handleCheckout}
                    className="mt-4 min-w-36"
                >
                    {isLoading ? (
                        <LoaderIcon className="w-4 h-4 animate-spin" />
                    ) : isPro ? "Manage Subscription" : "Upgrade to Pro"}
                </Button>
            )}
        </div>
    )
};

export default CheckoutButton
