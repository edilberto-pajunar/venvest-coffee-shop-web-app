import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/utils/firebase.browser";
import { Printer } from "../interface/Printer";
import { doc, updateDoc } from "firebase/firestore";


export const PrinterService = {

    subscribeToPrinters(
        callback: (printer: Printer[]) => void,
        errorCallback?: (error: Error) => void
    ): (() => void) {
        try {
        const collectionRef = collection(db, "printer")
            const unsubscribe = onSnapshot(
                collectionRef, 
                (snapshot) => {
            if (snapshot.empty) {
                        console.log('📭 No printers found in Firestore');
                callback([])
            } else {
                const printer = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                        console.log('✅ Printers loaded:', printer.length);
                callback(printer as Printer[])
            }
                },
                (error) => {
                    console.error('❌ Firestore subscription error:', error);
                    if (error.code === 'permission-denied') {
                        console.error('🔒 Check Firestore Security Rules - see FIREBASE_SETUP.md');
                    }
                    if (errorCallback) {
                        errorCallback(error as Error);
                    }
                }
            );
        return unsubscribe;
        } catch (error) {
            console.error('❌ Failed to subscribe to printers:', error);
            if (errorCallback) {
                errorCallback(error as Error);
            }
            return () => {};
        }
    },

    async addPrinter(printer: Printer): Promise<void> {
        try {
            const docRef = await addDoc(collection(db, "printer"), printer);
            console.log('✅ Printer added:', docRef.id);
        } catch (error) {
            console.error('❌ Failed to add printer:', error);
            throw error;
        }
    },

    async updatePrinter(printer: Printer): Promise<void> {
        try {
            const printerRef = doc(db, "printer", printer.id);
            await updateDoc(printerRef, {
                label: printer.label,
                isOnline: printer.isOnline,
                url: printer.url
            });
            console.log('✅ Printer updated:', printer.id);
        } catch (error) {
            console.error('❌ Failed to update printer:', error);
            throw error;
        }
    }
}