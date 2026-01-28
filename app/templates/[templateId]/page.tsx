"use client"

import { useState } from "react";
import { Save, FileText } from "lucide-react";
import { COFFEE_PALETTE } from "@/app/constants/theme";
import { TextStyle, SectionStyles } from "../interface/Template";

const SAMPLE_RECEIPT = {
  header: ["COFFEE SHOP", "123 Main Street, Auckland"],
  metadata: ["Order #12345", "Date: 28 Jan 2026", "Cashier: John"],
  itemRow: ["2x Flat White - $8.00", "1x Long Black - $4.50", "1x Cappuccino - $5.00"],
  totals: ["Subtotal: $17.50", "Tax (15%): $2.63", "Total: $20.13"],
  footer: ["Thank you!", "Visit us again", "www.coffeeshop.com"]
};

const SECTION_LABELS: Record<keyof SectionStyles, { label: string; description: string }> = {
  header: { label: "Header", description: "Store name and address" },
  metadata: { label: "Metadata", description: "Order #, date, cashier" },
  itemRow: { label: "Item Row", description: "Product items purchased" },
  totals: { label: "Totals", description: "Subtotal, tax, grand total" },
  footer: { label: "Footer", description: "Thank you message, QR codes" }
};

export default function TemplatesPage() {
  const [sections, setSections] = useState<SectionStyles>({
    header: { fontSize: 24, alignment: "center", isBold: true },
    metadata: { fontSize: 12, alignment: "left", isBold: false },
    itemRow: { fontSize: 14, alignment: "left", isBold: false },
    totals: { fontSize: 16, alignment: "right", isBold: true },
    footer: { fontSize: 12, alignment: "center", isBold: false }
  });

  const [selectedSection, setSelectedSection] = useState<keyof SectionStyles | null>("header");
  const [saving, setSaving] = useState(false);

  const handleUpdateSection = (section: keyof SectionStyles, updates: Partial<TextStyle>) => {
    setSections(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Template saved successfully!");
  };

  const getStyleFromTextStyle = (textStyle: TextStyle) => {
    return {
      fontSize: `${textStyle.fontSize}px`,
      textAlign: textStyle.alignment as "left" | "center" | "right",
      fontWeight: textStyle.isBold ? 'bold' as const : 'normal' as const
    };
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: COFFEE_PALETTE.textPrimary }}>
          Receipt Template
        </h2>
        <p className="text-sm" style={{ color: COFFEE_PALETTE.textSecondary }}>
          Configure section styles for receipt printing • 5 sections
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: COFFEE_PALETTE.cardBg, borderColor: COFFEE_PALETTE.border }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: COFFEE_PALETTE.textPrimary }}>
              Receipt Sections
            </h3>

            <div className="space-y-2">
              {(Object.keys(sections) as Array<keyof SectionStyles>).map((section) => (
                <div
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className="p-3 rounded-md border cursor-pointer transition-all"
                  style={{
                    backgroundColor: selectedSection === section ? COFFEE_PALETTE.background : COFFEE_PALETTE.cardBg,
                    borderColor: selectedSection === section ? COFFEE_PALETTE.primary : COFFEE_PALETTE.border,
                    borderWidth: selectedSection === section ? '2px' : '1px'
                  }}
                >
                  <div className="mb-2">
                    <span className="text-sm font-medium capitalize" style={{ color: COFFEE_PALETTE.textPrimary }}>
                      {SECTION_LABELS[section].label}
                    </span>
                  </div>
                  
                  <div className="text-xs space-y-1" style={{ color: COFFEE_PALETTE.textSecondary }}>
                    <p>{SECTION_LABELS[section].description}</p>
                    <p>Size: {sections[section].fontSize}px • {sections[section].alignment} • {sections[section].isBold ? 'Bold' : 'Normal'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedSection && (
            <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: COFFEE_PALETTE.cardBg, borderColor: COFFEE_PALETTE.border }}>
              <h3 className="text-lg font-semibold mb-4 capitalize" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Edit {SECTION_LABELS[selectedSection].label}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                    Font Size: {sections[selectedSection].fontSize}px
                  </label>
                  <input
                    type="range"
                    min="8"
                    max="48"
                    value={sections[selectedSection].fontSize}
                    onChange={(e) => handleUpdateSection(selectedSection, { fontSize: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: COFFEE_PALETTE.textSecondary }}>
                    <span>8px</span>
                    <span>48px</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                    Alignment
                  </label>
                  <select
                    value={sections[selectedSection].alignment}
                    onChange={(e) => handleUpdateSection(selectedSection, { alignment: e.target.value as 'left' | 'center' | 'right' })}
                    className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
                    style={{ 
                      borderColor: COFFEE_PALETTE.border,
                      color: COFFEE_PALETTE.textPrimary
                    }}
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sections[selectedSection].isBold}
                      onChange={(e) => handleUpdateSection(selectedSection, { isBold: e.target.checked })}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-sm font-medium" style={{ color: COFFEE_PALETTE.textPrimary }}>
                      Bold Text
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-md font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ backgroundColor: COFFEE_PALETTE.success }}
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Template</span>
              </>
            )}
          </button>
        </div>

        <div className="lg:col-span-2">
          <div className="p-6 rounded-lg shadow-sm border sticky top-4" style={{ backgroundColor: COFFEE_PALETTE.cardBg, borderColor: COFFEE_PALETTE.border }}>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5" style={{ color: COFFEE_PALETTE.primary }} />
              <h3 className="text-lg font-semibold" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Receipt Preview
              </h3>
            </div>

            <div 
              className="rounded-lg border-2 p-8 font-mono bg-white min-h-[600px]"
              style={{ borderColor: COFFEE_PALETTE.border }}
            >
              {(Object.keys(SAMPLE_RECEIPT) as Array<keyof typeof SAMPLE_RECEIPT>).map((section) => (
                <div
                  key={section}
                  onClick={() => setSelectedSection(section)}
                  className="mb-4 cursor-pointer hover:bg-yellow-50 transition-colors px-2 py-2 rounded"
                  style={{
                    backgroundColor: selectedSection === section ? '#FEF3C7' : 'transparent'
                  }}
                >
                  {SAMPLE_RECEIPT[section].map((line, index) => (
                    <div
                      key={index}
                      style={{
                        ...getStyleFromTextStyle(sections[section]),
                        color: COFFEE_PALETTE.textPrimary,
                        marginBottom: '4px'
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: COFFEE_PALETTE.background }}>
              <p className="text-xs font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Preview Notes:
              </p>
              <ul className="text-xs space-y-1" style={{ color: COFFEE_PALETTE.textSecondary }}>
                <li>• Click on any section to edit its style</li>
                <li>• All lines in a section share the same style</li>
                <li>• Highlighted section indicates current selection</li>
                <li>• Changes are reflected in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
