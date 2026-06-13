import Link from 'next/link'
import { db } from '@/lib/db'
import { LandingHeader } from '@/components/app/landing-header'
import { LandingHero } from '@/components/app/landing-hero'
import { LandingLogos } from '@/components/app/landing-logos'
import { LandingFeatures } from '@/components/app/landing-features'
import { LandingPreview } from '@/components/app/landing-preview'
import { LandingTestimonials } from '@/components/app/landing-testimonials'
import { LandingFAQ } from '@/components/app/landing-faq'
import { LandingFooter } from '@/components/app/landing-footer'

export const revalidate = 3600

export default async function LandingPage() {
  let services: Array<{ id: string; name: string; description: string }> = []
  try {
    services = await db.service.findMany({ orderBy: { order: 'asc' } })
  } catch {}

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingLogos />
        <LandingFeatures />
        <LandingPreview />
        <LandingTestimonials />
        <LandingFAQ />
      </main>
      <LandingFooter />
    </div>
  )
}
