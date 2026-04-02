import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, LogIn, Search, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { TickerBar } from "./TickerBar";

const PUBLIC_MENU = [
  { key: "home", label_en: "🏠 Home", label_hi: "🏠 मुख्य पृष्ठ" },
  { key: "about", label_en: "ℹ️ About Us", label_hi: "ℹ️ हमारे बारे में" },
  {
    key: "mission",
    label_en: "🎯 Mission & Vision",
    label_hi: "🎯 लक्ष्य और दृष्टि",
  },
  { key: "team", label_en: "👥 Our Team", label_hi: "👥 हमारी टीम" },
  { key: "branches", label_en: "🏢 Branch Network", label_hi: "🏢 शाखा नेटवर्क" },
  {
    key: "shg_program",
    label_en: "🌟 SHG Program Details",
    label_hi: "🌟 SHG कार्यक्रम",
  },
  {
    key: "cottage",
    label_en: "🏡 Cottage Industry",
    label_hi: "🏡 कुटीर उद्योग",
  },
  {
    key: "training_pub",
    label_en: "📚 Training Programs",
    label_hi: "📚 प्रशिक्षण",
  },
  {
    key: "rewards_pub",
    label_en: "🏆 Rewards & Winners",
    label_hi: "🏆 पुरस्कार",
  },
  { key: "jobs", label_en: "💼 Jobs / Work", label_hi: "💼 नौकरी / काम" },
  { key: "news", label_en: "📰 News / Updates", label_hi: "📰 समाचार" },
  { key: "gallery_pub", label_en: "🖼️ Gallery", label_hi: "🖼️ गैलरी" },
  {
    key: "success_stories",
    label_en: "✨ Success Stories",
    label_hi: "✨ सफलता की कहानियाँ",
  },
  { key: "documents", label_en: "📁 Documents", label_hi: "📁 दस्तावेज़" },
  { key: "faq", label_en: "❓ FAQ", label_hi: "❓ अक्सर पूछे जाने वाले प्रश्न" },
  {
    key: "marketing",
    label_en: "📢 Marketing & Offers",
    label_hi: "📢 मार्केटिंग",
  },
  { key: "vacancies", label_en: "💼 Vacancies", label_hi: "💼 नौकरी" },
  { key: "shopping", label_en: "🛍️ Shopping", label_hi: "🛍️ खरीदारी" },
  { key: "seller", label_en: "🛒 Become a Seller", label_hi: "🛒 Seller बनें" },
  { key: "shipping", label_en: "🚚 Shipping Info", label_hi: "🚚 शिपिंग" },
  { key: "policy", label_en: "📜 Policy & Terms", label_hi: "📜 नीति व शर्तें" },
  { key: "contact", label_en: "📞 Contact Us", label_hi: "📞 संपर्क करें" },
  { key: "login", label_en: "🔐 Login", label_hi: "🔐 लॉगिन" },
  { key: "signup", label_en: "✍️ Signup / Register", label_hi: "✍️ पंजीकरण" },
];

