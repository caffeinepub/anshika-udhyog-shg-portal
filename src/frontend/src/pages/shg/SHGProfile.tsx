import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export function SHGProfile() {
  const { state, currentUser, updateSHG } = useApp();
  const shg = state.shgs.find((s) => s.id === currentUser?.id);
  const [editing, setEditing] = useState(false);
  const [mobile, setMobile] = useState(shg?.mobile || "");
  const [address, setAddress] = useState(shg?.address || "");

  if (!shg) return null;

  const handleSave = () => {
    updateSHG({ ...shg, mobile, address });
    toast.success("Profile updated!");
    setEditing(false);
  };

  const branch = state.branches.find((b) => b.id === shg.branchId);

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        My Profile
      </h1>
      <div className="bg-white rounded-xl shadow-card p-4 mb-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center text-2xl"
            style={{ background: "#FFF8E1" }}
          >
            👥
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-gray-900">
              {shg.groupName}
            </h2>
            <p className="text-sm text-gray-600">{shg.leaderName}</p>
            <span
              className={`text-xs px-2 py-0.5 rounded-full badge-${shg.status} font-semibold`}
            >
              {shg.status.toUpperCase()}
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditing(!editing);
              setMobile(shg.mobile);
              setAddress(shg.address);
            }}
            className="ml-auto p-2 rounded-lg hover:bg-gray-100"
            data-ocid="profile.edit_button"
          >
            <Pencil className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["SHG ID", shg.id.toUpperCase()],
            ["Referral Code", shg.referralCode || "N/A"],
            ["Members", shg.memberCount],
            ["Branch", branch?.name || "N/A"],
            ["Joined", shg.joinedDate],
            ["Wallet Balance", `₹${shg.walletBalance.toLocaleString()}`],
          ].map(([k, v]) => (
            <div key={k as string} className="bg-gray-50 rounded-lg p-2">
              <p className="text-[10px] text-gray-500">{k}</p>
              <p className="font-semibold text-xs text-gray-800">{v}</p>
            </div>
          ))}
        </div>

        {editing ? (
          <div className="mt-4 space-y-3">
            <div>
              <Label className="text-xs">Mobile Number</Label>
              <Input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                data-ocid="profile.input"
              />
            </div>
            <div>
              <Label className="text-xs">Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                data-ocid="profile.input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                className="flex-1 text-gray-900 font-bold"
                style={{ background: "#FFC107" }}
                data-ocid="profile.save_button"
              >
                <Save className="h-4 w-4 mr-1" /> Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditing(false)}
                data-ocid="profile.cancel_button"
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-[10px] text-gray-500">Mobile</p>
              <p className="font-semibold text-xs text-gray-800">
                {shg.mobile}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <p className="text-[10px] text-gray-500">Address</p>
              <p className="font-semibold text-xs text-gray-800">
                {shg.address}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
