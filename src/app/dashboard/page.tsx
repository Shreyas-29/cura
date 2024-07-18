import { AddSymptomCard, Banner, Icons, Recommendations } from "@/components";
import MagicCard from "@/components/ui/magic-card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon, BrainIcon, HeartPulseIcon, NotepadTextIcon, SearchIcon, StethoscopeIcon, TabletsIcon } from "lucide-react";
import Link from "next/link";


const DashboardPage = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    const symptoms = await db.symptom.findMany({
        where: {
            userId: user?.id,
        },
    });

    const medications = await db.medication.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="flex flex-col items-start w-full">
            {/* cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full overflow-x-scroll scrollbar-hide mt-6">
                <MagicCard color="rgba(239,68,68,.08)" className="border-2 border-orange-100 w-full">
                    <Link href="/dashboard/health-status" className="flex items-center justify-between w-full bg-background group p-4">
                        <div className="space-y-0.5">
                            <h5 className="font-medium font-heading text-primary">
                                Your health status
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Evaluate your health status
                            </p>
                        </div>
                        <HeartPulseIcon strokeWidth={1.5} className="w-8 h-8 fill-red-500 text-red-300 group-hover:animate-pump" />
                    </Link>
                </MagicCard>

                <MagicCard color="rgba(217,70,239,.1)" className="border-2 border-fuchsia-100 w-full">
                    <Link href="/dashboard/health-plan" className="flex items-center justify-between w-full group group p-4">
                        <div className="space-y-0.5">
                            <h5 className="font-medium font-heading text-fuchsia-500">
                                Virtual assistant
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Chat with our virtual assistant
                            </p>
                        </div>
                        <div className="flex">
                            <BrainIcon strokeWidth={1.8} className="w-8 h-8 text-fuchsia-500 group-hover:scale-105 transition transform" />
                        </div>
                    </Link>
                </MagicCard>

                <MagicCard color="rgba(99,102,241,.08)" className="border-2 border-indigo-100 w-full">
                    <Link href="/dashboard/health-tips" className="flex items-center justify-between w-full bg-background group p-4">
                        <div className="space-y-0.5">
                            <h5 className="font-medium font-heading text-indigo-500">
                                Health tips
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Get health tips and advice
                            </p>
                        </div>
                        <NotepadTextIcon className="w-8 h-8 text-indigo-500 group-hover:scale-105 transition transform" />
                    </Link>
                </MagicCard>

                <MagicCard color="rgba(245,158,11,.08)" className="border-2 border-amber-100 w-full">
                    <Link href="/dashboard/summary" className="flex items-center justify-between w-full bg-background group p-4">
                        <div className="space-y-0.5">
                            <h5 className="font-medium font-heading text-amber-500">
                                Health summary
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Get summary of your health
                            </p>
                        </div>
                        <StethoscopeIcon strokeWidth={1.8} className="w-8 h-8 text-amber-500 group-hover:scale-105 transition transform" />
                    </Link>
                </MagicCard>
            </div>

            {/* health recommendations */}
            <div className="flex flex-col w-full items-start mt-6">
                <h3 className="text-lg font-medium">
                    Health recommendations
                </h3>
                <div className="flex flex-col w-full mt-4">
                    <Recommendations
                        symptoms={symptoms}
                        medications={medications}
                        user={dbUser!}
                    />
                </div>
            </div>
        </div>
    )
};

export default DashboardPage
