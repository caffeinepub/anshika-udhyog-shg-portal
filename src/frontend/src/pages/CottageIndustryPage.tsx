import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const industries = [
  {
    emoji: "🪡",
    en: "Stitching & Tailoring",
    hi: "सिलाई और दर्जी काम",
    income: "₹5,000–₹15,000/month",
  },
  {
    emoji: "🍱",
    en: "Food Processing",
    hi: "खाद्य प्रसंस्करण",
    income: "₹4,000–₹12,000/month",
  },
  {
    emoji: "🧶",
    en: "Handicrafts",
    hi: "हस्तशिल्प",
    income: "₹3,000–₹10,000/month",
  },
  {
    emoji: "🕯️",
    en: "Candle & Agarbatti Making",
    hi: "मोमबत्ती और अगरबत्ती",
    income: "₹3,500–₹9,000/month",
  },
  {
    emoji: "🛍️",
    en: "Bag & Packaging",
    hi: "बैग और पैकेजिंग",
    income: "₹4,000–₹11,000/month",
  },
  {
    emoji: "🧴",
    en: "Beauty Products",
    hi: "सौंदर्य उत्पाद",
    income: "₹5,000–₹18,000/month",
  },
];

export function CottageIndustryPage() {
  const { language, setCurrentPage } = useApp();
  const hi = language === "hi";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">🏭</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "कुटीर उद्योग" : "Cottage Industry"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "घर से आय के अवसर" : "Income opportunities from home"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {industries.map((ind, i) => (
          <Card
            key={ind.en}
            className="shadow-card border-0 animate-fade-in-up service-card"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-3xl pulse-icon mb-2">{ind.emoji}</div>
              <p className="font-semibold text-gray-900 text-sm">
                {hi ? ind.hi : ind.en}
              </p>
              <p className="text-xs text-green-600 font-bold mt-1">
                {ind.income}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card
        className="shadow-card border-0 mb-4"
        style={{ background: "#FFF8E1" }}
      >
        <CardContent className="p-4">
          <h3 className="font-bold text-gray-900 mb-2">
            {hi ? "आवेदन कैसे करें?" : "How to Apply?"}
          </h3>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>{hi ? "SHG के रूप में पंजीकरण करें" : "Register as an SHG"}</li>
            <li>{hi ? "KYC सत्यापन पूरा करें" : "Complete KYC verification"}</li>
            <li>
              {hi ? "अपना पसंदीदा उद्योग चुनें" : "Choose your preferred industry"}
            </li>
            <li>{hi ? "प्रशिक्षण में भाग लें" : "Attend training program"}</li>
            <li>{hi ? "कार्य असाइनमेंट प्राप्त करें" : "Receive work assignment"}</li>
          </ol>
        </CardContent>
      </Card>

      <Button
        className="w-full font-bold"
        style={{ background: "#FFC107", color: "#1a1a2e" }}
        onClick={() => setCurrentPage("signup")}
        data-ocid="cottage.primary_button"
      >
        {hi ? "✍️ अभी पंजीकरण करें" : "✍️ Register Now"}
      </Button>
    </div>
  );
}
