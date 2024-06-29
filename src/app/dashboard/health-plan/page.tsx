import { getMessags } from "@/actions";
import { ChatBox, HealthRecommendations } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const HealthPlanPage = async () => {

    const messages = await getMessags();

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
        <div className="max-w-6xl mx-auto p-4 h-[calc(100dvh-56px)]">
            <div className="flex flex-col items-center h-full w-full max-w-4xl mx-auto gap-6">
                <HealthRecommendations
                    symptoms={symptoms}
                    medications={medications}
                    user={dbUser!}
                />
                <ChatBox
                    user={dbUser!}
                    symptoms={symptoms}
                    medications={medications}
                    messages={messages!}
                />
            </div>
        </div>
    );
};

export default HealthPlanPage;