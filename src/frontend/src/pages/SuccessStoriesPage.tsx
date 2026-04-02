import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const stories = [
  {
    emoji: "👩",
    en_name: "Savita Devi",
    hi_name: "सविता देवी",
    village: "Rampur, Uttar Pradesh",
    en_achievement: "Started a tailoring business, now earning ₹12,000/month",
    hi_achievement: "सिलाई व्यवसाय शुरू किया, अब ₹12,000/माह कमा रही हैं",
    en_quote:
      "Anshika Udhyog gave me the skills and the loan I needed to stand on my own feet.",
    hi_quote: "अंशिका उद्योग ने मुझे अपने पैरों पर खड़े होने के लिए जरूरी कौशल और ऋण दिया।",
  },
  {
    emoji: "👩‍🍳",
    en_name: "Meera Kumari",
    hi_name: "मीरा कुमारी",
    village: "Varanasi, Uttar Pradesh",
    en_achievement: "Runs a successful pickle and papad home business",
    hi_achievement: "सफल अचार और पापड़ का घरेलू व्यवसाय चलाती हैं",
    en_quote:
      "The food processing training changed my life. I now supply to 3 local shops.",
    hi_quote:
      "खाद्य प्रसंस्करण प्रशिक्षण ने मेरा जीवन बदल दिया। अब मैं 3 स्थानीय दुकानों को आपूर्ति करती हूँ।",
  },
  {
    emoji: "👩‍💻",
    en_name: "Priya Singh",
    hi_name: "प्रिया सिंह",
    village: "Lucknow, Uttar Pradesh",
    en_achievement: "Now works as data entry operator at district office",
    hi_achievement: "अब जिला कार्यालय में डेटा एंट्री ऑपरेटर के रूप में काम करती हैं",
    en_quote:
      "The computer training I received here opened doors I never thought possible for me.",
    hi_quote:
      "यहाँ मिले कंप्यूटर प्रशिक्षण ने मेरे लिए ऐसे दरवाजे खोले जो मैंने कभी सोचे नहीं थे।",
  },
  {
    emoji: "👩‍🎨",
    en_name: "Sunita Yadav",
    hi_name: "सुनीता यादव",
    village: "Allahabad, Uttar Pradesh",
    en_achievement:
      "Sells handmade crafts on e-commerce platforms, monthly sales ₹8,000+",
    hi_achievement:
      "ई-कॉमर्स प्लेटफॉर्म पर हस्तनिर्मित शिल्प बेचती हैं, मासिक बिक्री ₹8,000+",
    en_quote:
      "My handicrafts now reach customers across India. I am proud and independent.",
    hi_quote: "मेरे हस्तशिल्प अब पूरे भारत में ग्राहकों तक पहुँचते हैं।",
  },
];

export function SuccessStoriesPage() {
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
        <div className="text-4xl pulse-icon mb-2">✨</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "सफलता की कहानियाँ" : "Success Stories"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi
            ? "हमारे सदस्यों की प्रेरणादायक यात्रा"
            : "Inspiring journeys of our members"}
        </p>
      </div>

      <div className="space-y-4">
        {stories.map((s, i) => (
          <Card
            key={s.en_name}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                  style={{ background: "#FFF8E1" }}
                >
                  {s.emoji}
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {hi ? s.hi_name : s.en_name}
                  </p>
                  <p className="text-xs text-gray-400">{s.village}</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-amber-700 mb-2">
                🏅 {hi ? s.hi_achievement : s.en_achievement}
              </p>
              <blockquote
                className="text-xs text-gray-600 italic border-l-4 pl-3"
                style={{ borderColor: "#FFC107" }}
              >
                "{hi ? s.hi_quote : s.en_quote}"
              </blockquote>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
