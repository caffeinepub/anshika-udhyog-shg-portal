import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const values = [
  { emoji: "🤝", en: "Solidarity", hi: "एकजुटता" },
  { emoji: "💪", en: "Empowerment", hi: "सशक्तिकरण" },
  { emoji: "📖", en: "Education", hi: "शिक्षा" },
  { emoji: "🌱", en: "Sustainability", hi: "स्थिरता" },
  { emoji: "🏅", en: "Excellence", hi: "उत्कृष्टता" },
  { emoji: "❤️", en: "Compassion", hi: "करुणा" },
];

export function MissionVisionPage() {
  const { language } = useApp();
  const hi = language === "hi";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      {/* Banner */}
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">🎯</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "लक्ष्य और दृष्टि" : "Mission & Vision"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi
            ? "हमारा उद्देश्य और भविष्य की कल्पना"
            : "Our purpose and future aspirations"}
        </p>
      </div>

      <div className="space-y-4">
        <Card className="shadow-card border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl pulse-icon">🚀</span>
              <h2 className="text-lg font-bold text-gray-900">
                {hi ? "हमारा मिशन" : "Our Mission"}
              </h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {hi
                ? "ग्रामीण और शहरी महिलाओं को आत्मनिर्भर बनाना, स्वयं सहायता समूहों के माध्यम से उनकी आर्थिक और सामाजिक स्थिति को ऊँचा उठाना।"
                : "To empower rural and urban women by building strong Self Help Groups that foster economic independence, social dignity, and sustainable livelihoods through skill development and microfinance."}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl pulse-icon">🔭</span>
              <h2 className="text-lg font-bold text-gray-900">
                {hi ? "हमारी दृष्टि" : "Our Vision"}
              </h2>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {hi
                ? "एक ऐसा भारत जहाँ हर महिला आर्थिक रूप से स्वतंत्र हो, जहाँ स्वयं सहायता समूह राष्ट्रीय विकास की रीढ़ हों।"
                : "A self-reliant India where every woman is economically empowered, where Self Help Groups are the backbone of national development and women lead change at every level of society."}
            </p>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-base font-bold text-gray-900 mb-3 px-1">
            {hi ? "हमारे मूल मूल्य" : "Our Core Values"}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {values.map((v) => (
              <Card key={v.en} className="shadow-card border-0 text-center">
                <CardContent className="p-3">
                  <div className="text-2xl pulse-icon mb-1">{v.emoji}</div>
                  <p className="text-xs font-semibold text-gray-800">
                    {hi ? v.hi : v.en}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
