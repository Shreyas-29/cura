import { Recommendations } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import MagicCard from "@/components/ui/magic-card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";
import { BrainIcon, HeartPulseIcon, NotepadTextIcon, StethoscopeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


const DashboardPage = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
        include: {
            symptoms: true,
            medications: true,
            mentalwellness: true,
        }
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 w-full gap-6 lg:p-8">
            <div className="flex flex-col md:col-span-1 xl:col-span-4 gap-6 w-full">
                <div className="flex flex-col items-center justify-center w-full border border-border/60 rounded-xl py-6 md:py-8">
                    <div className="w-20 h-20 mx-auto">
                        <Image
                            src={dbUser?.image!}
                            alt={dbUser?.firstName!}
                            width={1024}
                            height={1024}
                            className="rounded-full w-full h-full"
                        />
                    </div>
                    <h4 className="text-lg font-medium mt-4">
                        {dbUser?.firstName} {dbUser?.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                        Age: <span className="font-medium">{dbUser?.age}</span>
                    </p>
                    <Link href="/dashboard/account/settings" className={buttonVariants({ size: "sm", className: "mt-4" })}>
                        Update Profile
                    </Link>
                </div>
                <div className="flex flex-col items-start w-full border border-border/60 rounded-xl py-6 md:py-8 px-4 md:px-6">
                    <h4 className="text-lg font-semibold">
                        Information
                    </h4>
                    <ul className="space-y-4 text-sm mt-6">
                        <li className="grid grid-cols-2 text-start text-foreground font-medium">
                            <span>Gender:</span>
                            <span className="text-muted-foreground font-normal capitalize">
                                {dbUser?.gender}
                            </span>
                        </li>
                        <li className="grid grid-cols-2 text-start text-foreground font-medium">
                            <span>Blood Group:</span>
                            <span className="text-muted-foreground font-normal">{dbUser?.bloodGroup}</span>
                        </li>
                        <li className="grid grid-cols-2 text-start text-foreground font-medium">
                            <span>Symptoms:</span>
                            <span className="text-muted-foreground font-normal capitalize">
                                {dbUser?.symptoms?.map((symptom) => symptom.name).join(", ").replace(/_/g, " ").toLowerCase()}
                            </span>
                        </li>
                        <li className="grid grid-cols-2 text-start text-foreground font-medium">
                            <span>Medications:</span>
                            <span className="text-muted-foreground font-normal capitalize">
                                {dbUser?.medications?.map((medication) => medication.name).join(", ").replace("none", "None")}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col md:col-span-1 xl:col-span-8 gap-8 w-full">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                    <MagicCard color="rgba(239,68,68,.08)" className="border-2 border-red-100 max-w-full w-full">
                        <Link href="/dashboard/health-status" className="flex items-center justify-between w-full bg-background group p-4">
                            <div className="space-y-0.5">
                                <h5 className="font-medium font-heading text-red-500">
                                    Your health status
                                </h5>
                                <p className="text-xs text-neutral-600">
                                    Evaluate your health status
                                </p>
                            </div>
                            <HeartPulseIcon strokeWidth={1.8} className="w-8 h-8 text-red-500 group-hover:scale-105 transition transform" />
                        </Link>
                    </MagicCard>

                    <MagicCard color="rgba(217,70,239,.1)" className="border-2 border-fuchsia-100 max-w-full w-full">
                        <Link href="/dashboard/ai" className="flex items-center justify-between w-full group group p-4">
                            <div className="space-y-0.5">
                                <h5 className="font-medium font-heading text-fuchsia-500">
                                    Virtual assistant
                                </h5>
                                <p className="text-xs text-neutral-600">
                                    Chat with our AI bot
                                </p>
                            </div>
                            <div className="flex">
                                <BrainIcon strokeWidth={1.8} className="w-8 h-8 text-fuchsia-500 group-hover:scale-105 transition transform" />
                            </div>
                        </Link>
                    </MagicCard>

                    <MagicCard color="rgba(99,102,241,.08)" className="border-2 border-indigo-100 max-w-full w-full">
                        <Link href="/dashboard/health-tips" className="flex items-center justify-between w-full bg-background group p-4">
                            <div className="space-y-0.5">
                                <h5 className="font-medium font-heading text-indigo-500">
                                    Health tips
                                </h5>
                                <p className="text-xs text-neutral-600">
                                    Get health tips and advice
                                </p>
                            </div>
                            <NotepadTextIcon className="w-8 h-8 text-indigo-500 group-hover:scale-105 transition transform" />
                        </Link>
                    </MagicCard>
                </div>
                <div className="flex flex-col items-start w-full">
                    <h3 className="text-xl font-semibold">
                        Health Recommendations
                    </h3>
                    <div className="max-h-96 w-full mt-7">
                        <Recommendations
                            symptoms={symptoms}
                            medications={medications}
                            user={dbUser!}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DashboardPage
