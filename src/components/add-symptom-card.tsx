import { ClipboardPlusIcon } from "lucide-react";
import Link from "next/link";
import MagicCard from "./ui/magic-card";

const AddSymptomCard = () => {
    return (
        <div className="md:row-span-1 w-full">
            <MagicCard color="rgba(6,182,212,.1)" className="border-2 border-cyan-100 max-w-full">
                <Link href="/dashboard/account/settings" className="flex items-center justify-between w-full group p-4 bg-cyan-50 z-50 gap-6">
                    <div className="space-y-1">
                        <h5 className="text-lg font-medium font-heading text-cyan-500">
                            Add new symptom
                        </h5>
                        <p className="text-sm text-neutral-600">
                            Share details about any new symptom
                        </p>
                    </div>
                    <div className="flex">
                        <ClipboardPlusIcon strokeWidth={1.8} className="w-12 h-12 text-cyan-500 group-hover:scale-105 transition transform" />
                    </div>
                </Link>
            </MagicCard>
        </div>
    )
};

export default AddSymptomCard
