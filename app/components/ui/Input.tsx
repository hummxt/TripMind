"use client";

import React from "react";

const baseClasses =
  "w-full bg-white/5 dark:bg-black/40 border border-white/10 rounded-card px-6 py-5 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-bold text-base md:text-lg group-hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className"> {
  className?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", icon, ...props }, ref) => {
    return (
      <div className="relative group">
        {icon && (
          <span className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-xl opacity-50 text-primary pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`${baseClasses} ${icon ? "pr-12 md:pr-14" : ""} ${className}`.trim()}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
