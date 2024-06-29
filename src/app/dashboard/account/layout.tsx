import React from "react";
import { UserAccountNavbar } from "@/components";
import { currentUser } from "@clerk/nextjs/server";

interface Props {
    children: React.ReactNode
}

const AccountLayout = async ({ children }: Props) => {

    const user = await currentUser();

    return (
        <main className="mx-auto w-full z-40 relative">
            <UserAccountNavbar />
            {children}
        </main>
    );
};

export default AccountLayout
