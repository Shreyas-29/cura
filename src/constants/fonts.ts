import { Inter, DM_Sans } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dmsans",
});
