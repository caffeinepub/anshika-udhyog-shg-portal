import { Button } from "@/components/ui/button";
import { ChevronRight, LogIn, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const PUBLIC_MENU = [
  { key: "home", label: "🏠 Home" },
  { key: "about", label: "ℹ️ About Us" },
  { key: "services", label: "⚙️ Services" },
  { key: "gallery", label: "🖼️ Gallery" },
  { key: "contact", label: "📞 Contact Us" },
];

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const { currentPage, sidebarOpen, setSidebarOpen, setCurrentPage } = useApp();

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F5F5F5" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 shadow-md"
        style={{ background: "#FFC107" }}
      >
        <div className="flex items-center h-14 px-3 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 hover:bg-amber-500 shrink-0"
            onClick={() => setSidebarOpen(true)}
            data-ocid="nav.toggle"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <button
            type="button"
            className="flex items-center gap-2 flex-1 min-w-0"
            onClick={() => setCurrentPage("home")}
          >
            <img
              src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover border-2 border-white shadow shrink-0"
            />
            <div className="min-w-0 text-left">
              <p className="font-heading font-bold text-gray-900 text-xs leading-tight truncate">
                ANSHIKA UDHYOG
              </p>
              <p className="text-gray-800 text-[10px] leading-tight truncate">
                SHG PORTAL
              </p>
            </div>
          </button>
          <Button
            size="sm"
            className="text-gray-900 font-semibold text-xs shrink-0"
            style={{ background: "#1a1a2e", color: "white" }}
            onClick={() => setCurrentPage("login")}
            data-ocid="nav.link"
          >
            <LogIn className="h-3 w-3 mr-1" /> Login
          </Button>
        </div>
      </header>

      {/* Overlay */}
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
            <img
              src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <p className="font-heading font-bold text-gray-900 text-sm leading-tight">
                ANSHIKA UDHYOG
              </p>
              <p className="text-gray-800 text-[11px]">SHG Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 hover:bg-amber-500"
            onClick={() => setSidebarOpen(false)}
            data-ocid="nav.close_button"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {PUBLIC_MENU.map((item, idx) => {
            const isActive = currentPage === item.key;
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setSidebarOpen(false);
                }}
                data-ocid={`nav.link.${idx + 1}`}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                style={isActive ? { background: "#FFC107" } : {}}
              >
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight className="h-3 w-3" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "#2d2d4e" }}>
          <Button
            onClick={() => {
              setCurrentPage("login");
              setSidebarOpen(false);
            }}
            className="w-full font-semibold"
            style={{ background: "#FFC107", color: "#1a1a2e" }}
            data-ocid="nav.link"
          >
            <LogIn className="h-4 w-4 mr-2" /> Login to Portal
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>

      <footer className="py-3 px-4 text-center text-xs text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} Anshika Udhyog SHG Portal. Built with ❤️
        using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
