import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Shield, User, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";

type LoginRole = "admin" | "staff" | "shg" | null;

export function LoginPage() {
  const { login } = useApp();
  const [activeRole, setActiveRole] = useState<LoginRole>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!activeRole || !username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const success = login(activeRole, username, password);
    setLoading(false);
    if (!success) {
      toast.error("Invalid credentials. Please try again.");
    } else {
      toast.success("Login successful! Welcome back.");
    }
  };

  const roleButtons = [
    {
      role: "admin" as const,
      label: "Admin Login",
      icon: Shield,
      hint: "admin / 504560@AUC",
      color: "#c62828",
      bg: "#ffebee",
    },
    {
      role: "staff" as const,
      label: "Staff Login",
      icon: User,
      hint: "Mobile & password",
      color: "#1565c0",
      bg: "#e3f2fd",
    },
    {
      role: "shg" as const,
      label: "SHG Login",
      icon: Users,
      hint: "Mobile & password",
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #FFF8E1 0%, #FFF3CD 50%, #FFE082 100%)",
      }}
    >
      {/* Header banner */}
      <div className="py-6 px-4 text-center" style={{ background: "#FFC107" }}>
        <img
          src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
          alt="Anshika Udhyog Logo"
          className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-lg mx-auto mb-3"
        />
        <h1 className="font-heading font-bold text-gray-900 text-xl leading-tight">
          ANSHIKA UDHYOG SHG PORTAL
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          महिला सशक्तिकरण की ओर एक कदम
        </p>
        <p className="text-gray-700 text-xs mt-1 italic">
          Empowering Business, Embracing Nature
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start py-6 px-4">
        {/* Role selection */}
        <div className="w-full max-w-sm">
          <p className="text-center text-gray-700 text-sm font-semibold mb-4">
            अपना Role चुनें / Select Your Role
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {roleButtons.map(({ role, label, icon: Icon, color, bg }) => (
              <button
                type="button"
                key={role}
                onClick={() => {
                  setActiveRole(role);
                  setUsername("");
                  setPassword("");
                }}
                data-ocid={`login.${role}_button`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all"
                style={{
                  borderColor: activeRole === role ? color : "#e0e0e0",
                  background: activeRole === role ? bg : "white",
                  transform: activeRole === role ? "scale(1.03)" : "scale(1)",
                }}
              >
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <span
                  className="text-xs font-semibold text-center leading-tight"
                  style={{ color }}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          {/* Login form */}
          {activeRole && (
            <Card className="shadow-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-center text-base">
                  {roleButtons.find((r) => r.role === activeRole)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label
                    htmlFor="username"
                    className="text-xs font-semibold text-gray-600"
                  >
                    {activeRole === "admin" ? "Username" : "Mobile Number"}
                  </Label>
                  <Input
                    id="username"
                    placeholder={
                      activeRole === "admin"
                        ? "Enter username"
                        : "Enter mobile number"
                    }
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    data-ocid="login.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold text-gray-600"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPass ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                      data-ocid="login.input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPass((p) => !p)}
                    >
                      {showPass ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {activeRole === "admin" && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                    Demo: <strong>admin</strong> / <strong>504560@AUC</strong>
                  </p>
                )}
                {activeRole === "staff" && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                    Demo: <strong>9876543210</strong> /{" "}
                    <strong>ramesh123</strong>
                  </p>
                )}
                {activeRole === "shg" && (
                  <p className="text-xs text-gray-500 bg-gray-50 rounded p-2">
                    Demo: <strong>8765432101</strong> / <strong>asha123</strong>
                  </p>
                )}

                <Button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full font-bold text-gray-900"
                  style={{ background: "#FFC107" }}
                  data-ocid="login.submit_button"
                >
                  {loading ? "Logging in..." : "LOGIN"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Anshika Udhyog Group. Built with ❤️ using{" "}
          <a href="https://caffeine.ai" className="underline">
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
