interface TickerBarProps {
  messages: string[];
}

export function TickerBar({ messages }: TickerBarProps) {
  if (messages.length === 0) return null;
  const text = messages.join(" │ ");
  return (
    <div
      style={{
        background: "#1a1a2e",
        color: "#FFC107",
        padding: "4px 0",
        overflow: "hidden",
        fontSize: "12px",
      }}
    >
      <div className="ticker-inner">{text}</div>
    </div>
  );
}
