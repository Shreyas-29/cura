import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib";
import { currentUser } from "@clerk/nextjs/server";

const SummaryPage = async () => {

    const user = await currentUser();

    const dbUser = await db.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    if (!dbUser) {
        return null;
    }

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

    const { age, bloodGroup, height, weight, gender, medicalIssues } = dbUser;

    return (
        <div className="flex flex-col items-start w-full">
            <div className="w-full p-2 md:p-4">
                <h1 className="text-2xl font-semibold">
                    Health Summary
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Age: <span className="font-medium text-foreground">{age || "N/A"}</span>
                            </p>
                            <p className="text-muted-foreground">
                                Gender: <span className="font-medium text-foreground capitalize">{gender || "N/A"}</span>
                            </p>
                            <p className="text-muted-foreground">
                                Blood Group: <span className="font-medium text-foreground">{bloodGroup || "N/A"}</span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Physical Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Height: <span className="font-medium text-foreground">{height || "N/A"} cm</span>
                            </p>
                            <p className="text-muted-foreground">
                                Weight: <span className="font-medium text-foreground capitalize">{weight || "N/A"} kg</span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Symptoms
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {symptoms.length > 0 ? (
                                <ul className="space-y-2 list-disc pl-4">
                                    {symptoms.map((symptom) => (
                                        <li key={symptom.id}>
                                            <p className="text-muted-foreground capitalize">{symptom.name.toLowerCase()}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground">No symptoms reported.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Medications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {medications.length > 0 ? (
                                <ul className="space-y-2 list-disc pl-4">
                                    {medications.map((medication) => (
                                        <li key={medication.id}>
                                            <p className="text-muted-foreground capitalize">{medication.name.toLowerCase()}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground">No medications reported.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Medical Issues
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                {medicalIssues || "No medical issuges reported"}
                            </p>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    )
};

export default SummaryPage
