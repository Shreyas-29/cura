import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SSOCallback() {

    redirect("/onboarding");

    // Handle the redirect flow by rendering the
    // prebuilt AuthenticateWithRedirectCallback component.
    // This is the final step in the custom OAuth flow.
    return <AuthenticateWithRedirectCallback />;
};