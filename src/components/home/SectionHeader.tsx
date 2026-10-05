type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = dark ? "text-white" : "text-[#08184A]";
  const descColor = dark ? "text-white/75" : "text-slate-600";
  const eyebrowColor = dark ? "text-[#f0c56a]" : "text-[#D39B35]";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${eyebrowColor}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${titleColor}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base leading-relaxed sm:text-lg ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
