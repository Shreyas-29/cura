export const PLANS = [
    {
        name: "Free",
        info: "Free forever",
        price: 0,
        features: [
            {
                text: "Basic health tracking",
            },
            {
                text: "Personalized health profile",
            },
            {
                text: "Medication recommendations",
                tooltip: "Up to 50 recommendations per month",
            },
            {
                text: "AI-powered symptom suggestions",
                tooltip: "Get upto 10 suggestions per month",
            }
        ],
        btn: {
            text: "Start for free",
            href: "/dashboard/account/billing"
        },
    },
    {
        name: "Pro",
        info: "Get the best of Cura",
        price: 9,
        features: [
            {
                text: "Advanced health tracking",
            },
            {
                text: "Personalized health profile",
            },
            {
                text: "Priority support",
            },
            {
                text: "Medication recommendations",
                tooltip: "Get unlimited recommendations",
            },
            {
                text: "AI-powered symptom suggestions",
                tooltip: "Get unlimited suggestions",
            },
        ],
        btn: {
            text: "Upgrade to Pro",
            href: "/dashboard/account/billing"
        },
    },
];