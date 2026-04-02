import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const winners = [
  {
    emoji: "🥇",
    en_name: "Asha Mahila SHG",
    hi_name: "आशा महिला SHG",
    village: "Rampur, UP",
    en_award: "Best Performer – March 2026",
    hi_award: "सर्वश्रेष्ठ प्रदर्शन – मार्च 2026",
    prize: "₹5,000",
  },
  {
    emoji: "🥈",
    en_name: "Shakti Women Group",
    hi_name: "शक्ति महिला समूह",
    village: "Lucknow, UP",
    en_award: "Lucky Draw Winner – Feb 2026",
    hi_award: "लकी ड्रा विजेता – फरवरी 2026",
    prize: "₹3,000",
  },
  {
    emoji: "🥉",
    en_name: "Nari Shakti SHG",
    hi_name: "नारी शक्ति SHG",
    village: "Varanasi, UP",
    en_award: "Top Savings Group – Jan 2026",
    hi_award: "शीर्ष बचत समूह – जनवरी 2026",
    prize: "₹2,000",
  },
];

export function RewardsPublicPage() {
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
        <div className="text-4xl pulse-icon mb-2">🏆</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "पुरस्कार और विजेता" : "Rewards & Winners"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi
            ? "हमारे उत्कृष्ट सदस्यों को सम्मान"
            : "Celebrating our outstanding members"}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {winners.map((w, i) => (
          <Card
            key={w.en_name}
            className="shadow-card border-0 animate-fade-in-up"
            style={{
              animationDelay: `${i * 0.1}s`,
              borderLeft: "4px solid #FFC107",
            }}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className="text-4xl pulse-icon shrink-0">{w.emoji}</div>
              <div>
                <p className="font-bold text-gray-900">
                  {hi ? w.hi_name : w.en_name}
                </p>
                <p className="text-xs text-gray-500">{w.village}</p>
                <p className="text-sm text-amber-700 font-semibold mt-0.5">
                  {hi ? w.hi_award : w.en_award}
                </p>
                <p className="text-green-600 font-bold text-sm">{w.prize}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card border-0" style={{ background: "#FFF8E1" }}>
        <CardContent className="p-4 text-center">
          <div className="text-3xl pulse-icon mb-2">🎲</div>
          <p className="font-bold text-gray-900 text-sm">
            {hi ? "मासिक लकी ड्रा" : "Monthly Lucky Draw"}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {hi
              ? "हर माह के अंत में सभी अनुमोदित SHG सदस्यों के बीच लकी ड्रा होता है।"
              : "Lucky draw held every month-end among all approved SHG members. Stay active to participate!"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
