import { SectionHeading } from '@/components/ui/section-heading'

const featureColumns = [
  {
    title: 'Page-first structure',
    description:
      'Page, layout, component, service va hook duoc tach rieng de team chia task de dang hon.',
  },
  {
    title: 'Query + Axios ready',
    description:
      'Da co QueryClient, folder service va axios client de bat dau noi API ngay.',
  },
  {
    title: 'Tailwind base',
    description:
      'Co san theme style, utility classes va responsive layout de vao lam UI nhanh.',
  },
]

const startupChecklist = [
  {
    title: 'Them route moi trong src/pages',
    description: 'Tao folder page, dang ky trong router va gan layout phu hop.',
  },
  {
    title: 'Tach API call vao src/services',
    description:
      'Moi module API nen co file rieng de giu component tap trung vao UI.',
  },
  {
    title: 'Dung custom hook cho logic lap lai',
    description:
      'TanStack Query hoac logic fetch chung nen duoc boc lai de page gon hon.',
  },
]

export function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-700">
            React + TypeScript Starter
          </span>

          <div className="space-y-4">
            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Skeleton frontend da san sang cho team chia page, component,
              route va service.
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Day la bo khung de bat dau sprint nhanh hon: route co san,
              provider da setup, API layer da co cho backend.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.35)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
            Startup checklist
          </p>
          <div className="mt-5 space-y-4">
            {startupChecklist.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Team Workflow"
          title="Cau truc giu codebase de tim, de review va de mo rong."
          description="Khi tang so page hoac so nguoi trong team, viec tach theo vai tro se de quy uoc hon la de tat ca vao cung mot cho."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {featureColumns.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
