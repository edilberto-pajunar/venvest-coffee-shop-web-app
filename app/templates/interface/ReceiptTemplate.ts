// The overall configuration for a specific printer or store
export interface ReceiptTemplate {
    id: string;
    name: string; // e.g., "Standard Coffix Receipt"
    sections: ReceiptSectionStyles; // Fixed set of logical sections
    createdAt: Date;
    updatedAt?: Date;
}

// A mapped object ensuring we have styles for all required parts of a receipt
export interface ReceiptSectionStyles {
    header: TextStyle;       // For Store Name, Address
    metadata: TextStyle;     // For Order #, Date, Cashier Name
    itemRow: TextStyle;      // For the actual coffee/food items (Repeats N times)
    totals: TextStyle;       // For Subtotal, Tax, Grand Total
    footer: TextStyle;       // For "Thank You", Wifi Password, QR Codes
}

// The definition of what a "Line" looks like
export interface TextStyle {
    fontSize: number;        // per pixel
    alignment: 'left' | 'center' | 'right';
    isBold: boolean;         // Added boolean for extra emphasis
}