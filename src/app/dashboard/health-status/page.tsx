import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const HealthStatusPage = async () => {

    const user = await currentUser();

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

    const mentalWellness = await db.mentalWellness.findMany({
        where: {
            userId: user?.id,
        },
    });

    return (
        <div className="flex flex-col items-start w-full">
            <div className="w-full p-2 md:p-4">
                <h1 className="text-2xl font-semibold font-heading">
                    Health Status
                </h1>

                {/* Symptoms Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-medium mb-4">
                        Symptoms
                    </h2>
                    {symptoms.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                            {symptoms.map((symptom) => (
                                <Card key={symptom.id}>
                                    <CardHeader>
                                        <CardTitle className="capitalize text-xl">
                                            {symptom.name.toLowerCase().replace("_", " ")}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground capitalize">
                                            How often: <span className="font-medium text-foreground">{symptom.frequency.toLowerCase()}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            On a scale of 1-10: <span className="font-medium text-foreground">{symptom.intensity}</span>
                                        </p>
                                    </CardContent>
                                    <CardFooter className="text-muted-foreground gap-1">
                                        Reported: <span className="font-medium text-foreground">{symptom.loggedAt?.toLocaleString()}</span>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No symptoms reported.</p>
                    )}
                </div>

                {/* Medications */}
                <div className="mt-8">
                    <h2 className="text-xl font-medium mb-4">
                        Medications
                    </h2>
                    {medications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                            {medications.map((medication) => (
                                <Card key={medication.id}>
                                    <CardHeader>
                                        <CardTitle className="capitalize text-xl">
                                            {medication.name.toLowerCase()}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground capitalize">
                                            How often: <span className="font-medium text-foreground">{medication.frequency.toLowerCase()}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            Dosage: <span className="font-medium text-foreground">{medication.dosage}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            Purpose: <span className="font-medium text-foreground">{medication.purpose}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            Adherence: <span className="font-medium text-foreground">{medication.adherence.toLowerCase()}</span>
                                        </p>
                                    </CardContent>
                                    {medication.startDate && (
                                        <CardFooter>
                                            Started: <span className="font-medium text-foreground">{medication.startDate?.toLocaleString()}</span>
                                        </CardFooter>
                                    )}
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No medications reported.</p>
                    )}
                </div>

                {/* Mental Wellness */}
                <div className="mt-8">
                    <h2 className="text-xl font-medium mb-4">
                        Mental Wellness
                    </h2>
                    {mentalWellness.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                            {mentalWellness.map((wellness) => (
                                <Card key={wellness.id}>
                                    <CardContent className="pt-6">
                                        <p className="text-muted-foreground capitalize">
                                            Mood: <span className="font-medium text-foreground">{wellness.mood.toLowerCase()}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            Sleep: <span className="font-medium text-foreground">{wellness.sleep.toLowerCase()}</span>
                                        </p>
                                        <p className="text-muted-foreground">
                                            Stress: <span className="font-medium text-foreground">{wellness.stress.toLowerCase()}</span>
                                        </p>
                                    </CardContent>
                                    <CardFooter>
                                        <p className="text-muted-foreground">
                                            How are you feeling today? <span className="font-medium text-foreground">{wellness.happiness}</span>
                                        </p>
                                        {wellness.anxiety && (
                                            <p className="text-muted-foreground">
                                                {wellness.anxiety}
                                            </p>
                                        )}
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground">No mental wellness reported.</p>
                    )}
                </div>
            </div>
        </div>
    )
};

export default HealthStatusPage
