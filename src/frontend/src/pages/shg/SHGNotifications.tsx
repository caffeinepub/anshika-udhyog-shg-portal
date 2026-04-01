import { Button } from "@/components/ui/button";
import { Bell, CheckCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function SHGNotifications() {
  const { state, markNotificationRead } = useApp();

  const myNotifs = state.notifications.filter(
    (n) => n.targetRole === "all" || n.targetRole === "shg",
  );

  const markAllRead = () => {
    for (const n of myNotifs.filter((n2) => !n2.read)) {
      markNotificationRead(n.id);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Notifications
        </h1>
        {myNotifs.some((n) => !n.read) && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllRead}
            className="text-xs"
            data-ocid="notification.primary_button"
          >
            <CheckCheck className="h-3.5 w-3.5 mr-1" /> Mark All Read
          </Button>
        )}
      </div>

      <div className="space-y-3" data-ocid="notification.list">
        {myNotifs.map((n, idx) => (
          <div
            key={n.id}
            className={`bg-white rounded-xl shadow-card p-4 border-l-4 ${n.read ? "opacity-70" : ""}`}
            style={{ borderLeftColor: n.read ? "#e0e0e0" : "#FFC107" }}
            data-ocid={`notification.item.${idx + 1}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${n.read ? "bg-gray-100" : "bg-yellow-50"}`}
              >
                <Bell
                  className={`h-4 w-4 ${n.read ? "text-gray-400" : "text-yellow-600"}`}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm font-semibold ${n.read ? "text-gray-500" : "text-gray-800"}`}
                  >
                    {n.title}
                  </p>
                  {!n.read && (
                    <button
                      type="button"
                      onClick={() => markNotificationRead(n.id)}
                      className="text-[10px] text-blue-500 hover:text-blue-700"
                      data-ocid={`notification.confirm_button.${idx + 1}`}
                    >
                      Mark read
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                <p className="text-[10px] text-gray-400 mt-1">{n.date}</p>
              </div>
            </div>
          </div>
        ))}
        {myNotifs.length === 0 && (
          <div
            className="text-center py-12 text-gray-400"
            data-ocid="notification.empty_state"
          >
            <Bell className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}
