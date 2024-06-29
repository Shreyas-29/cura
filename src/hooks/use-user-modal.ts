import { create } from "zustand";

interface UserModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUserModal = create<UserModalState>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export default useUserModal;

