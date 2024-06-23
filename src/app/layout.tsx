import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components";
import { dmSans, inter } from "@/constants";

const font = DM_Sans({ subsets: ["latin"] });

export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground font-default antialiased",
                    inter.variable,
                    dmSans.variable,
                )}
            >
                <Providers>
                    <Toaster richColors theme="light" position="top-right" />
                    {children}
                </Providers>
            </body>
        </html>
    );
};
