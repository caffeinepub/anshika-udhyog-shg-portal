import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const docs = [
  {
    emoji: "📄",
    en: "Membership Registration Form",
    hi: "सदस्यता पंजीकरण फॉर्म",
    size: "PDF • 120 KB",
  },
  {
    emoji: "📋",
    en: "KYC Document Form",
    hi: "KYC दस्तावेज़ फॉर्म",
    size: "PDF • 85 KB",
  },
  {
    emoji: "📊",
    en: "Annual Report 2025",
    hi: "वार्षिक रिपोर्ट 2025",
    size: "PDF • 2.4 MB",
  },
  {
    emoji: "📜",
    en: "SHG Guidelines & Rules",
    hi: "SHG दिशानिर्देश और नियम",
    size: "PDF • 340 KB",
  },
  {
    emoji: "💰",
    en: "Loan Application Form",
    hi: "ऋण आवेदन फॉर्म",
    size: "PDF • 95 KB",
  },
  {
    emoji: "🎓",
    en: "Training Enrollment Form",
    hi: "प्रशिक्षण नामांकन फॉर्म",
    size: "PDF • 78 KB",
  },
];

export function DocumentsPage() {
  const { language } = useApp();
  const hi = language === "hi";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">📁</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "दस्तावेज़ और डाउनलोड" : "Documents & Downloads"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "महत्वपूर्ण फॉर्म और रिपोर्ट" : "Important forms and reports"}
        </p>
      </div>

      <div className="space-y-3">
        {docs.map((doc, i) => (
          <Card
            key={doc.en}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-3xl shrink-0">{doc.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm">
                  {hi ? doc.hi : doc.en}
                </p>
                <p className="text-xs text-gray-400">{doc.size}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 text-xs border-amber-400 text-amber-700 hover:bg-amber-50"
                data-ocid={`documents.download_button.${i + 1}`}
              >
                ⬇️ {hi ? "डाउनलोड" : "Download"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-4">
        {hi
          ? "📌 सभी दस्तावेज़ एडमिन द्वारा अपलोड किए जाते हैं"
          : "📌 All documents are uploaded and managed by Admin"}
      </p>
    </div>
  );
}
