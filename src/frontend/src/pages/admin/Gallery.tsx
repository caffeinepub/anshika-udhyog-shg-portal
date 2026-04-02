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
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [videoDialog, setVideoDialog] = useState(false);
  const [videoForm, setVideoForm] = useState({ title: "", src: "" });
  const [photoDialog, setPhotoDialog] = useState(false);
  const [pendingFile, setPendingFile] = useState<{
    dataUrl: string;
    defaultName: string;
  } | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [pendingVideo, setPendingVideo] = useState<{
    dataUrl: string;
    defaultName: string;
  } | null>(null);
  const [videoFileDialog, setVideoFileDialog] = useState(false);
  const [videoFileTitle, setVideoFileTitle] = useState("");

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setPendingFile({
        dataUrl: src,
        defaultName: file.name.replace(/\.[^/.]+$/, ""),
      });
      setPhotoTitle(file.name.replace(/\.[^/.]+$/, ""));
      setPhotoDialog(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setPendingVideo({
        dataUrl: src,
        defaultName: file.name.replace(/\.[^/.]+$/, ""),
      });
      setVideoFileTitle(file.name.replace(/\.[^/.]+$/, ""));
      setVideoFileDialog(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleConfirmPhoto = () => {
    if (!pendingFile) return;
    if (!photoTitle.trim()) {
      toast.error("Please enter a title for the photo");
      return;
    }
    addGalleryItem({
      title: photoTitle.trim(),
      date: new Date().toISOString().split("T")[0],
      type: "photo",
      src: pendingFile.dataUrl,
    });
    setPendingFile(null);
    setPhotoTitle("");
    setPhotoDialog(false);
    toast.success("Photo uploaded successfully!");
  };

  const handleConfirmVideoFile = () => {
    if (!pendingVideo) return;
    if (!videoFileTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }
    addGalleryItem({
      title: videoFileTitle.trim(),
      date: new Date().toISOString().split("T")[0],
      type: "video",
      src: pendingVideo.dataUrl,
    });
    setPendingVideo(null);
    setVideoFileTitle("");
    setVideoFileDialog(false);
    toast.success("Video uploaded successfully!");
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

      <div className="flex flex-wrap gap-2 mb-5">
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoSelect}
        />
        <Button
          onClick={() => photoInputRef.current?.click()}
          className="text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
        >
          📷 Upload Photo
        </Button>
        <input
          ref={videoInputRef}
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoFileSelect}
        />
        <Button
          onClick={() => videoInputRef.current?.click()}
          variant="outline"
          className="font-semibold border-2"
          style={{ borderColor: "#2e7d32", color: "#2e7d32" }}
        >
          📹 Upload Video File
        </Button>
        <Button
          onClick={() => setVideoDialog(true)}
          variant="outline"
          className="font-semibold border-2"
          style={{ borderColor: "#FFC107", color: "#1a1a2e" }}
        >
          🎬 Add YouTube URL
        </Button>
      </div>

      {/* Photo Title Dialog */}
      <Dialog open={photoDialog} onOpenChange={setPhotoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>📷 Add Photo Title</DialogTitle>
          </DialogHeader>
          {pendingFile && (
            <img
              src={pendingFile.dataUrl}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg mb-2"
            />
          )}
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-semibold">Photo Title</Label>
              <Input
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
                placeholder="Enter photo title..."
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleConfirmPhoto}
                className="flex-1 text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
              >
                Upload Photo
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setPhotoDialog(false);
                  setPendingFile(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video File Title Dialog */}
      <Dialog open={videoFileDialog} onOpenChange={setVideoFileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>📹 Add Video Title</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="h-20 rounded-lg bg-gray-900 flex items-center justify-center">
              <span className="text-3xl">🎬</span>
            </div>
            <div>
              <Label className="text-xs font-semibold">Video Title</Label>
              <Input
                value={videoFileTitle}
                onChange={(e) => setVideoFileTitle(e.target.value)}
                placeholder="Enter video title..."
                className="mt-1"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleConfirmVideoFile}
                className="flex-1 text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
              >
                Save Video
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setVideoFileDialog(false);
                  setPendingVideo(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* YouTube URL Dialog */}
      <Dialog open={videoDialog} onOpenChange={setVideoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎬 Add YouTube / Video URL</DialogTitle>
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
              />
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleAddVideo}
                className="flex-1 text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
              >
                Add Video
              </Button>
              <Button variant="outline" onClick={() => setVideoDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {galleryItems.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">🖼️</p>
          <p className="text-sm">
            No items yet. Upload a photo or add a video!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {galleryItems.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-card overflow-hidden animate-fade-in group relative"
              style={{ animationDelay: `${idx * 80}ms` }}
            >
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
              ) : item.src?.startsWith("data:") ? (
                <video
                  src={item.src}
                  className="h-28 w-full object-cover"
                  muted
                />
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
              <div className="p-2">
                <p className="text-xs font-semibold text-gray-800 leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">{item.date}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
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
