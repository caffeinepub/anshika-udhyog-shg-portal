import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, CheckCircle, MapPin, User } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export function TrainingPage() {
  const { state, currentUser, enrollTraining } = useApp();
  const shgId = currentUser?.id || "";

  const handleEnroll = (trainingId: string) => {
    enrollTraining(trainingId, shgId);
    toast.success("Enrolled in training program!");
  };

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Training Programs
      </h1>
      <div className="space-y-4" data-ocid="training.list">
        {state.trainings.map((t, idx) => {
          const isEnrolled = t.enrolledSHGs.includes(shgId);
          const isFull = t.enrolledSHGs.length >= t.maxParticipants;
          return (
            <div
              key={t.id}
              className="bg-white rounded-xl shadow-card p-4"
              data-ocid={`training.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center"
                      style={{ background: "#E3F2FD" }}
                    >
                      <BookOpen className="h-4 w-4 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-gray-800">
                        {t.title}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full badge-${t.status === "upcoming" ? "pending" : t.status === "ongoing" ? "approved" : "completed"}`}
                      >
                        {t.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{t.description}</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" /> {t.startDate}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <User className="h-3 w-3" /> {t.instructor}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 col-span-2">
                      <MapPin className="h-3 w-3" /> {t.location}
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                      <span>
                        {t.enrolledSHGs.length}/{t.maxParticipants} enrolled
                      </span>
                      <span>{t.duration}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          background: "#FFC107",
                          width: `${(t.enrolledSHGs.length / t.maxParticipants) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                {isEnrolled ? (
                  <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
                    <CheckCircle className="h-4 w-4" /> Already Enrolled
                  </div>
                ) : isFull ? (
                  <p className="text-xs text-red-500">Training is full</p>
                ) : (
                  <Button
                    onClick={() => handleEnroll(t.id)}
                    className="w-full font-bold text-gray-900 text-xs"
                    style={{ background: "#FFC107" }}
                    data-ocid={`training.primary_button.${idx + 1}`}
                  >
                    JOIN Training
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MyTraining() {
  const { state, currentUser } = useApp();
  const shgId = currentUser?.id || "";
  const myTrainings = state.trainings.filter((t) =>
    t.enrolledSHGs.includes(shgId),
  );

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        My Training
      </h1>
      {myTrainings.length === 0 ? (
        <div
          className="text-center py-12 text-gray-400"
          data-ocid="my_training.empty_state"
        >
          <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p>You haven't enrolled in any training yet</p>
        </div>
      ) : (
        <div className="space-y-4" data-ocid="my_training.list">
          {myTrainings.map((t, idx) => {
            const completed = t.completedSHGs.includes(shgId);
            return (
              <div
                key={t.id}
                className="bg-white rounded-xl shadow-card p-4"
                data-ocid={`my_training.item.${idx + 1}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${completed ? "bg-green-50" : "bg-blue-50"}`}
                  >
                    {completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-bold text-sm">
                      {t.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {t.instructor} • {t.startDate}
                    </p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${completed ? "badge-completed" : "badge-pending"}`}
                      >
                        {completed ? "COMPLETED" : "IN PROGRESS"}
                      </span>
                    </div>
                  </div>
                </div>
                {completed && (
                  <div className="mt-3 pt-3 border-t">
                    <Button
                      className="w-full text-xs font-bold text-gray-900"
                      style={{ background: "#FFC107" }}
                      onClick={() => {
                        const text = `CERTIFICATE OF COMPLETION\n\nThis is to certify that\n${state.shgs.find((s) => s.id === shgId)?.groupName}\nhas successfully completed\n${t.title}\n\nDate: ${new Date().toLocaleDateString()}\nAnshika Udhyog SHG Portal`;
                        const blob = new Blob([text], { type: "text/plain" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `certificate-${t.title.replace(/\s+/g, "-")}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      data-ocid={`my_training.primary_button.${idx + 1}`}
                    >
                      🏅 Download Certificate
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
