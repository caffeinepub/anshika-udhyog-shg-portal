import { Card, CardContent } from "@/components/ui/card";

const TEAM = [
  { name: "Smt. Anshika Devi", role: "Founder & President", emoji: "👩" },
  { name: "Smt. Rekha Sharma", role: "Secretary", emoji: "👩‍💼" },
  { name: "Shri Ramesh Kumar", role: "Treasurer", emoji: "👨‍💼" },
];

const VALUES = [
  {
    emoji: "🤝",
    title: "Trust",
    desc: "Building trust among SHG members and communities",
  },
  {
    emoji: "💪",
    title: "Empowerment",
    desc: "Empowering women through financial literacy",
  },
  {
    emoji: "🌱",
    title: "Growth",
    desc: "Sustainable growth for all member families",
  },
  {
    emoji: "📚",
    title: "Education",
    desc: "Continuous learning and skill development",
  },
];

export function AboutPage() {
  return (
    <div className="max-w-lg mx-auto">
      {/* Banner */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{
          height: 160,
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <img
          src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
          alt="Logo"
          className="h-14 w-14 rounded-full object-cover border-4 border-white shadow mb-2"
        />
        <h1 className="font-heading font-bold text-xl text-gray-900">
          About Us
        </h1>
        <p className="text-sm text-gray-800">अंशिका उद्योग SHG पोर्टल</p>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* About */}
        <Card className="border-l-4" style={{ borderLeftColor: "#FFC107" }}>
          <CardContent className="pt-4">
            <h2 className="font-heading font-bold text-base mb-2">
              हमारे बारे में
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              अंशिका उद्योग स्व-सहायता समूह पोर्टल एक समर्पित डिजिटल मंच है जो उत्तर प्रदेश
              की महिला स्व-सहायता समूहों को सशक्त बनाने के लिए स्थापित किया गया है।
              हमारा लक्ष्य ग्रामीण महिलाओं को आर्थिक स्वतंत्रता प्रदान करना और उनके जीवन
              स्तर को ऊंचा उठाना है।
            </p>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-lg"
                style={{ background: "#FFC107" }}
              >
                🎯
              </div>
              <h3 className="font-semibold text-sm mb-1">Our Mission</h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                हर महिला को आर्थिक रूप से सक्षम बनाना और समाज में उनकी भागीदारी
                सुनिश्चित करना।
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 text-lg"
                style={{ background: "#1a1a2e" }}
              >
                👁️
              </div>
              <h3 className="font-semibold text-sm mb-1">Our Vision</h3>
              <p className="text-[11px] text-gray-500 leading-snug">
                एक ऐसा समाज बनाना जहाँ प्रत्येक महिला आत्मनिर्भर और सशक्त हो।
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team */}
        <div>
          <h2 className="font-heading font-bold text-base text-gray-900 mb-3">
            Our Leadership
          </h2>
          <div className="space-y-3">
            {TEAM.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-3 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                    style={{ background: "#FFC10733" }}
                  >
                    {member.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="font-heading font-bold text-base text-gray-900 mb-3">
            Our Values
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {VALUES.map((v) => (
              <Card key={v.title}>
                <CardContent className="p-3">
                  <span className="text-2xl">{v.emoji}</span>
                  <p className="font-semibold text-sm mt-1">{v.title}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Registration Info */}
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-sm mb-2">📋 Registration Info</h3>
            <div className="space-y-1 text-xs text-gray-600">
              <p>• Registered under Society Registration Act</p>
              <p>• NGO Darpan Registered</p>
              <p>• 12A & 80G Certified</p>
              <p>• NITI Aayog Registered</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
