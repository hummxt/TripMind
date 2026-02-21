"use client";

import { useState, useRef, useEffect } from "react";
import Input from "./ui/Input";

export interface PlaceOption {
  label: string;
  value: string;
  city?: string;
  country?: string;
}

interface PlaceSearchInputProps {
  value: string;
  onChange: (value: string, option?: PlaceOption) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  type?: "places" | "countries" | "all";
  required?: boolean;
  icon?: React.ReactNode;
  "data-testid"?: string;
}

export default function PlaceSearchInput({
  value,
  onChange,
  placeholder = "Search and select...",
  className = "",
  inputClassName = "",
  type = "places",
  required = false,
  icon,
}: PlaceSearchInputProps) {
  const [query, setQuery] = useState(value);
  const [options, setOptions] = useState<PlaceOption[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setOptions([]);
      setOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/places?q=${encodeURIComponent(query)}&type=${type}`
        );
        const data = await res.json();
        const items: PlaceOption[] = [];
        if (data.places?.length) {
          items.push(...data.places);
        }
        if (data.countries?.length && (type === "countries" || type === "all")) {
          data.countries.forEach((c: { name: string }) => {
            if (!items.some((p) => p.value === c.name)) {
              items.push({ label: c.name, value: c.name, country: c.name });
            }
          });
        }
        setOptions(items.slice(0, 30));
        setOpen(items.length > 0);
      } catch {
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, type]);

  const select = (opt: PlaceOption) => {
    onChange(opt.value, opt);
    setQuery(opt.value);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    onChange(v);
    if (!v) setOpen(false);
  };

  const handleFocus = () => {
    if (options.length > 0 && query.length >= 2) setOpen(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        icon={icon}
        className={inputClassName}
      />
      {open && (
        <ul className="absolute top-full left-0 right-0 mt-2 z-50 max-h-64 overflow-y-auto rounded-2xl border border-white/10 bg-neutral-900/95 dark:bg-[#1a1a1a] shadow-xl backdrop-blur-xl py-2 animate-in fade-in slide-in-from-top-2">
          {loading ? (
            <li className="px-6 py-4 text-sm text-white/50">Searching...</li>
          ) : options.length === 0 ? (
            <li className="px-6 py-4 text-sm text-white/50">
              No results. Type at least 2 characters.
            </li>
          ) : (
            options.map((opt, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => select(opt)}
                  className="w-full text-left px-6 py-3 hover:bg-white/5 text-white/90 font-medium transition-colors"
                >
                  {opt.label}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
