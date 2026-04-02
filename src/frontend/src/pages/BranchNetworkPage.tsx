import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useApp } from "../context/AppContext";

const branches = [
  {
    state: "Uttar Pradesh",
    district: "Lucknow",
    name: "Lucknow Central Branch",
    status: "active",
    members: 48,
  },
  {
    state: "Uttar Pradesh",
    district: "Varanasi",
    name: "Varanasi Shakti Branch",
    status: "active",
    members: 35,
  },
  {
    state: "Uttar Pradesh",
    district: "Allahabad",
    name: "Prayagraj Branch",
    status: "active",
    members: 27,
  },
  {
    state: "Bihar",
    district: "Patna",
    name: "Patna Mahila Branch",
    status: "coming_soon",
    members: 0,
  },
  {
    state: "Madhya Pradesh",
    district: "Bhopal",
    name: "Bhopal Udyog Branch",
    status: "active",
    members: 22,
  },
  {
    state: "Rajasthan",
    district: "Jaipur",
    name: "Jaipur Shakti Branch",
    status: "coming_soon",
    members: 0,
  },
];

export function BranchNetworkPage() {
  const { language } = useApp();
  const hi = language === "hi";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">🏢</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "शाखा नेटवर्क" : "Branch Network"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "पूरे भारत में हमारी शाखाएँ" : "Our branches across India"}
        </p>
      </div>

      <div className="space-y-3">
        {branches.map((b, i) => (
          <Card
            key={b.name}
            className="shadow-card border-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{b.name}</p>
                    <p className="text-xs text-gray-500">
                      {b.district}, {b.state}
                    </p>
                    {b.status === "active" && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        {hi ? `${b.members} सदस्य` : `${b.members} members`}
                      </p>
                    )}
                  </div>
                </div>
                <Badge
                  className="text-xs shrink-0"
                  style={
                    b.status === "active"
                      ? { background: "#4CAF50", color: "white" }
                      : { background: "#9E9E9E", color: "white" }
                  }
                >
                  {b.status === "active"
                    ? hi
                      ? "सक्रिय"
                      : "Active"
                    : hi
                      ? "शीघ्र आ रहा है"
                      : "Coming Soon"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
