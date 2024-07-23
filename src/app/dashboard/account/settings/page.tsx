"use client";

import { MedicationModal, SymptomModal, UserDetailsModal } from "@/components";
import { Button } from "@/components/ui/button";
import { useSettingsModal } from "@/hooks";

const Settings = () => {

    const {
        openSymptomModal,
        closeSymptomModal,
        openMedicationModal,
        closeMedicationModal,
        openPersonalDetailsModal,
        closePersonalDetailsModal,
        isSymptomModalOpen,
        isMedicationModalOpen,
        isPersonalDetailsModalOpen,
    } = useSettingsModal();

    return (
        <div className="flex flex-col items-start justify-start w-full max-w-3xl py-8 mx-auto">
            <div className="flex flex-col items-start gap-2">
                <h2 className="text-xl font-semibold">
                    Manage your settings
                </h2>
                <p className="text-sm text-muted-foreground">
                    Update your account settings
                </p>
            </div>
            <div className="flex flex-col items-start w-full py-8 gap-y-8">
                <div className="space-y-4">
                    <h5 className="text-base font-medium">
                        Update your symptoms
                    </h5>
                    <Button size="sm" variant="black" onClick={openSymptomModal}>
                        Add a symptom
                    </Button>
                </div>
                <div className="space-y-4">
                    <h5 className="text-base font-medium">
                        Update your medications
                    </h5>
                    <Button size="sm" variant="black" onClick={openMedicationModal}>
                        Add a medication
                    </Button>
                </div>
                <div className="space-y-4">
                    <h5 className="text-base font-medium">
                        Update your personal information
                    </h5>
                    <Button size="sm" variant="black" onClick={openPersonalDetailsModal}>
                        Update information
                    </Button>
                </div>
            </div>

            <SymptomModal />
            <MedicationModal />
            <UserDetailsModal />
        </div>
    )
};

export default Settings
