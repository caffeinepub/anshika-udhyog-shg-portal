import { useState } from "react";
import { useApp } from "../context/AppContext";

const faqs = [
  {
    en_q: "What is a Self Help Group (SHG)?",
    hi_q: "स्वयं सहायता समूह (SHG) क्या है?",
    en_a: "An SHG is a group of 10-20 women who meet regularly, save together, and support each other financially and socially to improve their livelihoods.",
    hi_a: "SHG 10-20 महिलाओं का समूह है जो नियमित मिलती हैं, एक साथ बचत करती हैं, और अपनी आजीविका सुधारने के लिए एक-दूसरे का आर्थिक और सामाजिक सहयोग करती हैं।",
  },
  {
    en_q: "How do I register my SHG on this portal?",
    hi_q: "मैं इस पोर्टल पर अपने SHG को कैसे पंजीकृत करूँ?",
    en_a: "Click on 'Signup / Register' in the menu. Fill in your Group Name, Leader Name, Mobile, Address and Password. Your registration will be reviewed by Admin within 48 hours.",
    hi_a: "मेनू में 'पंजीकरण' पर क्लिक करें। अपना समूह नाम, नेता का नाम, मोबाइल, पता और पासवर्ड भरें। आपके पंजीकरण की 48 घंटों के भीतर समीक्षा की जाएगी।",
  },
  {
    en_q: "What is KYC and why is it required?",
    hi_q: "KYC क्या है और यह क्यों जरूरी है?",
    en_a: "KYC (Know Your Customer) is identity verification. You must upload an Aadhaar card or government ID. It is required to access loans, wallet, and certificates.",
    hi_a: "KYC (Know Your Customer) पहचान सत्यापन है। आपको आधार कार्ड या सरकारी ID अपलोड करनी होगी। यह ऋण, वॉलेट और प्रमाण पत्र के लिए आवश्यक है।",
  },
  {
    en_q: "How can I apply for a loan?",
    hi_q: "मैं ऋण के लिए कैसे आवेदन करूँ?",
    en_a: "After KYC approval, login to your SHG dashboard and go to 'Apply Loan'. Fill in the amount and purpose. Your application will be reviewed by the Admin.",
    hi_a: "KYC अनुमोदन के बाद, अपने SHG डैशबोर्ड में लॉगिन करें और 'ऋण आवेदन' पर जाएं। राशि और उद्देश्य भरें। आपके आवेदन की एडमिन द्वारा समीक्षा की जाएगी।",
  },
  {
    en_q: "Are the training programs free?",
    hi_q: "क्या प्रशिक्षण कार्यक्रम निःशुल्क हैं?",
    en_a: "Yes, all training programs listed on this portal are free for approved SHG members. You only need to enroll from your dashboard.",
    hi_a: "हाँ, इस पोर्टल पर सूचीबद्ध सभी प्रशिक्षण कार्यक्रम अनुमोदित SHG सदस्यों के लिए निःशुल्क हैं।",
  },
  {
    en_q: "How does the wallet work?",
    hi_q: "वॉलेट कैसे काम करता है?",
    en_a: "Your SHG wallet receives credits from rewards, lucky draws, and salary payments. You can view your balance and transaction history from the SHG dashboard.",
    hi_a: "आपके SHG वॉलेट में पुरस्कार, लकी ड्रा और वेतन भुगतान से क्रेडिट मिलता है।",
  },
  {
    en_q: "Can I download my ID Card and Certificate?",
    hi_q: "क्या मैं अपना ID कार्ड और प्रमाण पत्र डाउनलोड कर सकती हूँ?",
    en_a: "Yes. After login, go to 'ID Card Download' from the SHG dashboard. Certificates are available after completing training programs.",
    hi_a: "हाँ। लॉगिन के बाद, SHG डैशबोर्ड से 'ID कार्ड डाउनलोड' पर जाएं।",
  },
  {
    en_q: "How do I contact support?",
    hi_q: "मैं सहायता से कैसे संपर्क करूँ?",
    en_a: "Visit the 'Contact Us' page to reach our team by phone or email. Our support team is available Monday to Saturday, 9 AM to 6 PM.",
    hi_a: "हमारी टीम से फोन या ईमेल द्वारा संपर्क करने के लिए 'संपर्क करें' पेज पर जाएं।",
  },
];

export function FAQPage() {
  const { language } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hi = language === "hi";

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">❓</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "आपके सवालों के जवाब" : "Answers to your questions"}
        </p>
      </div>

      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={faq.en_q}
            className="bg-white rounded-xl shadow-card overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              data-ocid={`faq.toggle.${i + 1}`}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-amber-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 text-sm pr-4">
                {hi ? faq.hi_q : faq.en_q}
              </span>
              <span
                className="text-amber-500 text-xl shrink-0 transition-transform duration-200"
                style={{
                  transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                }}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-amber-100">
                {hi ? faq.hi_a : faq.en_a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
