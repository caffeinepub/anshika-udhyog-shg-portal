import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useApp } from "../../context/AppContext";

const QR_CELLS = [
  { id: "q0", v: 1 },
  { id: "q1", v: 0 },
  { id: "q2", v: 1 },
  { id: "q3", v: 0 },
  { id: "q4", v: 1 },
  { id: "q5", v: 0 },
  { id: "q6", v: 1 },
  { id: "q7", v: 1 },
  { id: "q8", v: 0 },
];

export function IDCard() {
  const { state, currentUser } = useApp();
  const shg = state.shgs.find((s) => s.id === currentUser?.id);
  const branch = shg ? state.branches.find((b) => b.id === shg.branchId) : null;

  if (!shg) return null;

  const handleDownload = () => {
    const content = `ANSHIKA UDHYOG SHG PORTAL\n=====================================\nID CARD\n\nSHG ID: ${shg.id.toUpperCase()}\nGroup Name: ${shg.groupName}\nLeader: ${shg.leaderName}\nMobile: ${shg.mobile}\nAddress: ${shg.address}\nBranch: ${branch?.name || "N/A"}\nStatus: ${shg.status.toUpperCase()}\nJoined: ${shg.joinedDate}\nMembers: ${shg.memberCount}\nReferral Code: ${shg.referralCode || "N/A"}\n\nEmpowering Business, Embracing Nature`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `id-card-${shg.groupName.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        ID Card
      </h1>

      <div
        className="id-card max-w-sm mx-auto p-5 text-white"
        style={{ minHeight: 220 }}
      >
        <div className="flex items-center gap-3 mb-4 relative z-10">
          <img
            src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover border-2"
            style={{ borderColor: "#FFC107" }}
          />
          <div>
            <p
              className="font-heading font-bold text-sm leading-tight"
              style={{ color: "#FFC107" }}
            >
              ANSHIKA UDHYOG
            </p>
            <p className="text-[10px] opacity-75">SHG Portal • Official ID</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] opacity-60">ID</p>
            <p className="text-xs font-bold" style={{ color: "#FFC107" }}>
              {shg.id.toUpperCase()}
            </p>
          </div>
        </div>
        <div
          className="h-px mb-4 relative z-10"
          style={{
            background: "linear-gradient(to right, #FFC107, transparent)",
          }}
        />
        <div className="flex gap-4 relative z-10">
          <div
            className="h-16 w-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
            style={{
              background: "rgba(255,193,7,0.15)",
              border: "1px solid rgba(255,193,7,0.3)",
            }}
          >
            👥
          </div>
          <div className="flex-1">
            <h2 className="font-heading font-bold text-base leading-tight">
              {shg.groupName}
            </h2>
            <p className="text-xs opacity-75 mt-0.5">
              Leader: {shg.leaderName}
            </p>
            <p className="text-xs opacity-75">{shg.mobile}</p>
            <p className="text-[10px] opacity-60 mt-1 leading-tight">
              {shg.address}
            </p>
          </div>
        </div>
        <div
          className="flex items-center justify-between mt-4 pt-3 relative z-10"
          style={{ borderTop: "1px solid rgba(255,193,7,0.2)" }}
        >
          <div>
            <p className="text-[10px] opacity-60">Branch</p>
            <p className="text-xs font-semibold">{branch?.name || "N/A"}</p>
          </div>
          <div className="text-center">
            <p className="text-[10px] opacity-60">Members</p>
            <p className="text-xs font-semibold">{shg.memberCount}</p>
          </div>
          <div
            className="h-10 w-10 rounded flex items-center justify-center"
            style={{ background: "white" }}
          >
            <div className="grid grid-cols-3 gap-0.5">
              {QR_CELLS.map((cell) => (
                <div
                  key={cell.id}
                  className="h-2 w-2 rounded-sm"
                  style={{ background: cell.v ? "#1a1a2e" : "white" }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="mt-2 relative z-10">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold badge-${shg.status}`}
          >
            {shg.status.toUpperCase()}
          </span>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full max-w-sm mx-auto mt-4 flex items-center justify-center font-bold text-gray-900"
        style={{ background: "#FFC107", display: "flex" }}
        data-ocid="idcard.primary_button"
      >
        <Download className="h-4 w-4 mr-2" /> Download ID Card
      </Button>
    </div>
  );
}
