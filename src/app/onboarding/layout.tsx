import { Header } from "@/components";
import React from "react";

interface Props {
    children: React.ReactNode
}

const OnboardingLayout = async ({ children }: Props) => {

    // TODO: in here update the user with the how you were doing on auth-callback

    return (
        <main className="relative w-full bg-background h-full">
            <Header />
            <div className="h-full w-full">
                {children}
            </div>
        </main>
    );
};

export default OnboardingLayout
