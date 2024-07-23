import { HealthTips } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const HealthTipsPage = async () => {

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
            <div className="w-full p-2 md:p-4">
                <h1 className="text-2xl font-semibold font-heading">
                    Health Tips
                </h1>

                {/* Health Tips Section */}
                <div className="mt-8">
                    <HealthTips
                        symptoms={symptoms}
                        medications={medications}
                        user={dbUser!}
                    />
                </div>
            </div>
        </div>
    )
};

export default HealthTipsPage
