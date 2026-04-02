import { useApp } from "../context/AppContext";

export function ShippingPage() {
  const { state } = useApp();
  const content =
    state.pageContents.find((pc) => pc.page === "shipping")?.content || "";

  const shippingInfo = [
    {
      icon: "🚚",
      title: "Free Shipping",
      desc: "₹500 से उपर के orders पर free shipping",
      color: "#4CAF50",
    },
    {
      icon: "⏰",
      title: "Delivery Time",
      desc: "3-7 business days में delivery",
      color: "#2196F3",
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      desc: "7 days return policy - कोई सवाल नहीं",
      color: "#FF9800",
    },
    {
      icon: "📱",
      title: "Track Order",
      desc: "Real-time tracking SMS द्वारा",
      color: "#9C27B0",
    },
    {
      icon: "🇮🇳",
      title: "Pan India",
      desc: "पूरे भारत में delivery - 500+ cities",
      color: "#F44336",
    },
    {
      icon: "💳",
      title: "Safe Payment",
      desc: "Cash on Delivery + Online payment उपलब्ध",
      color: "#607D8B",
    },
  ];

  return (
    <div className="min-h-screen">
      <div
        className="py-10 px-4 text-center"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl mb-3">🚚</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Shipping Information
        </h1>
        <p className="text-gray-800 text-sm">
          हम पूरे भारत में deliver करते हैं - We Deliver Across India
        </p>
      </div>

      {content && (
        <div className="mx-auto max-w-2xl px-4 pt-6">
          <div className="bg-white rounded-xl p-4 shadow text-sm text-gray-700 whitespace-pre-line">
            {content}
          </div>
        </div>
      )}

      <div className="px-4 py-6 max-w-4xl mx-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-4 text-center">
          📦 Shipping Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {shippingInfo.map((info) => (
            <div
              key={info.title}
              className="bg-white rounded-xl shadow p-4 flex items-start gap-3"
            >
              <div className="text-2xl shrink-0">{info.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {info.title}
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">{info.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-amber-50 rounded-xl p-5 border border-amber-200">
          <h3 className="font-bold text-gray-900 mb-3">📍 Delivery Areas</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-gray-700">
            {[
              "Delhi NCR",
              "Mumbai",
              "Lucknow",
              "Kanpur",
              "Agra",
              "Varanasi",
              "Jaipur",
              "Patna",
              "Pune",
              "Hyderabad",
              "Bangalore",
              "Chennai",
            ].map((city) => (
              <div key={city} className="flex items-center gap-1">
                <span className="text-amber-500">•</span> {city}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">और 500+ अन्य cities...</p>
        </div>
      </div>
    </div>
  );
}
