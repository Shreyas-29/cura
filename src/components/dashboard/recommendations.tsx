"use client";

import { getRecommndations } from "@/actions";
import { Medication, Symptom, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface Props {
    symptoms: Symptom[];
    medications: Medication[];
    user: User;
}

const Recommendations = ({ symptoms, medications, user }: Props) => {

    const [recommendations, setRecommendations] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { mutate } = useMutation({
        mutationKey: ["get-tips"],
        mutationFn: async () => {
            setIsLoading(true);
            const res = await getRecommndations({ symptoms, medications, user });
            localStorage.setItem("cura_health_recommendations", res);
            setRecommendations(res);
            setIsLoading(false);
            return res;
        },
        onError: (error) => {
            setIsLoading(false);
            setError("Error getting health tips");
        },
        onSuccess: () => {
            setError(null);
            setIsLoading(false);
        },
    });

    useEffect(() => {
        const storedTips = localStorage.getItem("cura_health_recommendations");
        if (storedTips) {
            setRecommendations(storedTips);
        } else {
            mutate();
        }
    }, [mutate]);

    return (
        <div className="flex flex-col w-full px-4 rounded-xl border border-border/80 max-h-full overflow-y-scroll scrollbar-hide">
            {isLoading ? (
                <div className="flex flex-col items-center justify-center w-full">
                    <LoaderIcon className="w-6 h-6 animate-spin" />
                    <p className="text-sm text-muted-foreground font-medium mt-2">
                        Loading health recommendations...
                    </p>
                </div>
            ) : (
                <div className="flex flex-col w-full">
                    {recommendations ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} className="whitespace-pre-line">
                            {recommendations}
                        </ReactMarkdown>
                    ) : (
                        <p className="text-sm text-muted-foreground font-medium text-center w-full min-h-40">
                            {error || "No recommendations available"}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
};

export default Recommendations
