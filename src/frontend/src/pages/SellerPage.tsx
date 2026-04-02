import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

export function SellerPage() {
  const { state } = useApp();
  const content =
    state.pageContents.find((pc) => pc.page === "seller")?.content || "";
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    businessType: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile) {
      toast.error("नाम और mobile number जरूरी है।");
      return;
    }
    setSubmitted(true);
    toast.success("✅ Registration successful! हम जल्द आपसे contact करेंगे।");
  };

  const benefits = [
    { icon: "💰", title: "No Setup Cost", desc: "मुफ्त रजिस्ट्रेशन, कोई fees नहीं" },
    {
      icon: "🚚",
      title: "Shipping Support",
      desc: "हम Pan India shipping में मदद करते हैं",
    },
    {
      icon: "📈",
      title: "Market Reach",
      desc: "हजारों customers तक अपना product पहुंचाएं",
    },
    {
      icon: "👩‍💻",
      title: "Training & Support",
      desc: "Product listing और marketing की free training",
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
        <div className="text-4xl mb-3">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Become a Seller
        </h1>
        <p className="text-gray-800 text-sm">
          अपना उत्पाद बेचें - Anshika Udhyog के साथ व्यापार शुरू करें
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-xl p-3 shadow text-center"
            >
              <div className="text-2xl mb-1">{b.icon}</div>
              <h3 className="font-semibold text-gray-900 text-xs mb-0.5">
                {b.title}
              </h3>
              <p className="text-xs text-gray-500">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow p-6 max-w-lg mx-auto">
          <h2 className="font-bold text-gray-900 text-lg mb-4 text-center">
            📝 Seller Registration
          </h2>
          {submitted ? (
            <div className="text-center py-6" data-ocid="seller.success_state">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="font-bold text-green-700 text-base mb-1">
                Registration Submitted!
              </h3>
              <p className="text-sm text-gray-600">हम जल्द आपसे contact करेंगे।</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="seller-name"
                  className="text-xs font-medium text-gray-700"
                >
                  नाम / Name *
                </label>
                <input
                  id="seller-name"
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  placeholder="Your full name"
                  data-ocid="seller.input"
                />
              </div>
              <div>
                <label
                  htmlFor="seller-mobile"
                  className="text-xs font-medium text-gray-700"
                >
                  Mobile Number *
                </label>
                <input
                  id="seller-mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  placeholder="10-digit mobile"
                  data-ocid="seller.input"
                />
              </div>
              <div>
                <label
                  htmlFor="seller-business"
                  className="text-xs font-medium text-gray-700"
                >
                  Business Type
                </label>
                <input
                  id="seller-business"
                  type="text"
                  value={form.businessType}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, businessType: e.target.value }))
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  placeholder="e.g. Handicraft, Food, Textiles"
                  data-ocid="seller.input"
                />
              </div>
              <div>
                <label
                  htmlFor="seller-address"
                  className="text-xs font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="seller-address"
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-amber-400"
                  rows={2}
                  placeholder="Your business address"
                  data-ocid="seller.textarea"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg text-gray-900 font-bold text-sm transition-opacity hover:opacity-90"
                style={{ background: "#FFC107" }}
                data-ocid="seller.submit_button"
              >
                🚀 Submit Registration
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
