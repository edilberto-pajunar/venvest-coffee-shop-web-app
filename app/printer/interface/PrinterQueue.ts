export interface PrintQueue {
    id: string;
    printerId: string;      // e.g., "AKL" [cite: 12]
    status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'ERROR'; // [cite: 25]
    createdAt: Date;
    
    // EMBEDDED CONTENT (The Receipt Details)
    // This matches the "Sections" we defined in the LineDecoration
    content: {
      header: {
        storeName: "Coffix Auckland",
        address: "123 Queen St",
        gstNumber: "123-456-789"
      },
      // The scalable list of items
      items: [
        { name: "Flat White", qty: 1, price: 5.00, mods: ["Soy Milk"] },
        { name: "Muffin", qty: 2, price: 4.50 }
      ],
      totals: {
        subtotal: 14.00,
        tax: 2.10,
        grandTotal: 16.10
      },
      footer: {
        message: "Thanks for visiting!",
        wifiCode: "COFFIX_GUEST"
      }
    }
  }