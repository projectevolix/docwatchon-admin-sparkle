import { Film } from "lucide-react";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <Film className="h-8 w-8 text-primary" />
        <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse" />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg text-foreground">DocWatchOn</span>
          <span className="text-xs text-muted-foreground -mt-1">Admin Panel</span>
        </div>
      )}
    </div>
  );
}