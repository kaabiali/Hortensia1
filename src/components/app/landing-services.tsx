import { Palette, Globe, Search, Share2 } from 'lucide-react'

const iconMap: Record<string, typeof Palette> = {
  'Brand Identity': Palette,
  'Web Development': Globe,
  'SEO & Analytics': Search,
  'Social Media': Share2,
}

interface Service {
  id: string
  name: string
  description: string
}

export function LandingServices({ services }: { services: Service[] }) {
  if (services.length === 0) return null

  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Our services
          </h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            From brand strategy to technical execution — we deliver results that matter.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.name] ?? Palette
            return (
              <div
                key={service.id}
                className="group rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all duration-200 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                  <Icon className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text)]">{service.name}</h3>
                <p className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
