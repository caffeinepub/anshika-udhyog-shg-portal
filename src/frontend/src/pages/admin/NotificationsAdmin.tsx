import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export function NotificationsAdmin() {
  const { state, sendNotification } = useApp();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetRole, setTargetRole] = useState("all");

  const handleSend = () => {
    if (!title || !message) {
      toast.error("Fill all fields");
      return;
    }
    sendNotification({ title, message, targetRole });
    toast.success("Notification sent!");
    setTitle("");
    setMessage("");
    setTargetRole("all");
  };

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Notifications
      </h1>

      {/* Send form */}
      <div className="bg-white rounded-xl shadow-card p-4 mb-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3 flex items-center gap-2">
          <Send className="h-4 w-4" /> Send New Notification
        </h3>
        <div className="space-y-3">
          <div>
            <Label className="text-xs">Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Notification title"
              data-ocid="notification.input"
            />
          </div>
          <div>
            <Label className="text-xs">Message</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter notification message..."
              className="text-xs"
              data-ocid="notification.textarea"
            />
          </div>
          <div>
            <Label className="text-xs">Send To</Label>
            <Select value={targetRole} onValueChange={setTargetRole}>
              <SelectTrigger data-ocid="notification.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="shg">SHG Members Only</SelectItem>
                <SelectItem value="staff">Staff Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleSend}
            className="w-full text-gray-900 font-bold"
            style={{ background: "#FFC107" }}
            data-ocid="notification.submit_button"
          >
            <Send className="h-4 w-4 mr-2" /> Send Notification
          </Button>
        </div>
      </div>

      {/* Notification history */}
      <h3 className="font-semibold text-sm text-gray-700 mb-2">
        Sent Notifications ({state.notifications.length})
      </h3>
      <div className="space-y-2" data-ocid="notification.list">
        {state.notifications.map((n, idx) => (
          <div
            key={n.id}
            className="bg-white rounded-xl shadow-card p-3"
            data-ocid={`notification.item.${idx + 1}`}
          >
            <div className="flex items-start gap-3">
              <div
                className="h-8 w-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "#FFF8E1" }}
              >
                <Bell className="h-4 w-4 text-yellow-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-xs text-gray-800">
                    {n.title}
                  </p>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={{ background: "#E3F2FD", color: "#1565C0" }}
                  >
                    {n.targetRole === "all"
                      ? "All"
                      : n.targetRole.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.date}</p>
              </div>
            </div>
          </div>
        ))}
        {state.notifications.length === 0 && (
          <div
            className="text-center py-8 text-gray-400"
            data-ocid="notification.empty_state"
          >
            No notifications sent
          </div>
        )}
      </div>
    </div>
  );
}
