"use client";

import { getAuthStatus } from "@/actions";
import { useAuth, useUser } from '@clerk/nextjs';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';

const AuthCallbackPage = () => {

    const { isLoaded, user } = useUser();

    const { isSignedIn } = useAuth();

    const router = useRouter();

    const { data, isLoading } = useQuery({
        queryKey: ["auth-callback"],
        queryFn: async () => await getAuthStatus(),
        retry: true,
        retryDelay: 500,
    });

    if (data?.success) {
        router.push("/onboarding/step-one");
    }

    return (
        <div className="flex items-center justify-center flex-col relative h-screen">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-loader"></div>
                <p className="text-lg font-medium text-center mt-3">
                    Verifying your account...
                </p>
            </div>
        </div>
    )
};

export default AuthCallbackPage;