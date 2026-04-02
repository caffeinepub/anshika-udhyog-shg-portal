import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const team = [
  {
    emoji: "👩",
    en_name: "Smt. Anshika Devi",
    hi_name: "श्रीमती अंशिका देवी",
    en_role: "Founder & President",
    hi_role: "संस्थापक और अध्यक्ष",
    en_bio:
      "Visionary leader with 15+ years of experience in women empowerment and SHG movement.",
    hi_bio: "15+ वर्षों के अनुभव के साथ महिला सशक्तिकरण और SHG आंदोलन की प्रेरणा।",
  },
  {
    emoji: "👩‍💼",
    en_name: "Smt. Rekha Sharma",
    hi_name: "श्रीमती रेखा शर्मा",
    en_role: "Secretary",
    hi_role: "सचिव",
    en_bio:
      "Manages operations and coordination across all branches, ensuring smooth workflow.",
    hi_bio: "सभी शाखाओं में संचालन और समन्वय का प्रबंधन करती हैं।",
  },
  {
    emoji: "👨‍💼",
    en_name: "Shri Ramesh Kumar",
    hi_name: "श्री रमेश कुमार",
    en_role: "Treasurer",
    hi_role: "कोषाध्यक्ष",
    en_bio:
      "Financial expert overseeing funds, loans, and financial planning for SHG welfare.",
    hi_bio: "SHG कल्याण के लिए निधि, ऋण और वित्तीय योजना की देखरेख करते हैं।",
  },
  {
    emoji: "👩‍🏫",
    en_name: "Smt. Sunita Patel",
    hi_name: "श्रीमती सुनीता पटेल",
    en_role: "Training Head",
    hi_role: "प्रशिक्षण प्रमुख",
    en_bio:
      "Leads skill development programs, training over 500 women annually in vocational skills.",
    hi_bio: "प्रतिवर्ष 500 से अधिक महिलाओं को व्यावसायिक कौशल में प्रशिक्षित करती हैं।",
  },
];

export function OurTeamPage() {
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
        <div className="text-4xl pulse-icon mb-2">👥</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "हमारी टीम" : "Our Team"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "समर्पित लोग जो बदलाव लाते हैं" : "Dedicated people driving change"}
        </p>
      </div>

      <div className="space-y-4">
        {team.map((member, i) => (
          <Card
            key={member.en_name}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <CardContent className="p-4 flex gap-4">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center text-3xl shrink-0"
                style={{ background: "#FFF8E1" }}
              >
                {member.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {hi ? member.hi_name : member.en_name}
                  </h3>
                  <Badge
                    className="text-xs shrink-0"
                    style={{ background: "#FFC107", color: "#1a1a2e" }}
                  >
                    {hi ? member.hi_role : member.en_role}
                  </Badge>
                </div>
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                  {hi ? member.hi_bio : member.en_bio}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
