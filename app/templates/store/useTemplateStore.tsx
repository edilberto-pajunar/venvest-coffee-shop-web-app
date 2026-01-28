import { create } from "zustand";
import { Unsubscribe } from "firebase/firestore";
import { TemplateService } from "../service/template_service";
import { Template } from "../interface/ReceiptTemplate";

interface TemplateStore {
    unsubscribe: Unsubscribe | null;
    templates: Template[];
    loading: boolean;
    error: string | null;
    setTemplates: () => void;
    deleteTemplate: (id: string) => Promise<void>;
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
    unsubscribe: null,
    templates: [],
    loading: false,
    error: null,
    setTemplates: () => {
        const {unsubscribe} = get();
        if (unsubscribe) {
            unsubscribe();
            set({ unsubscribe: null })
        }

        set({ loading: true, error: null });

        const unsubscribeListener = TemplateService.subscribeToTemplates(
            (templates) => {
                console.log("Templates fetched...", templates.length)
                set({ templates, loading: false, error: null })
            },
            (error) => {
                console.error("Template subscription error:", error);
                set({ error: error.message || 'Failed to load templates', loading: false, templates: [] })
            }
        );

        set({unsubscribe: unsubscribeListener});
    },
    deleteTemplate: async (id: string) => {
        try {
            await TemplateService.deleteTemplate(id);
        } catch (error) {
            console.error("Failed to delete template:", error);
            throw error;
        }
    }
}));