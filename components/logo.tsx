import React from "react";

interface LogoProps {
  size?: number;
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 40, showText = true, className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#9333ea", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#6366f1", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#a855f7", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#60a5fa", stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle cx="60" cy="60" r="58" fill="url(#logoGradient)" opacity="0.1" />

        {/* Main Chat Bubble */}
        <path
          d="M 30 45 Q 30 30 45 30 L 85 30 Q 100 30 100 45 L 100 65 Q 100 80 85 80 L 50 80 L 35 95 L 35 80 Q 30 80 30 65 Z"
          fill="url(#logoGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />

        {/* Language Symbol - "L" */}
        <text
          x="50"
          y="63"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="white"
        >
          L
        </text>

        {/* Sparkle/AI indicator */}
        <circle cx="82" cy="38" r="4" fill="#fbbf24" opacity="0.9" />
        <circle cx="78" cy="42" r="2.5" fill="#fbbf24" opacity="0.7" />
        <circle cx="86" cy="42" r="2.5" fill="#fbbf24" opacity="0.7" />

        {/* Small accent dots */}
        <circle cx="45" cy="55" r="2" fill="white" opacity="0.6" />
        <circle cx="53" cy="55" r="2" fill="white" opacity="0.6" />
        <circle cx="61" cy="55" r="2" fill="white" opacity="0.6" />
      </svg>

      {showText && (
        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          LinguaChat
        </span>
      )}
    </div>
  );
}
