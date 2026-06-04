import { AlertTriangle } from "lucide-react";

interface ErrorTileProps {
  message?: string;
}

export function ErrorTile({ message = "Could not load courses from the database." }: ErrorTileProps) {
  return (
    <div className="col-span-full rounded-2xl border border-red-500/20 bg-red-500/5 p-8 flex flex-col items-center justify-center gap-3 text-center">
      <AlertTriangle size={28} className="text-red-400/60" />
      <p className="text-white/50 text-sm max-w-xs">{message}</p>
      <p className="text-white/25 text-xs">
        Check your Supabase environment variables and table setup.
      </p>
    </div>
  );
}
