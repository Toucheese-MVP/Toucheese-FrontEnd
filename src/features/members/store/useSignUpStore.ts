import { create } from "zustand";

interface SignUpState {
  email: string;
  password: string;
  name: string;
  phone: string;
  verificationCode: string;
  isVerified: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  setPhone: (phone: string) => void;
  setVerificationCode: (code: string) => void;
  setIsVerified: (verified: boolean) => void;
}

export const useSignUpStore = create<SignUpState>((set) => ({
  email: "",
  password: "",
  name: "",
  phone: "",
  verificationCode: "",
  isVerified: false,
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setVerificationCode: (code) => set({ verificationCode: code }),
  setIsVerified: (verified) => set({ isVerified: verified }),
}));
