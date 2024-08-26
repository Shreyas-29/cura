"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { STEPS } from "@/constants";
import { cn } from "@/lib";
import { useEffect, useState } from "react";
import StepFive from "./step-five";
import StepFour from "./step-four";
import StepOne from "./step-one";
import StepThree from "./step-three";
import StepTwo from "./step-two";

const stepComponents: { [key: string]: any } = {
    "step-one": StepOne,
    "step-two": StepTwo,
    "step-three": StepThree,
    "step-four": StepFour,
    "step-five": StepFive,
};

const Steps = () => {

    const initialTab = localStorage.getItem("cura_active_tab") || "step-one";

    const [activeTab, setActiveTab] = useState<string>(initialTab);

    useEffect(() => {
        localStorage.setItem("cura_active_tab", activeTab);
    }, [activeTab]);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <div className="w-full flex overflow-x-scroll">
            <Tabs
                value={activeTab}
                defaultValue={initialTab}
                onValueChange={setActiveTab}
                className="w-full pt-8 select-none"
            >
                <TabsList className="max-w-4xl mx-auto rounded-lg flex items-center justify-evenly p-2">
                    {STEPS.map((step, index) => (
                        <TabsTrigger
                            key={step.title}
                            value={step.name}
                            onClick={() => setActiveTab(step.name)}
                            className={cn(
                                "w-full py-2 rounded-md",
                                step.name === activeTab ? "bg-background" : "",
                            )}
                        >
                            {step.title}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {STEPS.map((step) => {
                    const StepComponent = stepComponents[step.name];
                    return (
                        <TabsContent key={step.title} value={step.name} className="pt-10">
                            {step.name === activeTab && <StepComponent />}
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    )
};

export default Steps
