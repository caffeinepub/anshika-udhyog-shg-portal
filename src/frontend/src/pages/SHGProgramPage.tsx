import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const steps = [
  {
    emoji: "📝",
    en: "Register your group online or at any branch",
    hi: "ऑनलाइन या किसी भी शाखा में अपना समूह पंजीकृत करें",
  },
  {
    emoji: "✅",
    en: "Admin verification and approval within 48 hours",
    hi: "48 घंटों के भीतर सत्यापन और अनुमोदन",
  },
  {
    emoji: "🎓",
    en: "Attend orientation training session",
    hi: "ओरिएंटेशन प्रशिक्षण सत्र में भाग लें",
  },
  {
    emoji: "💰",
    en: "Start savings and access microfinance benefits",
    hi: "बचत शुरू करें और माइक्रोफाइनेंस लाभ प्राप्त करें",
  },
];

const benefits = [
  { emoji: "💳", en: "Digital Wallet", hi: "डिजिटल वॉलेट" },
  { emoji: "🏦", en: "Micro Loans", hi: "माइक्रो ऋण" },
  { emoji: "📚", en: "Free Training", hi: "निःशुल्क प्रशिक्षण" },
  { emoji: "🏆", en: "Monthly Rewards", hi: "मासिक पुरस्कार" },
  { emoji: "🆔", en: "ID Card", hi: "पहचान पत्र" },
  { emoji: "📜", en: "Certificate", hi: "प्रमाण पत्र" },
];

export function SHGProgramPage() {
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
        <div className="text-4xl pulse-icon mb-2">🌟</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "SHG कार्यक्रम" : "SHG Program Details"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "स्वयं सहायता समूह के बारे में जानें" : "Learn about Self Help Groups"}
        </p>
      </div>

      <Card className="shadow-card border-0 mb-4">
        <CardContent className="p-5">
          <h2 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
            <span className="text-xl">🤔</span>
            {hi ? "SHG क्या है?" : "What is an SHG?"}
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            {hi
              ? "स्वयं सहायता समूह (SHG) 10-20 महिलाओं का एक छोटा समूह है जो नियमित बचत करता है, एक-दूसरे को ऋण देता है और साथ मिलकर आर्थिक गतिविधियाँ चलाता है।"
              : "A Self Help Group (SHG) is a small group of 10-20 women who regularly save together, lend to each other, and collectively engage in income-generating activities for mutual benefit."}
          </p>
        </CardContent>
      </Card>

      <div className="mb-4">
        <h3 className="font-bold text-gray-900 mb-3">
          {hi ? "कैसे जुड़ें — 4 आसान चरण" : "How to Join — 4 Easy Steps"}
        </h3>
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div
              key={step.en}
              className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-card"
            >
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                style={{ background: "#FFC107", color: "#1a1a2e" }}
              >
                {i + 1}
              </div>
              <span className="text-xl">{step.emoji}</span>
              <p className="text-sm text-gray-700">{hi ? step.hi : step.en}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3">
          {hi ? "सदस्यता के लाभ" : "Membership Benefits"}
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {benefits.map((b) => (
            <Card key={b.en} className="shadow-card border-0 text-center">
              <CardContent className="p-3">
                <div className="text-2xl pulse-icon mb-1">{b.emoji}</div>
                <p className="text-xs font-semibold text-gray-800">
                  {hi ? b.hi : b.en}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
