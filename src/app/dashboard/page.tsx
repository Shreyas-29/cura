import { AddSymptomCard, Icons } from "@/components";
import MagicCard from "@/components/ui/magic-card";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRightIcon, BrainIcon, HeartPulseIcon, NotepadTextIcon } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {

    const user = await currentUser();

    return (
        <div className="flex flex-col items-center justify-start w-full h-full max-w-3xl mx-auto py-6">
            <div className="flex flex-col w-full px-4 md:px-0 select-none">
                <h2 className="text-xl font-medium font-heading">
                    Get started with your health journey
                </h2>
                <MagicCard color="rgba(239,68,68,.08)" className="border-2 border-orange-100 max-w-full mt-4">
                    <Link href="/dashboard/health-status" className="flex items-center justify-between w-full bg-background group p-4 md:px-8 md:py-5">
                        <div className="space-y-1">
                            <h5 className="text-lg font-medium font-heading text-primary">
                                Welcome, {user?.firstName}!
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Check your health status
                            </p>
                        </div>
                        <HeartPulseIcon strokeWidth={1.5} className="w-8 h-8 fill-red-500 text-red-300 group-hover:animate-pump" />
                    </Link>
                </MagicCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6">
                    <div className="md:col-span-1 w-full">
                        <MagicCard color="rgba(139,92,246,.1)" className="border-2 border-violet-100 max-w-full">
                            <Link href="/dashboard/health-plan" className="flex flex-col items-center justify-between w-full group p-4 bg-violet-50 z-50 gap-y-6">
                                <div className="flex w-full">
                                    <Icons.bot className="w-20 h-auto group-hover:scale-105 transition transform" />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="space-y-1">
                                        <h5 className="text-lg font-medium font-heading text-violet-500">
                                            Virtual assistant
                                        </h5>
                                        <p className="text-sm text-neutral-600">
                                            Get your personalized health plan
                                        </p>
                                    </div>
                                    <ArrowRightIcon className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform group-hover:text-violet-500 mr-1" />
                                </div>
                            </Link>
                        </MagicCard>
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                        <AddSymptomCard />
                        <div className="md:row-span-1 w-full">
                            <MagicCard color="rgba(217,70,239,.1)" className="border-2 border-fuchsia-100 max-w-full">
                                <Link href="#" className="flex items-center justify-between w-full group p-4 bg-fuchsia-50 z-50 gap-6">
                                    <div className="space-y-1">
                                        <h5 className="text-lg font-medium font-heading text-fuchsia-500">
                                            Mental wellness
                                        </h5>
                                        <p className="text-sm text-neutral-600">
                                            Review your mental health
                                        </p>
                                    </div>
                                    <div className="flex">
                                        <BrainIcon strokeWidth={1.8} className="w-12 h-12 text-fuchsia-500 group-hover:scale-105 transition transform" />
                                    </div>
                                </Link>
                            </MagicCard>
                        </div>
                    </div>
                </div>
                <MagicCard color="rgba(99,102,241,.08)" className="border-2 border-indigo-100 max-w-full mt-6">
                    <Link href="/dashboard/health-tips" className="flex items-center justify-between w-full bg-background group p-4 md:px-8 md:py-5">
                        <div className="space-y-1">
                            <h5 className="text-lg font-medium font-heading text-indigo-500">
                                Health tips
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Get health tips and advice from experts
                            </p>
                        </div>
                        <Icons.sparkles className="w-8 h-8 group-hover:scale-105 transition transform" />
                    </Link>
                </MagicCard>
                <MagicCard color="rgba(245,158,11,.08)" className="border-2 border-amber-100 max-w-full mt-6">
                    <Link href="/dashboard/summary" className="flex items-center justify-between w-full bg-background group p-4 md:px-8 md:py-5">
                        <div className="space-y-1">
                            <h5 className="text-lg font-medium font-heading text-amber-500">
                                Health summary
                            </h5>
                            <p className="text-sm text-neutral-600">
                                Get a summary of your health status
                            </p>
                        </div>
                        <NotepadTextIcon strokeWidth={1.8} className="w-8 h-8 text-amber-500 group-hover:scale-105 transition transform" />
                    </Link>
                </MagicCard>
            </div>
        </div>
    )
};

export default DashboardPage
