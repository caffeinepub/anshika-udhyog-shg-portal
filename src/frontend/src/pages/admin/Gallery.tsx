import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

const PLACEHOLDER_COLORS = [
  "linear-gradient(135deg, #FFF8E1, #FFE082)",
  "linear-gradient(135deg, #E8F5E9, #A5D6A7)",
  "linear-gradient(135deg, #E3F2FD, #90CAF9)",
  "linear-gradient(135deg, #FCE4EC, #F48FB1)",
  "linear-gradient(135deg, #F3E5F5, #CE93D8)",
  "linear-gradient(135deg, #E0F2F1, #80CBC4)",
];
const PLACEHOLDER_EMOJI = ["🧵", "🎉", "👥", "💻", "🏢", "🏆", "🌺", "🎗️"];

export function Gallery() {
  const { state, addGalleryItem, deleteGalleryItem } = useApp();
  const { galleryItems } = state;
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [videoDialog, setVideoDialog] = useState(false);
  const [videoForm, setVideoForm] = useState({ title: "", src: "" });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      addGalleryItem({
        title: file.name.replace(/\.[^/.]+$/, ""),
        date: new Date().toISOString().split("T")[0],
        type: "photo",
        src,
      });
      toast.success("Photo uploaded successfully!");
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleAddVideo = () => {
    if (!videoForm.title.trim() || !videoForm.src.trim()) {
      toast.error("Please enter title and video URL");
      return;
    }
    addGalleryItem({
      title: videoForm.title,
      date: new Date().toISOString().split("T")[0],
      type: "video",
      src: videoForm.src,
    });
    setVideoForm({ title: "", src: "" });
    setVideoDialog(false);
    toast.success("Video added successfully!");
  };

  const handleDelete = (id: string) => {
    deleteGalleryItem(id);
    toast.success("Item deleted");
  };

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        🖼️ Gallery Management
      </h1>

      {/* Upload Buttons */}
      <div className="flex gap-2 mb-5">
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
          data-ocid="gallery.upload_button"
        />
        <Button
          onClick={() => photoInputRef.current?.click()}
          className="flex-1 text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
          data-ocid="gallery.upload_button"
        >
          📷 Upload Photo
        </Button>
        <Button
          onClick={() => setVideoDialog(true)}
          variant="outline"
          className="flex-1 font-semibold border-2"
          style={{ borderColor: "#FFC107", color: "#1a1a2e" }}
          data-ocid="gallery.open_modal_button"
        >
          🎬 Add Video URL
        </Button>
      </div>

      {/* Video Dialog */}
      <Dialog open={videoDialog} onOpenChange={setVideoDialog}>
        <DialogContent data-ocid="gallery.dialog">
          <DialogHeader>
            <DialogTitle>🎬 Add Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold">Video Title</Label>
              <Input
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter video title..."
                className="mt-1"
                data-ocid="gallery.input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold">
                YouTube / Video URL
              </Label>
              <Input
                value={videoForm.src}
                onChange={(e) =>
                  setVideoForm((prev) => ({ ...prev, src: e.target.value }))
                }
                placeholder="https://youtube.com/..."
                className="mt-1"
                data-ocid="gallery.input"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleAddVideo}
                className="flex-1 text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
                data-ocid="gallery.confirm_button"
              >
                Add Video
              </Button>
              <Button
                variant="outline"
                onClick={() => setVideoDialog(false)}
                data-ocid="gallery.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery Grid */}
      {galleryItems.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="gallery.empty_state"
        >
          <p className="text-4xl mb-2">🖼️</p>
          <p className="text-sm">
            No items yet. Upload a photo or add a video!
          </p>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          data-ocid="gallery.list"
        >
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-card overflow-hidden animate-fade-in group relative"
              data-ocid={`gallery.item.${idx + 1}`}
              style={{ animationDelay: `${idx * 80}ms` }}
            >
              {/* Thumbnail */}
              {item.type === "photo" ? (
                item.src ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-28 w-full object-cover"
                  />
                ) : (
                  <div
                    className="h-28 flex items-center justify-center text-3xl"
                    style={{
                      background:
                        PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length],
                    }}
                  >
                    {PLACEHOLDER_EMOJI[idx % PLACEHOLDER_EMOJI.length]}
                  </div>
                )
              ) : (
                <div
                  className="h-28 flex items-center justify-center relative"
                  style={{
                    background: "linear-gradient(135deg, #1a1a2e, #0f3460)",
                  }}
                >
                  <span className="text-4xl">🎬</span>
                  <span className="absolute bottom-1 right-1 bg-red-600 text-white text-[9px] px-1 rounded font-bold">
                    VIDEO
                  </span>
                </div>
              )}
              {/* Info */}
              <div className="p-2">
                <p className="text-xs font-semibold text-gray-800 leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.date}</p>
              </div>
              {/* Delete button */}
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                data-ocid={`gallery.delete_button.${idx + 1}`}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
