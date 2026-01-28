"use client"

import { create } from "zustand";

interface DashboardStore {
    // printers: Printer[];
    // logs: Log[];
    loading: boolean;
    error: string | null;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
    // printers: [],
    // logs: [],
    loading: false,
    error: null,
}))