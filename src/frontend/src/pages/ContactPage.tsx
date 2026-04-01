import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: "", phone: "", message: "" });
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Banner */}
      <div
        className="flex flex-col items-center justify-center text-center px-6"
        style={{
          height: 140,
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Contact Us
        </h1>
        <p className="text-sm text-gray-800 mt-1">
          संपर्क करें — We'd love to hear from you
        </p>
      </div>

      <div className="px-4 py-5 space-y-4">
        {/* Contact Details */}
        <div className="grid grid-cols-1 gap-3">
          {[
            {
              icon: "📍",
              title: "Address",
              value: "Anshika Udhyog Head Office,\nUttar Pradesh, India",
            },
            { icon: "📱", title: "Phone", value: "+91 XXXXX XXXXX" },
            { icon: "✉️", title: "Email", value: "info@anshikaudhyog.org" },
            {
              icon: "⏰",
              title: "Working Hours",
              value: "Mon–Sat: 9:00 AM – 6:00 PM",
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-3 flex items-start gap-3">
                <span className="text-xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-semibold text-sm text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map Placeholder */}
        <div
          className="w-full h-40 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #e3f2fd, #bbdefb)" }}
        >
          <div className="text-center">
            <span className="text-3xl">🗺️</span>
            <p className="text-sm text-blue-600 font-medium mt-1">
              Uttar Pradesh, India
            </p>
            <p className="text-xs text-blue-400">Map View</p>
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardContent className="pt-4">
            <h2 className="font-heading font-bold text-base mb-4">
              Send a Message
            </h2>
            {submitted && (
              <div
                className="mb-3 p-3 rounded-lg text-sm font-medium text-center"
                style={{ background: "#d1e7dd", color: "#0f5132" }}
                data-ocid="contact.success_state"
              >
                ✅ Your message has been sent successfully!
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs">
                  Your Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  required
                  data-ocid="contact.input"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-xs">
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Write your message here..."
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  required
                  data-ocid="contact.textarea"
                />
              </div>
              <Button
                type="submit"
                className="w-full font-semibold text-gray-900"
                style={{ background: "#FFC107" }}
                data-ocid="contact.submit_button"
              >
                📤 Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social */}
        <Card className="bg-gray-50">
          <CardContent className="pt-4">
            <h3 className="font-semibold text-sm mb-2">Follow Us</h3>
            <div className="flex gap-3">
              {["📘 Facebook", "📸 Instagram", "🐦 Twitter"].map((s) => (
                <span key={s} className="text-xs text-gray-500">
                  {s}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
