import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  CreditCard,
  Gift,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";

const SLIDES = [
  {
    bg: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
    title: "महिला सशक्तिकरण",
    subtitle: "Women Empowerment Through Self Help Groups",
  },
  {
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    title: "आर्थिक स्वतंत्रता",
    subtitle: "Financial Independence for Every Woman",
  },
  {
    bg: "linear-gradient(135deg, #2e7d32 0%, #43a047 60%, #66bb6a 100%)",
    title: "ऋण सेवाएं",
    subtitle: "Easy Loan Services for SHG Members",
  },
  {
    bg: "linear-gradient(135deg, #1565c0 0%, #1e88e5 60%, #42a5f5 100%)",
    title: "प्रशिक्षण कार्यक्रम",
    subtitle: "Skill Development & Training Programs",
  },
];

const STATS = [
  { value: "500+", label: "SHG Members", icon: "👥" },
  { value: "50+", label: "Branches", icon: "🏢" },
  { value: "₹10 Cr+", label: "Loans Disbursed", icon: "💰" },
  { value: "1000+", label: "Women Empowered", icon: "👩" },
];

const SERVICES = [
  {
    icon: CreditCard,
    title: "Loan Services",
    desc: "Easy loans for SHG members with flexible repayment",
  },
  {
    icon: BookOpen,
    title: "Training Programs",
    desc: "Skill development and vocational training",
  },
  {
    icon: Award,
    title: "Rewards & Recognition",
    desc: "Monthly awards and lucky draw for active members",
  },
  {
    icon: Wallet,
    title: "Wallet Management",
    desc: "Digital wallet for cashless transactions",
  },
  {
    icon: TrendingUp,
    title: "Multi-Level Income",
    desc: "Earn through multi-level referral income plan",
  },
  {
    icon: Users,
    title: "Digital ID Card",
    desc: "Official digital ID card for all SHG members",
  },
];

const GALLERY_LABELS = [
  { bg: "linear-gradient(135deg, #FFC107, #FF8F00)", label: "Gallery Photo 1" },
  { bg: "linear-gradient(135deg, #1a1a2e, #0f3460)", label: "Gallery Photo 2" },
  { bg: "linear-gradient(135deg, #2e7d32, #66bb6a)", label: "Gallery Photo 3" },
  { bg: "linear-gradient(135deg, #1565c0, #42a5f5)", label: "Gallery Photo 4" },
];

export function HomePage() {
  const { setCurrentPage } = useApp();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      {/* Hero Slider */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <div
          className="absolute inset-0 flex items-center justify-center flex-col text-center px-6 transition-all duration-700"
          style={{ background: SLIDES[slide].bg }}
        >
          <div className="mb-2">
            <img
              src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
              alt="Logo"
              className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
            />
          </div>
          <h1 className="text-xl font-bold text-white drop-shadow-md">
            {SLIDES[slide].title}
          </h1>
          <p className="text-sm text-white/90 mt-1 drop-shadow">
            {SLIDES[slide].subtitle}
          </p>
          <p className="text-xs text-white/80 mt-1 font-semibold tracking-wide">
            ANSHIKA UDHYOG SHG PORTAL
          </p>
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              type="button"
              key={s.title}
              onClick={() => setSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-white scale-125" : "bg-white/50"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex min-w-max px-3 py-3 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center min-w-[80px]"
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="font-bold text-sm" style={{ color: "#FFC107" }}>
                {s.value}
              </span>
              <span className="text-[10px] text-gray-500 text-center">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 py-5">
        <Card className="border-l-4" style={{ borderLeftColor: "#FFC107" }}>
          <CardContent className="pt-4">
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">
              हमारे बारे में / About Us
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              अंशिका उद्योग SHG पोर्टल महिला स्व-सहायता समूहों के लिए एक डिजिटल मंच है।
              हम महिलाओं को आर्थिक स्वतंत्रता और सशक्तिकरण प्रदान करते हैं।
            </p>
            <Button
              variant="link"
              className="p-0 h-auto text-sm font-semibold mt-1"
              style={{ color: "#FFC107" }}
              onClick={() => setCurrentPage("about")}
              data-ocid="home.secondary_button"
            >
              Read More →
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Services */}
      <div className="px-4 pb-5">
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">
          हमारी सेवाएं / Our Services
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <Card key={svc.title} className="overflow-hidden">
                <CardContent className="p-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2"
                    style={{ background: "#FFC107" }}
                  >
                    <Icon className="h-4 w-4 text-gray-900" />
                  </div>
                  <p className="font-semibold text-xs text-gray-900 leading-snug">
                    {svc.title}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-snug">
                    {svc.desc}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <Button
          variant="link"
          className="p-0 h-auto text-sm font-semibold mt-2"
          style={{ color: "#FFC107" }}
          onClick={() => setCurrentPage("services")}
          data-ocid="home.link"
        >
          View All Services →
        </Button>
      </div>

      {/* Gallery Preview */}
      <div className="px-4 pb-5">
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">
          Gallery
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {GALLERY_LABELS.map((g) => (
            <div
              key={g.label}
              className="h-24 rounded-lg flex items-center justify-center"
              style={{ background: g.bg }}
            >
              <span className="text-white text-xs font-semibold drop-shadow">
                Gallery Photo
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="mx-4 mb-5 p-5 rounded-xl text-center"
        style={{ background: "linear-gradient(135deg, #FFC107, #FF8F00)" }}
      >
        <h2 className="font-heading font-bold text-lg text-gray-900">
          हमारे साथ जुड़ें
        </h2>
        <p className="text-sm text-gray-800 mt-1 mb-3">
          Join Anshika Udhyog SHG Portal today
        </p>
        <Button
          className="font-semibold"
          style={{ background: "#1a1a2e", color: "white" }}
          onClick={() => setCurrentPage("login")}
          data-ocid="home.primary_button"
        >
          Join Us Today
        </Button>
      </div>

      {/* Contact Info */}
      <div className="px-4 pb-6">
        <Card>
          <CardContent className="pt-4">
            <h2 className="font-heading font-bold text-sm text-gray-900 mb-3">
              📞 Contact Us
            </h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p>📍 Anshika Udhyog Head Office, Uttar Pradesh, India</p>
              <p>📱 +91 XXXXX XXXXX</p>
              <p>✉️ info@anshikaudhyog.org</p>
            </div>
            <Button
              variant="link"
              className="p-0 h-auto text-sm font-semibold mt-2"
              style={{ color: "#FFC107" }}
              onClick={() => setCurrentPage("contact")}
              data-ocid="home.link"
            >
              Get in Touch →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
