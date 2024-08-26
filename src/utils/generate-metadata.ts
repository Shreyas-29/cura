import { Metadata } from "next";

export const generateMetadata = ({
    title = `${process.env.NEXT_PUBLIC_APP_NAME} - Your Personal Health Assistant`,
    description = `${process.env.NEXT_PUBLIC_APP_NAME} is a comprehensive virtual health coach platform that leverages AI to provide personalized health and wellness recommendations.`,
    image = "/images/thumbnail.png",
    icons = [
        {
            rel: "icon",
            sizes: "512x512",
            url: "/icons/logo.png",
        },
        {
            rel: "manifest",
            sizes: "512x512",
            url: "/icons/logo.svg",
        },
    ],
}: {
    title?: string;
    description?: string;
    image?: string;
    icons?: {
        rel: string;
        sizes: string;
        url: string;
    }[];
    noIndex?: boolean;
} = {}): Metadata => ({
    title: title,
    description: description,
    icons: icons,
    openGraph: {
        title,
        description,
        ...(image && { images: [{ url: image }] }),
    },
});
