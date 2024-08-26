import { HeartHandshakeIcon, HeartPulseIcon, LucideIcon, PillIcon, StethoscopeIcon, UserIcon, WandSparklesIcon } from "lucide-react";

type Feature = {
    icon: LucideIcon;
    title: string;
    info: string;
};

export const FEATURES: Feature[] = [
    {
        icon: UserIcon,
        title: "Personalized Profiles",
        info: "Create and manage your personal health profile with ease.",
    },
    {
        icon: StethoscopeIcon,
        title: "Symptom Tracking",
        info: "Easily track and log your symptoms for accurate analysis.",
    },
    {
        icon: PillIcon,
        title: "Medication Management",
        info: "Keep track of your prescriptions and receive timely reminders.",
    },
    {
        icon: HeartPulseIcon,
        title: "Health Analytics",
        info: "Get detailed insights into your health trends over time.",
    },
    {
        icon: WandSparklesIcon,
        title: "AI Recommendations",
        info: "Receive personalized recommendations for your health concerns.",
    },
    {
        icon: HeartHandshakeIcon,
        title: "Wellness Tips",
        info: "Receive expert tips and advice to maintain your health.",
    },
];
