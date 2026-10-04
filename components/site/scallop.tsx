import { cn } from "@/lib/utils";

export function CloudScallop({
  className,
  fill = "var(--background)",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 w-full overflow-hidden leading-none pointer-events-none",
        flip ? "-top-px rotate-180" : "-bottom-px",
        className,
      )}
      aria-hidden
    >
      <svg
        className="relative block w-full h-10 lg:h-14"
        preserveAspectRatio="none"
        viewBox="0 0 1440 90"
        style={{ color: fill }}
      >
        <path
          className="fill-current"
          d="M0,32 C120,68 240,68 360,42 C480,16 600,16 720,40 C840,64 960,68 1080,44 C1200,20 1320,24 1440,48 L1440,90 L0,90 Z"
        />
      </svg>
    </div>
  );
}

export function PinkSquiggle({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-full h-4 text-primary", className)}
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 320 18"
      aria-hidden
    >
      <path
        d="M3 14C50 4 80 15 130 9C180 3 220 16 270 8C290 5 305 12 317 10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4.5"
      />
    </svg>
  );
}

export function HeroDoodles() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute top-10 left-[7%] w-16 h-16 text-accent opacity-20 -rotate-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 18h6m-4 3h2m-5-8a6 6 0 118 0c-.8 1.1-1.5 2-1.5 3.5h-5C8.5 15 7.8 14.1 7 13z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg
        className="absolute top-20 right-[10%] w-20 h-20 text-primary/40 opacity-30 rotate-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 3l18 9-18 9 4-9-4-9zm4 9h14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute top-36 left-[38%] text-primary/30 opacity-40 font-serif text-4xl">
        +
      </div>
      <div className="absolute top-16 right-[30%] text-accent/40 opacity-40 font-serif text-3xl">
        ★
      </div>
      <div className="absolute bottom-24 right-[15%] text-primary-foreground/20 font-serif text-2xl">
        ✦
      </div>
    </div>
  );
}
