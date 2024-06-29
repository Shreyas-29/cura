import { getAuthStatus } from "@/actions";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SSOCallback() {

    const res = await getAuthStatus();

    if (!res.success) {
        redirect("/onboarding");
    }

    // console.log("testing");
    // Handle the redirect flow by rendering the
    // prebuilt AuthenticateWithRedirectCallback component.
    // This is the final step in the custom OAuth flow.
    return <AuthenticateWithRedirectCallback />;
};