import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  CreditCard,
  Gift,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";

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

function useCountUp(target: string, started: boolean) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!started) return;
    const numMatch = target.match(/(\d+)/);
    if (!numMatch) {
      setDisplay(target);
      return;
    }
    const num = Number.parseInt(numMatch[1], 10);
    const prefix = target.slice(0, numMatch.index);
    const suffix = target.slice((numMatch.index ?? 0) + numMatch[1].length);
    let current = 0;
    const steps = 40;
    const increment = num / steps;
    const interval = setInterval(() => {
      current = Math.min(current + increment, num);
      setDisplay(`${prefix}${Math.floor(current)}${suffix}`);
      if (current >= num) clearInterval(interval);
    }, 1500 / steps);
    return () => clearInterval(interval);
  }, [target, started]);
  return display;
}

function StatItem({
  value,
  label,
  icon,
}: { value: string; label: string; icon: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const display = useCountUp(value, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center min-w-[80px]">
      <span className="text-2xl pulse-icon">{icon}</span>
      <span className="font-bold text-sm" style={{ color: "#FFC107" }}>
        {display}
      </span>
      <span className="text-[10px] text-gray-500 text-center">{label}</span>
    </div>
  );
}

export function HomePage() {
  const { setCurrentPage, state } = useApp();
  const { homepageContent, galleryItems } = state;
  const { slides, stats, aboutText, tagline, phone, email, address } =
    homepageContent;

  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goToSlide = (next: number) => {
    if (transitioning || next === slide) return;
    setPrevSlide(slide);
    setTransitioning(true);
    setTimeout(() => {
      setSlide(next);
      setTransitioning(false);
      setPrevSlide(null);
    }, 500);
  };

  useEffect(() => {
    const t = setInterval(() => goToSlide((slide + 1) % slides.length), 3000);
    return () => clearInterval(t);
  });

  const previewItems = galleryItems.slice(0, 4);

  return (
    <div className="max-w-lg mx-auto">
      {/* Hero Slider */}
      <div className="relative overflow-hidden" style={{ height: 230 }}>
        {/* Previous slide fading out */}
        {prevSlide !== null && (
          <div
            className="absolute inset-0 flex items-center justify-center flex-col text-center px-6"
            style={{
              background: slides[prevSlide].bg,
              opacity: transitioning ? 0 : 1,
              transition: "opacity 0.5s ease",
            }}
          />
        )}
        {/* Current slide */}
        <div
          className="absolute inset-0 flex items-center justify-center flex-col text-center px-6"
          style={{
            background: slides[slide].bg,
            opacity: transitioning ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
        >
          <div className="mb-2 animate-fade-in-up">
            <img
              src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
              alt="Logo"
              className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
            />
          </div>
          <h1
            key={`title-${slide}`}
            className="text-xl font-bold text-white drop-shadow-md animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {slides[slide].title}
          </h1>
          <p
            key={`sub-${slide}`}
            className="text-sm text-white/90 mt-1 drop-shadow animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {slides[slide].subtitle}
          </p>
          <p
            className="text-xs text-white/80 mt-1 font-semibold tracking-wide animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            {tagline}
          </p>
        </div>
        {/* Dot indicators */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              type="button"
              key={s.title}
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === slide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b overflow-x-auto">
        <div className="flex min-w-max px-3 py-3 gap-4">
          {stats.map((s) => (
            <StatItem
              key={s.label}
              value={s.value}
              label={s.label}
              icon={s.icon}
            />
          ))}
        </div>
      </div>

      {/* About Section */}
      <div
        className="px-4 py-5 animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <Card className="border-l-4" style={{ borderLeftColor: "#FFC107" }}>
          <CardContent className="pt-4">
            <h2 className="font-heading font-bold text-base text-gray-900 mb-2">
              हमारे बारे में / About Us
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{aboutText}</p>
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
      <div
        className="px-4 pb-5 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">
          हमारी सेवाएं / Our Services
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {SERVICES.map((svc) => {
            const Icon = svc.icon;
            return (
              <Card
                key={svc.title}
                className="overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <CardContent className="p-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 pulse-icon"
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
      <div
        className="px-4 pb-5 animate-fade-in-up"
        style={{ animationDelay: "0.2s" }}
      >
        <h2 className="font-heading font-bold text-base text-gray-900 mb-3">
          📸 Gallery
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {previewItems.length > 0
            ? previewItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="h-24 rounded-lg overflow-hidden relative"
                  style={{
                    background: item.src
                      ? undefined
                      : [
                          "linear-gradient(135deg, #FFC107, #FF8F00)",
                          "linear-gradient(135deg, #1a1a2e, #0f3460)",
                          "linear-gradient(135deg, #2e7d32, #66bb6a)",
                          "linear-gradient(135deg, #1565c0, #42a5f5)",
                        ][idx % 4],
                  }}
                >
                  {item.src && item.type === "photo" ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  ) : item.type === "video" ? (
                    <div
                      className="h-full flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                      }}
                    >
                      <span className="text-3xl">🎬</span>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold drop-shadow">
                        {item.title}
                      </span>
                    </div>
                  )}
                </div>
              ))
            : [
                {
                  bg: "linear-gradient(135deg, #FFC107, #FF8F00)",
                  label: "Gallery Photo 1",
                },
                {
                  bg: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                  label: "Gallery Photo 2",
                },
                {
                  bg: "linear-gradient(135deg, #2e7d32, #66bb6a)",
                  label: "Gallery Photo 3",
                },
                {
                  bg: "linear-gradient(135deg, #1565c0, #42a5f5)",
                  label: "Gallery Photo 4",
                },
              ].map((g) => (
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
        <Button
          variant="link"
          className="p-0 h-auto text-sm font-semibold mt-2"
          style={{ color: "#FFC107" }}
          onClick={() => setCurrentPage("gallery")}
          data-ocid="home.link"
        >
          View Full Gallery →
        </Button>
      </div>

      {/* CTA */}
      <div
        className="mx-4 mb-5 p-5 rounded-xl text-center animate-fade-in-up"
        style={{
          background: "linear-gradient(135deg, #FFC107, #FF8F00)",
          animationDelay: "0.25s",
        }}
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

      {/* Contact Section */}
      <div
        className="px-4 pb-6 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Card className="border-2" style={{ borderColor: "#FFC107" }}>
          <CardContent className="pt-4">
            <h2
              className="font-heading font-bold text-base text-gray-900 mb-3"
              style={{ color: "#FF8F00" }}
            >
              📞 Contact Us
            </h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <MapPin
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#FFC107" }}
                />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Phone
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#FFC107" }}
                />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Mail
                  className="h-4 w-4 shrink-0"
                  style={{ color: "#FFC107" }}
                />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <span style={{ color: "#FFC107" }}>⏰</span>
                <span>Mon-Sat: 9:00 AM – 6:00 PM</span>
              </div>
            </div>
            <Button
              className="w-full mt-4 text-gray-900 font-semibold"
              style={{ background: "#FFC107" }}
              onClick={() => setCurrentPage("contact")}
              data-ocid="home.primary_button"
            >
              Contact Us
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
