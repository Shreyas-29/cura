import { Metadata } from "next";

export const generateMetadata = ({
    title = `${process.env.NEXT_PUBLIC_APP_NAME} - Your Personal Health Assistant`,
    description = `${process.env.NEXT_PUBLIC_APP_NAME} is a comprehensive virtual health coach platform that leverages AI to provide personalized health and wellness recommendations.`,
    image = "/thumbnail.png",
    icons = [
        {
            rel: "icon",
            sizes: "180x180",
            url: "/icons/favicon-180x180.png",
        },
        {
            rel: "icon",
            sizes: "32x32",
            url: "/icons/favicon-32x32.png",
        },
        {
            rel: "icon",
            sizes: "16x16",
            url: "/icons/favicon-16x16.png",
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
    // openGraph: {
    //     title,
    //     description,
    //     ...(image && { images: [{ url: image }] }),
    // },
});
