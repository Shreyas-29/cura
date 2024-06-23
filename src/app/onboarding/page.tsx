"use client";

import { STEPS } from "@/constants";
import { cn } from "@/lib";
import React, { useState, useEffect } from 'react'

const OnboardingPage = () => {

    const [activeStep, setActiveStep] = useState<number>(1);

    const handleNext = () => {
        if (activeStep < STEPS.length) {
            setActiveStep(activeStep + 1)
        };
    };

    return (
        <div className="flex items-center justify-center w-full h-full max-w-4xl mx-auto gap-8">
            {STEPS.map((step) => (
                <div
                    key={step.id}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full",
                        activeStep === step.id ? "bg-primary text-white" : "bg-gray-100"
                    )}
                >
                    {step.id}
                </div>
            ))}
        </div>
    );
};

export default OnboardingPage
