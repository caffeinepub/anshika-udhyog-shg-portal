import { useApp } from "../context/AppContext";

const POLICY_SECTIONS = [
  {
    title: "🔒 Privacy Policy",
    content: [
      "आपकी सभी जानकारी पूरी तरह सुरक्षित है। हम SSL encryption उपयोग करते हैं।",
      "हम किसी भी तीसरे पक्ष के साथ आपकी जानकारी share नहीं करते।",
      "आपके मोबाइल नंबर का उपयोग केवल हमारी सेवाओं के लिए होता है।",
      "We collect only necessary information to provide our services.",
    ],
  },
  {
    title: "📋 Terms of Service",
    content: [
      "Portal का उपयोग केवल registered सदस्य ही कर सकते हैं।",
      "गलत जानकारी देने पर account बंद हो सकता है।",
      "सभी financial transactions admin approval के बाद होती हैं।",
      "By using this portal you agree to our terms and conditions.",
    ],
  },
  {
    title: "🔄 Return Policy",
    content: [
      "Products खरीदने के 7 दिन के अंदर return कर सकते हैं।",
      "खराब products के लिए full refund मिलेगा।",
      "Return shipping cost customer द्वारा दिया जाएगा।",
      "Refund 7-10 business days में process होता है।",
    ],
  },
];

export function PolicyPage() {
  const { state } = useApp();
  const content =
    state.pageContents.find((pc) => pc.page === "policy")?.content || "";

  return (
    <div className="min-h-screen">
      <div
        className="py-10 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl mb-3">📜</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Policies & Terms
        </h1>
        <p className="text-gray-800 text-sm">
          हमारी नीतियां और शर्तें - Our Policies & Terms
        </p>
      </div>

      {content && (
        <div className="mx-auto max-w-2xl px-4 pt-6">
          <div className="bg-white rounded-xl p-4 shadow text-sm text-gray-700 whitespace-pre-line">
            {content}
          </div>
        </div>
      )}

      <div className="px-4 py-6 max-w-3xl mx-auto space-y-4">
        {POLICY_SECTIONS.map((section) => (
          <div key={section.title} className="bg-white rounded-xl shadow p-5">
            <h2 className="font-bold text-gray-900 text-base mb-3">
              {section.title}
            </h2>
            <ul className="space-y-2">
              {section.content.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="text-amber-500 shrink-0 mt-0.5">✔</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-700">
            किसी भी प्रश्न के लिए: <strong>info@anshikaudhyog.org</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Last Updated: January 2026
          </p>
        </div>
      </div>
    </div>
  );
}
