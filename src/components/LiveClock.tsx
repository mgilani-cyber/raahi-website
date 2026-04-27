import { useState, useEffect } from "react";

export const LiveClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert to Toronto time
  const torontoTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Toronto" }));
  const day  = torontoTime.getDay();  // 0=Sun, 1=Mon, 2=Tue … 6=Sat
  const hour = torontoTime.getHours();
  const timeStr = torontoTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Toronto",
  });

  // Correct hours:
  // Mon:         always closed
  // Tue–Thu:     4PM–midnight
  // Fri–Sat:     4PM–2AM (carries into early Sun/Mon morning)
  // Sun:         4PM–midnight + carry-over from Sat (12AM–2AM)
  let isOpen = false;
  const isMonday = day === 1;

  if (isMonday) {
    isOpen = false;
  } else if (day === 0) {
    // Sunday: open 12AM–2AM (Sat late close) OR 4PM–midnight
    isOpen = hour < 2 || (hour >= 16 && hour < 24);
  } else if (day === 5 || day === 6) {
    // Fri & Sat: open 4PM–2AM (wraps past midnight)
    isOpen = hour >= 16 || hour < 2;
  } else {
    // Tue–Thu: open 4PM–midnight
    isOpen = hour >= 16 && hour < 24;
  }

  return (
    <div className="mt-4 space-y-1">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className={`w-2 h-2 rounded-full ${isOpen ? "bg-green-500" : "bg-red-500"} animate-pulse shrink-0`} />
        <span className="font-body">{timeStr} Toronto</span>
        <span className="text-xs">— {isOpen ? "Open Now" : "Closed"}</span>
      </div>
      {isMonday && (
        <p className="font-body text-xs italic" style={{ color: "#8C7A5E" }}>
          We're closed today — see you Tuesday.
        </p>
      )}
    </div>
  );
};
