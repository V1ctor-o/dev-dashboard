import React from "react";

export function LoadingSpinner({ size = "md", className = "" }) {
  const sizeMap = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-4",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`
          animate-spin
          rounded-full
          border-solid
          border-slate-300 dark:border-slate-600
          border-t-blue-500 dark:border-t-blue-400
          ${sizeMap[size]}
        `}
      />
    </div>
  );
}
