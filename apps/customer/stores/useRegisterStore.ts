"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type RegisterState = {
  email: string;
  setEmail: (email: string) => void;
}

export const useRegisterStore = create<RegisterState>()(
  persist(
    (set) => ({
      email: "",
      setEmail: (email) => set({ email }),
    }),
    { name: "register-storage" }
  )
);
