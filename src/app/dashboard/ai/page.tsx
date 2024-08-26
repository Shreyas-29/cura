import { getMessags } from "@/actions";
import { ChatBox } from "@/components";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const AIPage = async () => {

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

    const isPro = dbUser?.stripeCustomerId ? true : false;

    return (
        <div className="flex flex-col items-start w-full h-[calc(100dvh-52px)] sm:h-[calc(100dvh-72px)] pt-2 md:py-4">
            <div className="flex flex-col items-center h-full w-full">
                <ChatBox
                    isPro={isPro}
                    user={dbUser!}
                    symptoms={symptoms}
                    medications={medications}
                    messages={messages!}
                />
            </div>
        </div>
    );
};

export default AIPage;