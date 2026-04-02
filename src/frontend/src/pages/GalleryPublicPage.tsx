import { useApp } from "../context/AppContext";

const PLACEHOLDER_GRADIENTS = [
  "linear-gradient(135deg,#FFC107,#FF8F00)",
  "linear-gradient(135deg,#4CAF50,#2E7D32)",
  "linear-gradient(135deg,#2196F3,#1565C0)",
  "linear-gradient(135deg,#E91E63,#880E4F)",
  "linear-gradient(135deg,#9C27B0,#4A148C)",
  "linear-gradient(135deg,#FF5722,#BF360C)",
  "linear-gradient(135deg,#00BCD4,#006064)",
  "linear-gradient(135deg,#607D8B,#263238)",
];

export function GalleryPublicPage() {
  const { language, state } = useApp();
  const hi = language === "hi";
  const items = state.galleryItems;

  return (
    <div className="max-w-lg mx-auto px-4 py-6 animate-fade-in-up">
      <div
        className="rounded-2xl p-6 mb-6 text-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
        }}
      >
        <div className="text-4xl pulse-icon mb-2">🖼️</div>
        <h1 className="text-2xl font-bold text-gray-900">
          {hi ? "गैलरी" : "Gallery"}
        </h1>
        <p className="text-gray-800 text-sm mt-1">
          {hi ? "फोटो और वीडियो" : "Photos & Videos from our events"}
        </p>
      </div>

      {items.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="gallery.empty_state"
        >
          <p className="text-4xl mb-2">🖼️</p>
          <p className="text-sm">
            {hi ? "अभी कोई मीडिया नहीं है।" : "No media uploaded yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {items.map((item, i) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden shadow-card animate-fade-in-up"
              style={{ animationDelay: `${i * 0.06}s` }}
              data-ocid={`gallery.item.${i + 1}`}
            >
              {item.src ? (
                item.type === "photo" ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-28 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="h-28 flex flex-col items-center justify-center relative"
                    style={{
                      background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                    }}
                  >
                    <span className="text-3xl">🎬</span>
                    <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[9px] px-1 rounded font-bold">
                      VIDEO
                    </span>
                  </div>
                )
              ) : (
                <div
                  className="h-28 flex flex-col items-center justify-center"
                  style={{
                    background:
                      PLACEHOLDER_GRADIENTS[i % PLACEHOLDER_GRADIENTS.length],
                  }}
                >
                  <span className="text-3xl">
                    {item.type === "photo" ? "📸" : "🎬"}
                  </span>
                </div>
              )}
              <div className="bg-white p-2">
                <p className="text-xs font-semibold text-gray-800 truncate">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400">
                  {item.type === "photo"
                    ? hi
                      ? "फोटो"
                      : "Photo"
                    : hi
                      ? "वीडियो"
                      : "Video"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-4">
        {hi
          ? "📸 सभी मीडिया एडमिन द्वारा अपलोड किया जाता है"
          : "📸 All media uploaded by Admin"}
      </p>
    </div>
  );
}
