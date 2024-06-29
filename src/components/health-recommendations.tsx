"use client";

import { getHealthPlan } from "@/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Medication, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { HeartPulseIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HealthPlanModal from "./modals/health-plan-modal";
import { Button } from "./ui/button";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const HealthRecommendations = ({ symptoms, medications, user }: Props) => {

    const [results, setResults] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const storedPlan = localStorage.getItem("cura_health_plan");
        if (storedPlan) {
            setResults(storedPlan);
        }
    }, []);

    const { mutate, isPending } = useMutation({
        mutationKey: ["get-plan"],
        mutationFn: async () => {
            setIsLoading(true);
            const res = await getHealthPlan({ symptoms, medications, user });
            setResults(res);
            setIsLoading(false);
            return res;
        },
        onError: (error) => {
            setIsLoading(false);
            console.error(error);
            toast.error("Error generating health plan");
        },
        onSuccess: (res) => {
            setIsLoading(false);
            toast.success("Health plan generated!");
            if (res) {
                localStorage.setItem("cura_health_plan", res);
            }
        },
    });

    const handleGetPlan = () => {
        setIsLoading(true);
        const storedPlan = localStorage.getItem("cura_health_plan");
        if (storedPlan) {
            setResults(storedPlan);
            setIsLoading(false);
        } else {
            mutate();
        }
        setIsOpen(true);
    };

    return (
        <div className="flex flex-col items-start w-full">
            <Card className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 w-full border-0 md:border shadow-none">
                <CardHeader className="p-0 px-4 md:px-6 py-2 space-y-0 hidden md:block">
                    <CardTitle className="text-lg font-heading">
                        Personalized Health Plan
                    </CardTitle>
                    <CardDescription>
                        AI-generated health tips. Please consult a healthcare professional for any medical advice.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 md:pb-0 -mt-2.5 md:pr-6 w-full md:w-max">
                    {/* <CardContent className="p-0 mt-2 md:-mt-2.5 pr-0 px-4 md:px-0 pb-4 md:pb-0 md:pr-6 w-full md:w-max"> */}
                    <Button
                        disabled={isLoading}
                        onClick={handleGetPlan}
                        className="mt-2 bg-red-500 hover:bg-red-500/80 flex items-center w-full md:w-max"
                    >
                        {isLoading ? (
                            <LoaderIcon className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                            <HeartPulseIcon className="h-4 w-4 mr-2" />
                        )}
                        Get plan
                    </Button>
                </CardContent>

                <HealthPlanModal isOpen={isOpen} setIsOpen={setIsOpen} result={results} />
            </Card>
        </div>
    )
};

export default HealthRecommendations
