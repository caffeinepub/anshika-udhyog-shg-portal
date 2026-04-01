export function Gallery() {
  const placeholderImages = [
    {
      id: 1,
      title: "Silai Training Program",
      date: "2024-03-10",
      type: "photo",
    },
    { id: 2, title: "Lucky Draw Ceremony", date: "2024-03-15", type: "photo" },
    { id: 3, title: "SHG Meeting Delhi", date: "2024-03-20", type: "photo" },
    {
      id: 4,
      title: "Computer Training Batch",
      date: "2024-04-01",
      type: "photo",
    },
    {
      id: 5,
      title: "Branch Opening Lucknow",
      date: "2024-04-05",
      type: "photo",
    },
    { id: 6, title: "Award Distribution", date: "2024-04-10", type: "photo" },
  ];

  const colors = [
    "#FFF8E1",
    "#E8F5E9",
    "#E3F2FD",
    "#FCE4EC",
    "#F3E5F5",
    "#E0F2F1",
  ];
  const emojis = ["🧵", "🎉", "👥", "💻", "🏢", "🏆"];

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Gallery
      </h1>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        data-ocid="gallery.list"
      >
        {placeholderImages.map((img, idx) => (
          <div
            key={img.id}
            className="bg-white rounded-xl shadow-card overflow-hidden"
            data-ocid={`gallery.item.${idx + 1}`}
          >
            <div
              className="h-28 flex items-center justify-center text-4xl"
              style={{ background: colors[idx % colors.length] }}
            >
              {emojis[idx % emojis.length]}
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-800 leading-tight">
                {img.title}
              </p>
              <p className="text-[10px] text-gray-400 mt-0.5">{img.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
