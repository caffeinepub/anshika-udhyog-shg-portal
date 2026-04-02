import { useApp } from "../context/AppContext";

export function MarketingPage() {
  const { state, setCurrentPage } = useApp();
  const content =
    state.pageContents.find((pc) => pc.page === "marketing")?.content || "";

  const offers = [
    {
      icon: "💰",
      title: "Easy Loan Schemes",
      desc: "0% interest loan for first-time SHG members up to ₹50,000",
    },
    {
      icon: "👩‍🏫",
      title: "Free Training Programs",
      desc: "Professional skill development courses - Silai, Food Processing, Beauty & more",
    },
    {
      icon: "🏆",
      title: "Reward Programs",
      desc: "Lucky draws, best performer awards & cash prizes for active groups",
    },
    {
      icon: "🤝",
      title: "Network Support",
      desc: "Connect with 500+ SHG groups across India",
    },
    {
      icon: "🛒",
      title: "Market Access",
      desc: "Sell your products through our platform - reach customers PAN India",
    },
    {
      icon: "📱",
      title: "Digital Tools",
      desc: "Free digital portal access for loan tracking, training & rewards",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div
        className="py-10 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl mb-3">📢</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Marketing & Special Offers
        </h1>
        <p className="text-gray-800 text-sm max-w-xl mx-auto">
          अंशिका उद्योग की विशेष योजनाएं और ऑफर। हमारे साथ जुड़ें और लाभ उठाएं।
        </p>
      </div>

      {/* Custom Content */}
      {content && (
        <div className="mx-auto max-w-2xl px-4 py-6">
          <div className="bg-white rounded-xl p-4 shadow text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {content}
          </div>
        </div>
      )}

      {/* Offers Grid */}
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
          🌟 Our Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {offers.map((offer) => (
            <div
              key={offer.title}
              className="bg-white rounded-xl p-4 shadow hover:shadow-md transition-shadow border-l-4 border-amber-400"
            >
              <div className="text-2xl mb-2">{offer.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {offer.title}
              </h3>
              <p className="text-xs text-gray-600">{offer.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 py-8 text-center bg-gray-900">
        <h2 className="text-white text-lg font-bold mb-2">
          अभी जुड़ें - Join Now!
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Register your SHG today and start availing all benefits
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            type="button"
            onClick={() => setCurrentPage("signup")}
            className="px-6 py-2 rounded-lg font-semibold text-gray-900 text-sm transition-opacity hover:opacity-90"
            style={{ background: "#FFC107" }}
            data-ocid="marketing.primary_button"
          >
            ➕ Register SHG
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage("contact")}
            className="px-6 py-2 rounded-lg font-semibold text-white text-sm border border-amber-400 hover:bg-amber-400 hover:text-gray-900 transition-colors"
            data-ocid="marketing.secondary_button"
          >
            📞 Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
