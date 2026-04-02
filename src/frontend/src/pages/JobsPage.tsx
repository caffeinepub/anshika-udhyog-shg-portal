import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const jobs = [
  {
    emoji: "🪡",
    en_title: "Tailoring Work (Home-Based)",
    hi_title: "सिलाई कार्य (घर से)",
    en_desc:
      "Stitch garments provided by the organization. Earn per piece at your convenience.",
    hi_desc: "संस्था द्वारा प्रदत्त कपड़े सिलें। अपनी सुविधानुसार प्रति टुकड़ा कमाई करें।",
    pay: "₹200–₹500/day",
  },
  {
    emoji: "📦",
    en_title: "Packaging & Labeling",
    hi_title: "पैकेजिंग और लेबलिंग",
    en_desc:
      "Pack products in the branch center. Fixed hours, steady daily income.",
    hi_desc: "शाखा केंद्र में उत्पाद पैक करें। निश्चित घंटे, नियमित दैनिक आय।",
    pay: "₹300/day",
  },
  {
    emoji: "📢",
    en_title: "Community Mobilizer",
    hi_title: "सामुदायिक संगठक",
    en_desc:
      "Help recruit new SHG members in your village. Commission-based income.",
    hi_desc: "अपने गाँव में नए SHG सदस्यों की भर्ती में मदद करें। कमीशन आधारित आय।",
    pay: "₹500/referral",
  },
  {
    emoji: "📚",
    en_title: "Training Assistant",
    hi_title: "प्रशिक्षण सहायक",
    en_desc:
      "Assist trainers in skill development sessions. Requires prior training completion.",
    hi_desc: "कौशल विकास सत्रों में प्रशिक्षकों की सहायता करें।",
    pay: "₹8,000/month",
  },
];

export function JobsPage() {
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
        <div className="text-4xl pulse-icon mb-2">💼</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "नौकरी / कार्य अवसर" : "Jobs / Work Opportunities"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "महिलाओं के लिए रोजगार" : "Employment opportunities for women"}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {jobs.map((j, i) => (
          <Card
            key={j.en_title}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <span className="text-3xl pulse-icon shrink-0">{j.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-sm">
                    {hi ? j.hi_title : j.en_title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {hi ? j.hi_desc : j.en_desc}
                  </p>
                  <p className="text-green-600 font-bold text-sm mt-1">
                    {j.pay}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        className="w-full font-bold"
        style={{ background: "#FFC107", color: "#1a1a2e" }}
        onClick={() => setCurrentPage("signup")}
        data-ocid="jobs.primary_button"
      >
        {hi ? "✍️ आवेदन करें" : "✍️ Apply Now — Register as SHG"}
      </Button>
    </div>
  );
}
