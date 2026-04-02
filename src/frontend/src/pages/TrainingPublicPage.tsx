import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const programs = [
  {
    emoji: "🪡",
    en: "Tailoring & Stitching",
    hi: "सिलाई",
    duration_en: "3 months",
    duration_hi: "3 माह",
    seats: 20,
  },
  {
    emoji: "💻",
    en: "Basic Computer Skills",
    hi: "कंप्यूटर प्रशिक्षण",
    duration_en: "2 months",
    duration_hi: "2 माह",
    seats: 15,
  },
  {
    emoji: "💄",
    en: "Beauty Parlor & Skincare",
    hi: "ब्यूटी पार्लर",
    duration_en: "2 months",
    duration_hi: "2 माह",
    seats: 12,
  },
  {
    emoji: "🍳",
    en: "Cooking & Food Processing",
    hi: "खाना पकाना",
    duration_en: "1 month",
    duration_hi: "1 माह",
    seats: 25,
  },
  {
    emoji: "🧶",
    en: "Handicrafts & Embroidery",
    hi: "हस्तशिल्प",
    duration_en: "2 months",
    duration_hi: "2 माह",
    seats: 18,
  },
  {
    emoji: "📱",
    en: "Digital Literacy",
    hi: "डिजिटल साक्षरता",
    duration_en: "1 month",
    duration_hi: "1 माह",
    seats: 30,
  },
];

export function TrainingPublicPage() {
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
        <div className="text-4xl pulse-icon mb-2">📚</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "प्रशिक्षण कार्यक्रम" : "Training Programs"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "निःशुल्क कौशल विकास" : "Free skill development for SHG members"}
        </p>
      </div>

      <div className="space-y-3">
        {programs.map((p, i) => (
          <Card
            key={p.en}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <span className="text-3xl pulse-icon shrink-0">{p.emoji}</span>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm">
                  {hi ? p.hi : p.en}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    ⏱️ {hi ? p.duration_hi : p.duration_en}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    👩 {p.seats} {hi ? "सीटें" : "seats"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
