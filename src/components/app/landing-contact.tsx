import { Mail } from 'lucide-react'
import Link from 'next/link'

export function LandingContact() {
  return (
    <section className="border-t border-[var(--border)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Let&apos;s work together
          </h2>
          <p className="mt-3 text-lg text-[var(--text-muted)]">
            Ready to start your next project? We&apos;d love to hear from you.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3 shadow-sm">
            <Mail className="h-4 w-4 text-[var(--accent)]" />
            <Link
              href="mailto:hello@hortensia.agency"
              className="text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
            >
              hello@hortensia.agency
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
