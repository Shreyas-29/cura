import { create } from "zustand";

interface SettingsStore {
    isSymptomModalOpen: boolean;
    isMedicationModalOpen: boolean;
    isPersonalDetailsModalOpen: boolean;
    openSymptomModal: () => void;
    closeSymptomModal: () => void;
    openMedicationModal: () => void;
    closeMedicationModal: () => void;
    openPersonalDetailsModal: () => void;
    closePersonalDetailsModal: () => void;
}

const useSettingsModal = create<SettingsStore>((set) => ({
    isSymptomModalOpen: false,
    isMedicationModalOpen: false,
    isPersonalDetailsModalOpen: false,
    openSymptomModal: () => set({ isSymptomModalOpen: true }),
    closeSymptomModal: () => set({ isSymptomModalOpen: false }),
    openMedicationModal: () => set({ isMedicationModalOpen: true }),
    closeMedicationModal: () => set({ isMedicationModalOpen: false }),
    openPersonalDetailsModal: () => set({ isPersonalDetailsModalOpen: true }),
    closePersonalDetailsModal: () => set({ isPersonalDetailsModalOpen: false }),
}));

export default useSettingsModal;
