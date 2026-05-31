type SectionHeadingProps = {
  eyebrow: string
  title: string
  description: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-600">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="text-base leading-7 text-slate-600">{description}</p>
    </div>
  )
}
