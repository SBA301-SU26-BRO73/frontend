interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div>
      {subtitle && (
        <span className="text-primary font-label-sm uppercase tracking-widest">
          {subtitle}
        </span>
      )}
      <h2 className="font-headline-lg text-headline-lg">{title}</h2>
    </div>
  );
}