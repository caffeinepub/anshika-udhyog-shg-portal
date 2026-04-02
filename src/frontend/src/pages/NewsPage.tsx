import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const news = [
  {
    date: "01 Apr 2026",
    emoji: "🎉",
    en_title: "Anshika Udhyog Reaches 500 SHG Members Milestone",
    hi_title: "अंशिका उद्योग ने 500 SHG सदस्यों का मील का पत्थर हासिल किया",
    en_desc:
      "We are proud to announce that our portal has successfully onboarded 500+ active SHG members across 5 states.",
    hi_desc:
      "हमें गर्व है कि हमारे पोर्टल ने 5 राज्यों में 500+ सक्रिय SHG सदस्यों को शामिल किया है।",
  },
  {
    date: "15 Mar 2026",
    emoji: "🏆",
    en_title: "March Monthly Rewards Announced",
    hi_title: "मार्च मासिक पुरस्कार घोषित",
    en_desc:
      "Asha Mahila SHG from Rampur wins the best performer award for March 2026 with consistent savings growth.",
    hi_desc: "रामपुर की आशा महिला SHG ने मार्च 2026 के सर्वश्रेष्ठ प्रदर्शन पुरस्कार जीता।",
  },
  {
    date: "01 Mar 2026",
    emoji: "📚",
    en_title: "New Batch of Digital Literacy Training Launched",
    hi_title: "डिजिटल साक्षरता प्रशिक्षण का नया बैच शुरू",
    en_desc:
      "30 seats available for the next digital literacy training batch starting April 15. Register via your SHG dashboard.",
    hi_desc:
      "15 अप्रैल से शुरू होने वाले डिजिटल साक्षरता प्रशिक्षण बैच के लिए 30 सीटें उपलब्ध हैं।",
  },
  {
    date: "14 Feb 2026",
    emoji: "🏢",
    en_title: "New Branch Opening in Bhopal, Madhya Pradesh",
    hi_title: "भोपाल, मध्य प्रदेश में नई शाखा खुली",
    en_desc:
      "Anshika Udhyog expands to Madhya Pradesh with a new branch in Bhopal, welcoming women from MP to join our movement.",
    hi_desc: "अंशिका उद्योग भोपाल में नई शाखा के साथ मध्य प्रदेश में विस्तार कर रहा है।",
  },
  {
    date: "01 Jan 2026",
    emoji: "🎊",
    en_title: "Portal Launched Successfully — Happy New Year!",
    hi_title: "पोर्टल सफलतापूर्वक लॉन्च — नया साल मुबारक!",
    en_desc:
      "Anshika Udhyog SHG Portal officially launched on January 1, 2026, to digitize and empower SHG operations.",
    hi_desc:
      "अंशिका उद्योग SHG पोर्टल 1 जनवरी 2026 को आधिकारिक रूप से लॉन्च किया गया।",
  },
];

export function NewsPage() {
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
        <div className="text-4xl pulse-icon mb-2">📰</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "समाचार और अपडेट" : "News & Updates"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "नवीनतम जानकारी" : "Latest information from Anshika Udhyog"}
        </p>
      </div>

      <div className="space-y-3">
        {news.map((n, i) => (
          <Card
            key={n.en_title}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl pulse-icon shrink-0">{n.emoji}</span>
                <div>
                  <p className="text-xs text-gray-400 mb-1">{n.date}</p>
                  <p className="font-bold text-gray-900 text-sm">
                    {hi ? n.hi_title : n.en_title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {hi ? n.hi_desc : n.en_desc}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
