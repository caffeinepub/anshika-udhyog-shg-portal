import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CheckCircle, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Training } from "../../types";

export function TrainingManagement() {
  const { state, addTraining, deleteTraining, completeTraining } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [viewTraining, setViewTraining] = useState<Training | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    duration: "",
    maxParticipants: "20",
    instructor: "",
    location: "",
    status: "upcoming" as Training["status"],
  });

  const handleAdd = () => {
    if (!form.title || !form.startDate) {
      toast.error("Fill required fields");
      return;
    }
    addTraining({
      ...form,
      maxParticipants: Number.parseInt(form.maxParticipants) || 20,
    });
    toast.success("Training program added!");
    setAddOpen(false);
    setForm({
      title: "",
      description: "",
      startDate: "",
      duration: "",
      maxParticipants: "20",
      instructor: "",
      location: "",
      status: "upcoming",
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Training Programs
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-gray-900 font-bold text-xs"
              style={{ background: "#FFC107" }}
              data-ocid="training.open_modal_button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Training
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="training.dialog">
            <DialogHeader>
              <DialogTitle>Add Training Program</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  data-ocid="training.input"
                />
              </div>
              <div>
                <Label className="text-xs">Description</Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="text-xs"
                  data-ocid="training.textarea"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Start Date *</Label>
                  <Input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, startDate: e.target.value }))
                    }
                    data-ocid="training.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Duration</Label>
                  <Input
                    placeholder="30 days"
                    value={form.duration}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, duration: e.target.value }))
                    }
                    data-ocid="training.input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Max Participants</Label>
                  <Input
                    type="number"
                    value={form.maxParticipants}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        maxParticipants: e.target.value,
                      }))
                    }
                    data-ocid="training.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Status</Label>
                  <Select
                    value={form.status}
                    onValueChange={(v) =>
                      setForm((p) => ({
                        ...p,
                        status: v as Training["status"],
                      }))
                    }
                  >
                    <SelectTrigger data-ocid="training.select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Instructor</Label>
                <Input
                  value={form.instructor}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, instructor: e.target.value }))
                  }
                  data-ocid="training.input"
                />
              </div>
              <div>
                <Label className="text-xs">Location</Label>
                <Input
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  data-ocid="training.input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  className="flex-1 text-gray-900 font-bold"
                  style={{ background: "#FFC107" }}
                  data-ocid="training.submit_button"
                >
                  Add Program
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                  data-ocid="training.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4" data-ocid="training.list">
        {state.trainings.map((t, idx) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-card p-4"
            data-ocid={`training.item.${idx + 1}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-heading font-bold text-sm text-gray-800">
                  {t.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                    📅 {t.startDate}
                  </span>
                  <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                    ⏱ {t.duration}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full badge-${t.status === "upcoming" ? "pending" : t.status === "ongoing" ? "approved" : "completed"}`}
                  >
                    {t.status.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" /> {t.enrolledSHGs.length}/
                    {t.maxParticipants} enrolled
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />{" "}
                    {t.completedSHGs.length} completed
                  </span>
                </div>
              </div>
              <div className="flex gap-1 ml-2">
                <button
                  type="button"
                  onClick={() => setViewTraining(t)}
                  className="p-1.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100"
                  data-ocid={`training.edit_button.${idx + 1}`}
                >
                  <Users className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteTraining(t.id);
                    toast.success("Training deleted");
                  }}
                  className="p-1.5 rounded bg-red-50 text-red-500 hover:bg-red-100"
                  data-ocid={`training.delete_button.${idx + 1}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enrollments dialog */}
      {viewTraining && (
        <Dialog
          open={!!viewTraining}
          onOpenChange={() => setViewTraining(null)}
        >
          <DialogContent data-ocid="training.dialog">
            <DialogHeader>
              <DialogTitle>Enrollments - {viewTraining.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {viewTraining.enrolledSHGs.length === 0 && (
                <p className="text-sm text-gray-400">No enrollments yet</p>
              )}
              {viewTraining.enrolledSHGs.map((shgId) => {
                const shg = state.shgs.find((s) => s.id === shgId);
                const completed = viewTraining.completedSHGs.includes(shgId);
                return (
                  <div
                    key={shgId}
                    className="flex items-center justify-between bg-gray-50 rounded p-2"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {shg?.groupName || shgId}
                      </p>
                      <p className="text-xs text-gray-500">{shg?.leaderName}</p>
                    </div>
                    {completed ? (
                      <span className="text-xs badge-completed px-2 py-0.5 rounded-full">
                        COMPLETED
                      </span>
                    ) : (
                      <Button
                        size="sm"
                        className="text-xs text-gray-900 h-7"
                        style={{ background: "#FFC107" }}
                        onClick={() => {
                          completeTraining(viewTraining.id, shgId);
                          toast.success("Marked as completed!");
                        }}
                        data-ocid="training.confirm_button"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
            <Button
              variant="outline"
              onClick={() => setViewTraining(null)}
              data-ocid="training.close_button"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
