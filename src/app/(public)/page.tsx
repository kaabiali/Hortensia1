import Link from 'next/link'
import { db } from '@/lib/db'
import { Flower2, PenSquare, ArrowRight, BarChart3, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/app/theme-toggle'

export const revalidate = 3600

async function getServices() {
  try {
    const services = await db.service.findMany({ orderBy: { order: 'asc' } })
    return services
  } catch {
    return []
  }
}

const steps = [
  {
    icon: PenSquare,
    title: 'Request a service',
    description: 'Describe what you need, set a budget, and submit.',
  },
  {
    icon: BarChart3,
    title: 'We get to work',
    description: 'Status updates as progress happens.',
  },
  {
    icon: Eye,
    title: 'See it in your portal',
    description: 'Real-time visibility into your project.',
  },
]

export default async function LandingPage() {
  const services = await getServices()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <Flower2 className="h-5 w-5 text-[var(--accent)]" />
            <span className="text-sm font-semibold">Hortensia</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
          <div
            className="absolute inset-0 -z-10 opacity-[0.03]"
            style={{
              backgroundImage:
                'radial-gradient(var(--text) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
              Your projects, tracked.
              <br />
              Your agency, transparent.
            </h1>
            <p className="mt-4 text-lg text-[var(--text-muted)] max-w-2xl mx-auto">
              A private portal where you see exactly what&apos;s happening with your work.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>

        {services.length > 0 && (
          <section className="border-t border-[var(--border)] py-16">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-center text-2xl font-semibold text-[var(--text)]">
                Services
              </h2>
              <p className="mt-2 text-center text-sm text-[var(--text-muted)]">
                Everything we offer to help your business grow.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service: { id: string; name: string; description: string; order: number }) => (
                  <div
                    key={service.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-5 transition-all duration-150 hover:border-[var(--border-hover)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  >
                    <h3 className="font-medium text-[var(--text)]">
                      {service.name}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-[var(--border)] py-16">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-center text-2xl font-semibold text-[var(--text)]">
              How it works
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <div key={step.title} className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                      <Icon className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <div className="mb-2 text-xs font-medium text-[var(--accent)]">
                      Step {i + 1}
                    </div>
                    <h3 className="font-medium text-[var(--text)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-6">
        <div className="mx-auto flex items-center justify-between px-6 max-w-6xl">
          <div className="flex items-center gap-2">
            <Flower2 className="h-4 w-4 text-[var(--accent)]" />
            <span className="text-xs text-[var(--text-faint)]">
              Hortensia Agency
            </span>
          </div>
          <p className="text-xs text-[var(--text-faint)]">
            &copy; {new Date().getFullYear()} Hortensia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
