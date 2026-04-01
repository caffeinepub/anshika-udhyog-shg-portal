import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export function MLMIncome() {
  const { state, updateMLMCommission } = useApp();
  const [editing, setEditing] = useState<number | null>(null);
  const [commValue, setCommValue] = useState("");

  const handleUpdate = (level: number) => {
    const val = Number.parseFloat(commValue);
    if (Number.isNaN(val) || val < 0 || val > 100) {
      toast.error("Enter valid commission %");
      return;
    }
    updateMLMCommission(level, val);
    toast.success("Commission updated!");
    setEditing(null);
  };

  const levelColors = ["#FFC107", "#4CAF50", "#2196F3"];
  const levelBg = ["#FFF8E1", "#E8F5E9", "#E3F2FD"];

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-2">
        Multi-Level Income
      </h1>
      <p className="text-sm text-gray-500 mb-4">
        Manage MLM commission structure for SHG referral income.
      </p>

      {/* Level cards */}
      <div className="grid gap-4 mb-6">
        {state.mlmLevels.map((level, idx) => (
          <div
            key={level.level}
            className="bg-white rounded-xl shadow-card p-4"
            data-ocid={`mlm.item.${idx + 1}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: levelColors[idx] || "#9E9E9E" }}
                >
                  L{level.level}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm">
                    Level {level.level}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {level.members.length} members
                  </p>
                </div>
              </div>
              <div className="text-right">
                {editing === level.level ? (
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-20 h-8 text-xs"
                      value={commValue}
                      onChange={(e) => setCommValue(e.target.value)}
                      placeholder="%"
                      data-ocid="mlm.input"
                    />
                    <Button
                      size="sm"
                      className="h-8 text-xs text-gray-900 font-bold"
                      style={{ background: "#FFC107" }}
                      onClick={() => handleUpdate(level.level)}
                      data-ocid="mlm.save_button"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => setEditing(null)}
                      data-ocid="mlm.cancel_button"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: levelColors[idx] }}
                    >
                      {level.commission}%
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 text-xs"
                      onClick={() => {
                        setEditing(level.level);
                        setCommValue(String(level.commission));
                      }}
                      data-ocid={`mlm.edit_button.${idx + 1}`}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Members */}
            <div
              className="flex flex-wrap gap-1"
              style={{
                background: levelBg[idx] || "#F5F5F5",
                borderRadius: 8,
                padding: 8,
              }}
            >
              {level.members.map((shgId) => {
                const shg = state.shgs.find((s) => s.id === shgId);
                return (
                  <span
                    key={shgId}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-white border text-gray-700"
                  >
                    {shg?.groupName || shgId}
                  </span>
                );
              })}
              {level.members.length === 0 && (
                <span className="text-xs text-gray-400">
                  No members at this level
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Income summary */}
      <div className="bg-white rounded-xl shadow-card p-4">
        <h3 className="font-heading font-bold text-sm mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" /> Income Tree Summary
        </h3>
        <div className="space-y-2">
          {state.mlmLevels.map((level) => (
            <div
              key={level.level}
              className="flex items-center justify-between text-sm"
            >
              <span className="flex items-center gap-2 text-gray-700">
                <Users className="h-3.5 w-3.5" /> Level {level.level}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-xs">
                  {level.members.length} members
                </span>
                <span className="font-bold text-green-700">
                  {level.commission}% commission
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t text-xs text-gray-500">
          <p>
            Total participating SHGs:{" "}
            <strong>
              {state.mlmLevels.reduce((a, l) => a + l.members.length, 0)}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
}
