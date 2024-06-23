import React from 'react';
import { Header, Steps } from "@/components";

interface Props {
    children: React.ReactNode
}

const OnboardingLayout = ({ children }: Props) => {
    return (
        <>
            <main className="relative w-full bg-background h-screen">
                <Header />
                <div className="h-ful w-full">
                    {children}
                </div>
            </main>
        </>
    );
};

export default OnboardingLayout