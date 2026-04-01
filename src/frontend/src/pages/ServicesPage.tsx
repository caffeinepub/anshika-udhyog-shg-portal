import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  BookOpen,
  CreditCard,
  Gift,
  Shield,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const SERVICES = [
  {
    icon: CreditCard,
    title: "Loan Services",
    titleHi: "ऋण सेवाएं",
    color: "#FFC107",
    desc: "SHG members can apply for personal, business, and emergency loans with low interest rates and flexible repayment options. Loans up to ₹5 lakhs available.",
    features: [
      "Personal Loans",
      "Business Loans",
      "Emergency Loans",
      "Easy Documentation",
    ],
  },
  {
    icon: BookOpen,
    title: "Training Programs",
    titleHi: "प्रशिक्षण कार्यक्रम",
    color: "#1565c0",
    desc: "Skill development and vocational training programs to help women become financially independent. Certificates provided on completion.",
    features: [
      "Skill Development",
      "Vocational Training",
      "Digital Literacy",
      "Certificate Programs",
    ],
  },
  {
    icon: Gift,
    title: "Rewards & Recognition",
    titleHi: "पुरस्कार और मान्यता",
    color: "#2e7d32",
    desc: "Monthly awards for best performing SHGs and lucky draw contests with exciting prizes for active members.",
    features: [
      "Monthly Awards",
      "Lucky Draw",
      "Best Performer Trophy",
      "Certificates",
    ],
  },
  {
    icon: Wallet,
    title: "Wallet Management",
    titleHi: "वॉलेट प्रबंधन",
    color: "#6a1b9a",
    desc: "Digital wallet for cashless transactions. Credit, debit, and transfer money with complete transaction history.",
    features: [
      "Digital Wallet",
      "Transaction History",
      "Fund Transfer",
      "Balance Management",
    ],
  },
  {
    icon: TrendingUp,
    title: "Multi-Level Income",
    titleHi: "बहु-स्तरीय आय",
    color: "#e65100",
    desc: "Earn additional income through our multi-level referral program. Up to 5 levels of commission income available.",
    features: [
      "5 Level Commission",
      "Referral Bonus",
      "Monthly Payouts",
      "Income Reports",
    ],
  },
  {
    icon: Users,
    title: "Digital ID Card",
    titleHi: "डिजिटल पहचान पत्र",
    color: "#00838f",
    desc: "Official digital ID card for all SHG members with QR code verification. PVC card also available for physical use.",
    features: ["Digital ID Card", "QR Code", "PVC Card", "PDF Download"],
  },
  {
    icon: Award,
    title: "SHG Management",
    titleHi: "SHG प्रबंधन",
    color: "#c62828",
    desc: "Complete SHG group management including member registration, group activities, meeting records, and compliance tracking.",
    features: [
      "Member Management",
      "Meeting Records",
      "Compliance",
      "Group Activities",
    ],
  },
  {
    icon: Shield,
    title: "Secure Portal",
    titleHi: "सुरक्षित पोर्टल",
    color: "#37474f",
    desc: "Role-based secure access portal for admin, staff, and SHG members. All data encrypted and protected.",
    features: [
      "Role-Based Access",
      "Data Encryption",
      "Secure Login",
      "Audit Logs",
    ],
  },
];

export function ServicesPage() {
  return (
    <div className="max-w-lg mx-auto">
      {/* Banner */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{
          height: 140,
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        }}
      >
        <h1 className="font-heading font-bold text-xl text-white">
          Our Services
        </h1>
        <p className="text-sm text-yellow-300 mt-1">
          हमारी सेवाएं — Empowering Women
        </p>
      </div>

      <div className="px-4 py-5 space-y-3">
        {SERVICES.map((svc) => {
          const Icon = svc.icon;
          return (
            <Card key={svc.title} className="overflow-hidden">
              <CardContent className="p-0">
                <div
                  className="flex items-center gap-3 p-4"
                  style={{ borderLeft: `4px solid ${svc.color}` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${svc.color}20` }}
                  >
                    <Icon className="h-5 w-5" style={{ color: svc.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900">
                      {svc.title}
                    </p>
                    <p className="text-[11px] text-gray-500">{svc.titleHi}</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">
                    {svc.desc}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {svc.features.map((f) => (
                      <span
                        key={f}
                        className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: `${svc.color}15`,
                          color: svc.color,
                        }}
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
