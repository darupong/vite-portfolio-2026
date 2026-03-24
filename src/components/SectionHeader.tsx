interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-3">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
      {subtitle && (
        <p className="text-[#666] text-base max-w-xl">{subtitle}</p>
      )}
    </div>
  );
}