const FONT_MAP: Record<string, string> = {
  default: "Inter, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', serif",
  rounded: "Nunito, system-ui, sans-serif",
  mono: "'Courier New', Courier, monospace",
};
const FONT_SIZE_MAP: Record<string, string> = {
  small: "14px",
  medium: "16px",
  large: "18px",
};

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const {
    currentPage,
    sidebarOpen,
    setSidebarOpen,
    setCurrentPage,
    language,
    setLanguage,
    state,
  } = useApp();
  const [verifyId, setVerifyId] = useState("");
  const [verifyResult, setVerifyResult] = useState<
    "idle" | "found" | "notfound"
  >("idle");
  const [verifiedMember, setVerifiedMember] = useState<
    (typeof state.members)[0] | null
  >(null);
  const [showVerify, setShowVerify] = useState(false);

  const activeTickers = state.tickers.filter((t) => t.active);
  const logoUrl =
    state.siteSettings.logoUrl || state.homepageContent.logoUrl || "";
  const siteTitle =
    state.siteSettings.siteTitle ||
    state.homepageContent.siteTitle ||
    "ANSHIKA UDHYOG";
  const fontFamily =
    FONT_MAP[state.siteSettings.fontFamily] || FONT_MAP.default;
  const fontSize = FONT_SIZE_MAP[state.siteSettings.fontSize] || "16px";

  const handleVerify = () => {
    const found = state.members.find(
      (m) => m.idNumber.toLowerCase() === verifyId.trim().toLowerCase(),
    );
    if (found) {
      setVerifiedMember(found);
      setVerifyResult("found");
    } else {
      setVerifiedMember(null);
      setVerifyResult("notfound");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F5F5F5", fontFamily, fontSize }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 shadow-md"
        style={{ background: "#FFC107" }}
      >
        <div className="flex items-center h-14 px-3 gap-2">
          <button
            type="button"
            className="shrink-0 rounded hover:bg-amber-500 transition-colors p-1"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-[5px] p-1">
              <div
                style={{
                  width: "22px",
                  height: "2px",
                  background: "#1a1a2e",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "14px",
                  height: "2px",
                  background: "#1a1a2e",
                  borderRadius: "2px",
                }}
              />
              <div
                style={{
                  width: "18px",
                  height: "2px",
                  background: "#1a1a2e",
                  borderRadius: "2px",
                }}
              />
            </div>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 flex-1 min-w-0"
            onClick={() => setCurrentPage("home")}
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-8 w-8 rounded-full object-cover border-2 border-white shadow shrink-0"
              />
            ) : (
              <img
                src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
                alt="Logo"
                className="h-8 w-8 rounded-full object-cover border-2 border-white shadow shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div className="min-w-0 text-left">
              <p className="font-bold text-gray-900 text-xs leading-tight truncate">
                {siteTitle}
              </p>
              <p className="text-gray-800 text-[10px] leading-tight truncate">
                SHG PORTAL
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setLanguage(language === "en" ? "hi" : "en")}
            className="shrink-0 text-xs font-bold px-2 py-1 rounded border border-gray-800 bg-white/60 hover:bg-white transition-colors"
            aria-label="Toggle language"
          >
            {language === "en" ? "हि" : "EN"}
          </button>
          <Button
            size="sm"
            className="text-white font-semibold text-xs shrink-0 hidden sm:flex"
            style={{ background: "#1a1a2e" }}
            onClick={() => setCurrentPage("signup")}
          >
            <UserPlus className="h-3 w-3 mr-1" />
            {language === "en" ? "Sign Up" : "पंजीकरण"}
          </Button>
          <Button
            size="sm"
            className="text-white font-semibold text-xs shrink-0"
            style={{ background: "#1a1a2e" }}
            onClick={() => setCurrentPage("login")}
          >
            <LogIn className="h-3 w-3 mr-1" />
            {language === "en" ? "Login" : "लॉगिन"}
          </Button>
        </div>
        <TickerBar messages={activeTickers.map((t) => t.message)} />
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="presentation"
        />
      )}

      {/* Slide Menu */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-72 flex flex-col slide-menu ${sidebarOpen ? "open" : ""}`}
        style={{ background: "#1a1a2e" }}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ background: "#FFC107" }}
        >
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Logo"
                className="h-10 w-10 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-amber-800 flex items-center justify-center text-white font-bold text-lg border-2 border-white">
                A
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900 text-sm leading-tight">
                {siteTitle}
              </p>
              <p className="text-gray-800 text-[11px]">SHG Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 hover:bg-amber-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {PUBLIC_MENU.map((item, idx) => {
            const isActive = currentPage === item.key;
            const label = language === "en" ? item.label_en : item.label_hi;
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setSidebarOpen(false);
                }}
                data-ocid={`nav.link.${idx + 1}`}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isActive ? "text-gray-900 font-semibold" : "text-gray-300 hover:text-white hover:bg-white/10"}`}
                style={isActive ? { background: "#FFC107" } : {}}
              >
                <span className="flex-1 text-left">{label}</span>
                {isActive && <ChevronRight className="h-3 w-3" />}
              </button>
            );
          })}

          {/* Member Verify Section */}
          <div className="mx-3 mt-2 mb-1">
            <div className="border-t" style={{ borderColor: "#2d2d4e" }} />
          </div>
          <button
            type="button"
            onClick={() => setShowVerify(!showVerify)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">
              {language === "en" ? "🔍 Member Verify" : "🔍 सदस्य सत्यापन"}
            </span>
            <span className="text-xs">{showVerify ? "▲" : "▼"}</span>
          </button>
          {showVerify && (
            <div
              className="mx-3 mb-2 p-3 rounded-lg"
              style={{ background: "#2d2d4e" }}
            >
              <p className="text-xs text-gray-400 mb-2">
                {language === "en"
                  ? "Enter Member ID to verify:"
                  : "सदस्य ID दर्ज करें:"}
              </p>
              <div className="flex gap-1.5">
                <Input
                  value={verifyId}
                  onChange={(e) => {
                    setVerifyId(e.target.value);
                    setVerifyResult("idle");
                  }}
                  placeholder="e.g. AUC001"
                  className="flex-1 h-8 text-xs bg-white"
                />
                <Button
                  size="sm"
                  onClick={handleVerify}
                  className="h-8 px-2 text-gray-900 font-semibold text-xs"
                  style={{ background: "#FFC107" }}
                >
                  Go
                </Button>
              </div>
              {verifyResult === "found" && verifiedMember && (
                <div className="mt-2 p-2 rounded-lg bg-green-900/40 border border-green-700">
                  <div className="flex items-center gap-2">
                    {verifiedMember.photo ? (
                      <img
                        src={verifiedMember.photo}
                        alt={verifiedMember.name}
                        className="h-10 w-10 rounded-full object-cover border-2 border-green-400"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold border-2 border-green-400">
                        {verifiedMember.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-white font-bold text-xs">
                        {verifiedMember.name}
                      </p>
                      <p className="text-green-300 text-[10px]">
                        {verifiedMember.designation}
                      </p>
                      <p className="text-gray-400 text-[10px]">
                        📍 {verifiedMember.location}
                      </p>
                      <p className="text-green-400 text-[10px] font-mono">
                        ID: {verifiedMember.idNumber} ✓
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {verifyResult === "notfound" && (
                <div className="mt-2 p-2 rounded-lg bg-red-900/40 border border-red-700">
                  <p className="text-red-400 text-xs">
                    ❌{" "}
                    {language === "en"
                      ? "Member not found. Please check the ID."
                      : "सदस्य नहीं मिला।"}
                  </p>
                </div>
              )}
            </div>
          )}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "#2d2d4e" }}>
          <Button
            onClick={() => {
              setCurrentPage("login");
              setSidebarOpen(false);
            }}
            className="w-full font-semibold mb-2"
            style={{ background: "#FFC107", color: "#1a1a2e" }}
          >
            <LogIn className="h-4 w-4 mr-2" />
            {language === "en" ? "Login to Portal" : "पोर्टल में लॉगिन करें"}
          </Button>
          <Button
            onClick={() => {
              setCurrentPage("signup");
              setSidebarOpen(false);
            }}
            variant="outline"
            className="w-full font-semibold border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-gray-900"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            {language === "en" ? "Register SHG" : "SHG पंजीकरण"}
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>

      <footer className="py-4 px-4 text-center text-xs text-gray-500 bg-white border-t">
        <p>© 2022 Anshika Udhyog SHG Portal. All Rights Reserved.</p>
        <p className="mt-1">
          Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-600"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
