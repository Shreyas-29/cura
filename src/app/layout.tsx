import { Providers } from "@/components";
import { Toaster } from "@/components/ui/sonner";
import { dmSans, inter } from "@/constants";
import { cn } from "@/lib";
import "@/styles/globals.css";
import { generateMetadata } from "@/utils";
import { DM_Sans } from "next/font/google";

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
                    "min-h-screen bg-background text-foreground !font-heading antialiased",
                    inter.variable,
                    dmSans.variable,
                )}
            >
                <Providers>
                    <Toaster richColors theme="light" position="top-center" />
                    {children}
                </Providers>
            </body>
        </html>
    );
};
