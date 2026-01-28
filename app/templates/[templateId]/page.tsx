"use client"

import { useState } from "react";
import { Save, Plus, Trash2, FileText } from "lucide-react";
import { COFFEE_PALETTE } from "@/app/constants/theme";
import { LineDecoration } from "../interface/LineDecoration";

const SAMPLE_LINES = [
  "COFFEE SHOP",
  "Order #12345",
  "------------------------",
  "2x Flat White",
  "1x Long Black",
  "1x Cappuccino",
  "",
  "Subtotal: $15.50",
  "Tax: $1.55",
  "------------------------",
  "Total: $17.05",
  "",
  "Thank you!",
  "Visit us again",
  "www.coffeeshop.com"
];

export default function TemplatesPage() {
  const [decorations, setDecorations] = useState<LineDecoration[]>([
    { id: "1", line: 1, fontSize: 5, alignment: "center" },
    { id: "2", line: 2, fontSize: 3, alignment: "center" },
    { id: "3", line: 3, fontSize: 1, alignment: "center" },
    { id: "4", line: 8, fontSize: 3, alignment: "right" },
    { id: "5", line: 11, fontSize: 4, alignment: "right" },
  ]);

  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const handleAddDecoration = () => {
    const availableLines = Array.from({ length: 15 }, (_, i) => i + 1).filter(
      line => !decorations.some(d => d.line === line)
    );
    
    if (availableLines.length === 0) {
      alert("All lines already have decorations");
      return;
    }

    const newLine = availableLines[0];
    const newDecoration: LineDecoration = {
      id: Date.now().toString(),
      line: newLine,
      fontSize: 2,
      alignment: "center"
    };
    
    setDecorations([...decorations, newDecoration]);
    setSelectedLine(newLine);
  };

  const handleUpdateDecoration = (id: string, updates: Partial<LineDecoration>) => {
    setDecorations(decorations.map(d => 
      d.id === id ? { ...d, ...updates } : d
    ));
  };

  const handleDeleteDecoration = (id: string) => {
    setDecorations(decorations.filter(d => d.id !== id));
    setSelectedLine(null);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert("Template saved successfully!");
  };

  const getLineStyle = (lineNumber: number) => {
    const decoration = decorations.find(d => d.line === lineNumber);
    if (!decoration) {
      return {
        fontSize: '1rem',
        textAlign: 'left' as const,
        fontWeight: 'normal' as const
      };
    }

    return {
      fontSize: `${decoration.fontSize * 0.4 + 0.6}rem`,
      textAlign: decoration.alignment as "left" | "center" | "right",
      fontWeight: decoration.fontSize > 4 ? 'bold' as const : 'normal' as const
    };
  };

  return (
    <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: COFFEE_PALETTE.textPrimary }}>
          Receipt Templates
        </h2>
        <p className="text-sm" style={{ color: COFFEE_PALETTE.textSecondary }}>
          Configure line decorations for receipt printing • {decorations.length} lines configured
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: COFFEE_PALETTE.cardBg, borderColor: COFFEE_PALETTE.border }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Line Decorations
              </h3>
              <button
                onClick={handleAddDecoration}
                className="p-2 rounded-md transition-opacity hover:opacity-80"
                style={{ backgroundColor: COFFEE_PALETTE.primary }}
              >
                <Plus className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {decorations.sort((a, b) => a.line - b.line).map((decoration) => (
                <div
                  key={decoration.id}
                  onClick={() => setSelectedLine(decoration.line)}
                  className="p-3 rounded-md border cursor-pointer transition-all"
                  style={{
                    backgroundColor: selectedLine === decoration.line ? COFFEE_PALETTE.background : COFFEE_PALETTE.cardBg,
                    borderColor: selectedLine === decoration.line ? COFFEE_PALETTE.primary : COFFEE_PALETTE.border,
                    borderWidth: selectedLine === decoration.line ? '2px' : '1px'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium" style={{ color: COFFEE_PALETTE.textPrimary }}>
                      Line {decoration.line}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDecoration(decoration.id);
                      }}
                      className="p-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" style={{ color: COFFEE_PALETTE.error }} />
                    </button>
                  </div>
                  
                  <div className="text-xs space-y-1" style={{ color: COFFEE_PALETTE.textSecondary }}>
                    <p>Font Size: {decoration.fontSize}</p>
                    <p className="capitalize">Align: {decoration.alignment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedLine && (
            <div className="p-6 rounded-lg shadow-sm border" style={{ backgroundColor: COFFEE_PALETTE.cardBg, borderColor: COFFEE_PALETTE.border }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Edit Line {selectedLine}
              </h3>

              {(() => {
                const decoration = decorations.find(d => d.line === selectedLine);
                if (!decoration) return null;

                return (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                        Line Number
                      </label>
                      <select
                        value={decoration.line}
                        onChange={(e) => {
                          const newLine = parseInt(e.target.value);
                          if (!decorations.some(d => d.line === newLine && d.id !== decoration.id)) {
                            handleUpdateDecoration(decoration.id, { line: newLine });
                            setSelectedLine(newLine);
                          }
                        }}
                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
                        style={{ 
                          borderColor: COFFEE_PALETTE.border,
                          color: COFFEE_PALETTE.textPrimary
                        }}
                      >
                        {Array.from({ length: 15 }, (_, i) => i + 1).map(lineNum => (
                          <option 
                            key={lineNum} 
                            value={lineNum}
                            disabled={decorations.some(d => d.line === lineNum && d.id !== decoration.id)}
                          >
                            Line {lineNum}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                        Font Size: {decoration.fontSize}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={decoration.fontSize}
                        onChange={(e) => handleUpdateDecoration(decoration.id, { fontSize: parseInt(e.target.value) })}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs mt-1" style={{ color: COFFEE_PALETTE.textSecondary }}>
                        <span>Small (1)</span>
                        <span>Large (10)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                        Alignment
                      </label>
                      <select
                        value={decoration.alignment}
                        onChange={(e) => handleUpdateDecoration(decoration.id, { alignment: e.target.value })}
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
                  </div>
                );
              })()}
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
              {SAMPLE_LINES.map((line, index) => {
                const lineNumber = index + 1;
                const style = getLineStyle(lineNumber);
                const hasDecoration = decorations.some(d => d.line === lineNumber);

                return (
                  <div
                    key={index}
                    onClick={() => hasDecoration && setSelectedLine(lineNumber)}
                    className={`mb-1 ${hasDecoration ? 'cursor-pointer hover:bg-yellow-50' : ''} transition-colors px-2 py-1 rounded`}
                    style={{
                      ...style,
                      color: COFFEE_PALETTE.textPrimary,
                      backgroundColor: selectedLine === lineNumber ? '#FEF3C7' : 'transparent',
                      minHeight: '1.5rem',
                      position: 'relative'
                    }}
                  >
                    <span className="absolute left-0 -ml-6 text-xs" style={{ color: COFFEE_PALETTE.textSecondary }}>
                      {lineNumber}
                    </span>
                    {line || <span style={{ opacity: 0.3 }}>(empty)</span>}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: COFFEE_PALETTE.background }}>
              <p className="text-xs font-medium mb-2" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Preview Notes:
              </p>
              <ul className="text-xs space-y-1" style={{ color: COFFEE_PALETTE.textSecondary }}>
                <li>• Click on decorated lines to edit their settings</li>
                <li>• Line numbers are shown on the left for reference</li>
                <li>• Empty lines can also have decorations applied</li>
                <li>• Highlighted line indicates current selection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
