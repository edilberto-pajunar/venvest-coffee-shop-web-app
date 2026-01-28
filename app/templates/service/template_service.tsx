import { collection, onSnapshot, deleteDoc, doc, addDoc } from "firebase/firestore";
import { Template, SectionStyles } from "../interface/Template";
import { db } from "@/app/utils/firebase.browser";

const DEFAULT_SECTIONS: SectionStyles = {
    header: { fontSize: 18, alignment: 'center', isBold: true },
    metadata: { fontSize: 12, alignment: 'left', isBold: false },
    itemRow: { fontSize: 14, alignment: 'left', isBold: false },
    totals: { fontSize: 14, alignment: 'right', isBold: true },
    footer: { fontSize: 12, alignment: 'center', isBold: false }
};

export const TemplateService = {
    subscribeToTemplates(
        callback: (templates: Template[]) => void,
        errorCallback?: (error: Error) => void
    ): (() => void) {
        try {
            const collectionRef = collection(db, "template");
            const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                const templates = snapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name || 'Untitled Template',
                        sections: data.sections || DEFAULT_SECTIONS,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
                        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
                    } as Template;
                });
                callback(templates);
            }, (error) => {
                console.error("Firestore templates subscription error:", error);
                if (errorCallback) {
                    errorCallback(error as Error);
                }
            });

            return unsubscribe;
        } catch (error) {
            console.error("Failed to subscribe to templates:", error);
            if (errorCallback) {
                errorCallback(error as Error);
            }
            return () => {};
        }
    },

    async deleteTemplate(id: string): Promise<void> {
        try {
            await deleteDoc(doc(db, "templates", id));
            console.log("Template deleted:", id);
        } catch (error) {
            console.error("Failed to delete template:", error);
            throw error;
        }
    },

    async createTemplate(name: string): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, "templates"), {
                name,
                sections: DEFAULT_SECTIONS,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log("Template created:", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("Failed to create template:", error);
            throw error;
        }
    }
}