import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export function SignupPage() {
  const { addSHG, setCurrentPage, language } = useApp();
  const hi = language === "hi";

  const [form, setForm] = useState({
    groupName: "",
    leaderName: "",
    mobile: "",
    address: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      addSHG({
        groupName: form.groupName,
        leaderName: form.leaderName,
        mobile: form.mobile,
        address: form.address,
        password: form.password,
        status: "pending",
        walletBalance: 0,
        branchId: "b1",
        joinedDate: new Date().toISOString().split("T")[0],
        memberCount: 1,
      });
      setLoading(false);
      setSubmitted(true);
    }, 800);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-10 animate-fade-in-up">
        <Card className="shadow-card border-0 text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4 pulse-icon">✅</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {hi ? "पंजीकरण सफल!" : "Registration Successful!"}
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              {hi
                ? "आपका पंजीकरण प्रशासक के अनुमोदन के लिए लंबित है। हम जल्द ही आपसे संपर्क करेंगे।"
                : "Your registration is pending admin approval. We will contact you soon."}
            </p>
            <Button
              className="w-full font-bold"
              style={{ background: "#FFC107", color: "#1a1a2e" }}
              onClick={() => setCurrentPage("home")}
              data-ocid="signup.primary_button"
            >
              {hi ? "🏠 मुख्य पृष्ठ पर जाएं" : "🏠 Go to Homepage"}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">✍️</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "SHG पंजीकरण" : "SHG Registration"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "अपने समूह को पंजीकृत करें" : "Register your Self Help Group"}
        </p>
      </div>

      <Card className="shadow-card border-0">
        <CardContent className="p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label
                htmlFor="groupName"
                className="text-sm font-semibold text-gray-700"
              >
                {hi ? "समूह का नाम *" : "Group Name *"}
              </Label>
              <Input
                id="groupName"
                name="groupName"
                value={form.groupName}
                onChange={handleChange}
                required
                placeholder={hi ? "जैसे: आशा महिला SHG" : "e.g. Asha Mahila SHG"}
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>

            <div>
              <Label
                htmlFor="leaderName"
                className="text-sm font-semibold text-gray-700"
              >
                {hi ? "नेता का नाम *" : "Leader Name *"}
              </Label>
              <Input
                id="leaderName"
                name="leaderName"
                value={form.leaderName}
                onChange={handleChange}
                required
                placeholder={hi ? "जैसे: Savita Devi" : "e.g. Savita Devi"}
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>

            <div>
              <Label
                htmlFor="mobile"
                className="text-sm font-semibold text-gray-700"
              >
                {hi ? "मोबाइल नंबर *" : "Mobile Number *"}
              </Label>
              <Input
                id="mobile"
                name="mobile"
                type="tel"
                value={form.mobile}
                onChange={handleChange}
                required
                placeholder="10-digit mobile number"
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>

            <div>
              <Label
                htmlFor="address"
                className="text-sm font-semibold text-gray-700"
              >
                {hi ? "पता *" : "Address *"}
              </Label>
              <Input
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder={
                  hi ? "गाँव / शहर, जिला" : "Village / Town, District"
                }
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>

            <div>
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                {hi ? "पासवर्ड *" : "Password *"}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder={hi ? "कम से कम 6 अक्षर" : "At least 6 characters"}
                className="mt-1"
                data-ocid="signup.input"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full font-bold"
              style={{ background: "#FFC107", color: "#1a1a2e" }}
              data-ocid="signup.submit_button"
            >
              {loading
                ? hi
                  ? "सबमिट हो रहा है..."
                  : "Submitting..."
                : hi
                  ? "✍️ पंजीकरण करें"
                  : "✍️ Register SHG"}
            </Button>

            <p className="text-center text-xs text-gray-500">
              {hi
                ? "पंजीकरण के बाद एडमिन अनुमोदन आवश्यक है"
                : "Admin approval required after registration"}
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
