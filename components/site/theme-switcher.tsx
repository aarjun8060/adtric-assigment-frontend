"use client";

import { useEditorStore } from "@/store/theme-store";
import { defaultPresets } from "@/utils/theme-presets";
import { getPresetThemeStyles } from "@/utils/theme-preset-helper";
import { cn } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";

export function SiteThemeSwitcher({ className }: { className?: string }) {
  const { themeState, applyThemePreset } = useEditorStore();
  const { setTheme } = useTheme();
  const presetNames = Object.keys(defaultPresets);
  const active = themeState.preset || "manthan-noida";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <div className="inline-flex items-center p-0.5 rounded-full bg-white/10">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={cn(
            "font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors",
            themeState.currentMode === "light"
              ? "bg-primary text-primary-foreground font-bold"
              : "text-white/70 hover:text-white",
          )}
        >
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={cn(
            "font-sans text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full transition-colors",
            themeState.currentMode === "dark"
              ? "bg-primary text-primary-foreground font-bold"
              : "text-white/70 hover:text-white",
          )}
        >
          Dark
        </button>
      </div>
      <div className="hidden lg:flex items-center gap-1 max-w-[280px] overflow-x-auto pb-0.5">
        {presetNames.slice(0, 8).map((name) => {
          const styles = getPresetThemeStyles(name);
          const mode = themeState.currentMode;
          const primary = styles[mode].primary;
          const secondary = styles[mode].secondary;
          return (
            <button
              key={name}
              type="button"
              title={defaultPresets[name]?.label || name}
              onClick={() => applyThemePreset(name)}
              className={cn(
                "shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium transition-all",
                active === name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-white/20 bg-white/5 text-white/80 hover:bg-white/15",
              )}
            >
              <span className="flex gap-0.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm border border-white/30"
                  style={{ background: primary }}
                />
                <span
                  className="h-2.5 w-2.5 rounded-sm border border-white/30"
                  style={{ background: secondary }}
                />
              </span>
              <span className="max-w-[72px] truncate">
                {defaultPresets[name]?.label || name}
              </span>
            </button>
          );
        })}
      </div>
      <label className="lg:hidden">
        <span className="sr-only">Theme preset</span>
        <select
          className="rounded-full bg-white/10 text-white text-[10px] px-2 py-1 border border-white/20"
          value={active}
          onChange={(e) => applyThemePreset(e.target.value)}
        >
          {presetNames.map((name) => (
            <option key={name} value={name} className="text-foreground">
              {defaultPresets[name]?.label || name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
