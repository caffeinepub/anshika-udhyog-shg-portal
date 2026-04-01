import { Gift, Trophy } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function RewardsPage() {
  const { state, currentUser } = useApp();
  const shgId = currentUser?.id || "";

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Rewards
      </h1>

      <div className="space-y-4" data-ocid="rewards.list">
        {state.rewards.map((r, idx) => {
          const isWinner = r.winnerSHGId === shgId;
          return (
            <div
              key={r.id}
              className={`rounded-xl shadow-card p-4 ${isWinner ? "border-2" : "bg-white"}`}
              style={
                isWinner
                  ? { background: "#FFF8E1", borderColor: "#FFC107" }
                  : {}
              }
              data-ocid={`rewards.item.${idx + 1}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center text-3xl shrink-0"
                  style={{
                    background: r.type === "lucky_draw" ? "#FFF3CD" : "#E8F5E9",
                  }}
                >
                  {r.type === "lucky_draw" ? "🎰" : "🏆"}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-600" />
                    <span className="font-heading font-bold text-sm">
                      {r.prize}
                    </span>
                    {isWinner && (
                      <span className="text-xs bg-yellow-400 text-gray-900 font-bold px-2 py-0.5 rounded-full">
                        🎉 YOU WON!
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {r.type === "lucky_draw"
                      ? "🎰 Lucky Draw"
                      : "🏆 Best Performer"}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    Winner:{" "}
                    <span className="text-green-700">{r.winnerName}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {r.description}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1">
                    {r.announcedDate}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        {state.rewards.length === 0 && (
          <div
            className="text-center py-12 text-gray-400"
            data-ocid="rewards.empty_state"
          >
            <Gift className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No rewards announced yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
