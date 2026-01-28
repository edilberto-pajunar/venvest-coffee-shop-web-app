  "use client"

  import { useEffect, useState } from "react";
  import { useRouter } from "next/navigation";
  import { useTemplateStore } from "./store/useTemplateStore";
  import { COFFEE_PALETTE } from "../constants/theme";
  import { Plus, Trash2, FileText, AlertCircle, Activity } from "lucide-react";
  import { TemplateService } from "./service/template_service";
  import { TextStyle } from "./interface/Template";

  type ReceiptSection = 'header' | 'metadata' | 'itemRow' | 'totals' | 'footer';

  interface ReceiptLine {
    text: string;
    section: ReceiptSection;
  }

  const SAMPLE_RECEIPT: ReceiptLine[] = [
    { text: "COFFEE SHOP", section: 'header' },
    { text: "123 Main Street, Auckland", section: 'header' },
    { text: "", section: 'header' },
    { text: "Order #12345", section: 'metadata' },
    { text: "Date: 28/01/2026 2:45 PM", section: 'metadata' },
    { text: "Cashier: Emma", section: 'metadata' },
    { text: "------------------------", section: 'metadata' },
    { text: "2x Flat White         $9.00", section: 'itemRow' },
    { text: "1x Long Black         $4.50", section: 'itemRow' },
    { text: "1x Cappuccino         $5.00", section: 'itemRow' },
    { text: "------------------------", section: 'totals' },
    { text: "Subtotal:           $18.50", section: 'totals' },
    { text: "Tax (GST 15%):       $2.78", section: 'totals' },
    { text: "Total:              $21.28", section: 'totals' },
    { text: "", section: 'footer' },
    { text: "Thank you for your visit!", section: 'footer' },
    { text: "Visit us again soon", section: 'footer' },
    { text: "www.coffeeshop.com", section: 'footer' }
  ];

  export default function TemplatesPage() {
    const router = useRouter();
    const { templates, setTemplates, loading, error, deleteTemplate } = useTemplateStore();
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [creatingTemplate, setCreatingTemplate] = useState(false);

    useEffect(() => {
      setTemplates();
    }, [setTemplates]);

    const handleCreateTemplate = async () => {
      const templateName = prompt("Enter template name:");
      if (!templateName) return;

      setCreatingTemplate(true);
      try {
        const newTemplateId = await TemplateService.createTemplate(templateName.trim());
        router.push(`/templates/${newTemplateId}`);
      } catch (error) {
        console.error("Failed to create template:", error);
        alert("Failed to create template");
      } finally {
        setCreatingTemplate(false);
      }
    };

    const handleDeleteTemplate = async (id: string, name: string) => {
      if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

      setDeletingId(id);
      try {
        await deleteTemplate(id);
      } catch (error) {
        console.error("Failed to delete template:", error);
        alert("Failed to delete template");
      } finally {
        setDeletingId(null);
      }
    };

    const getSectionStyle = (section: ReceiptSection, templateId: string) => {
      const template = templates.find(t => t.id === templateId);
      const textStyle: TextStyle = template?.sections[section] || {
        fontSize: 12,
        alignment: 'left',
        isBold: false
      };

      return {
        fontSize: `${textStyle.fontSize * 0.05 + 0.4}rem`,
        textAlign: textStyle.alignment as "left" | "center" | "right",
        fontWeight: textStyle.isBold ? 'bold' as const : 'normal' as const
      };
    };

    return (
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="mb-6 md:mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-1" style={{ color: COFFEE_PALETTE.textPrimary }}>
              Receipt Templates
            </h2>
            <p className="text-sm" style={{ color: COFFEE_PALETTE.textSecondary }}>
              Manage and configure receipt printing templates • {templates.length} template{templates.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleCreateTemplate}
            disabled={creatingTemplate}
            className="px-4 py-2 rounded-md font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
            style={{ backgroundColor: COFFEE_PALETTE.primary }}
          >
            {creatingTemplate ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="hidden sm:inline">Creating...</span>
              </>
            ) : (
              <>
                <Plus size={18} />
                <span className="hidden sm:inline">New Template</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-lg border flex items-start gap-3"
            style={{ backgroundColor: COFFEE_PALETTE.warningBg, borderColor: COFFEE_PALETTE.error }}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: COFFEE_PALETTE.error }} />
            <div>
              <h4 className="font-semibold text-sm mb-1" style={{ color: COFFEE_PALETTE.textPrimary }}>
                Firebase Connection Error
              </h4>
              <p className="text-sm" style={{ color: COFFEE_PALETTE.textSecondary }}>{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 animate-spin" style={{ color: COFFEE_PALETTE.primary }} />
              <p className="text-sm" style={{ color: COFFEE_PALETTE.textSecondary }}>Loading templates...</p>
            </div>
          </div>
        )}

        {!loading && !error && templates.length === 0 && (
          <div className="p-12 rounded-lg border-2 border-dashed text-center"
            style={{ borderColor: COFFEE_PALETTE.border }}>
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: COFFEE_PALETTE.textSecondary }} />
            <h3 className="text-lg font-semibold mb-1" style={{ color: COFFEE_PALETTE.textPrimary }}>
              No Templates Found
            </h3>
            <p className="text-sm mb-4" style={{ color: COFFEE_PALETTE.textSecondary }}>
              Create your first receipt template to get started
            </p>
            <button
              onClick={handleCreateTemplate}
              className="px-6 py-2 rounded-md font-medium text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: COFFEE_PALETTE.primary }}
            >
              Create Template
            </button>
          </div>
        )}

        {!loading && !error && templates.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="rounded-lg shadow-sm border overflow-hidden transition-all hover:shadow-md"
                style={{ backgroundColor: COFFEE_PALETTE.cardBg, borderColor: COFFEE_PALETTE.border }}
              >
                <div
                  onClick={() => router.push(`/templates/${template.id}`)}
                  className="cursor-pointer"
                >
                  <div className="p-4 border-b" style={{ borderColor: COFFEE_PALETTE.border }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg" style={{ color: COFFEE_PALETTE.textPrimary }}>
                          {template.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 bg-white font-mono overflow-hidden"
                    style={{ height: '360px' }}
                  >
                    <div className="leading-tight">
                      {SAMPLE_RECEIPT.map((line, index) => {
                        const style = getSectionStyle(line.section, template.id);

                        return (
                          <div
                            key={index}
                            style={{
                              ...style,
                              color: COFFEE_PALETTE.textPrimary,
                              marginBottom: '0.15rem',
                              minHeight: '0.9rem',
                              whiteSpace: 'pre-wrap'
                            }}
                          >
                            {line.text || <span style={{ opacity: 0.2 }}>-</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="p-3 border-t flex items-center justify-between"
                  style={{ borderColor: COFFEE_PALETTE.border }}>
                  <button
                    onClick={() => router.push(`/templates/${template.id}`)}
                    className="text-sm font-medium transition-opacity hover:opacity-80"
                    style={{ color: COFFEE_PALETTE.primary }}
                  >
                    Edit Template
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTemplate(template.id, template.name);
                    }}
                    disabled={deletingId === template.id}
                    className="p-2 rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    {deletingId === template.id ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                        style={{ borderColor: COFFEE_PALETTE.error }} />
                    ) : (
                      <Trash2 className="w-4 h-4" style={{ color: COFFEE_PALETTE.error }} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  }