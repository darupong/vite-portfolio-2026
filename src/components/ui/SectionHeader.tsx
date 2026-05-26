interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ label, title, subtitle }: SectionHeaderProps) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase text-accent-secondary">
        {label}
      </p>
      <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="max-w-xl text-base leading-relaxed text-white/58">{subtitle}</p>
      )}
    </div>
  );
}
