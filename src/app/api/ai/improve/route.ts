import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import Groq from 'groq-sdk'
import { auth } from '@/lib/auth'
import { logger } from '@/lib/logger'

const inputSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
})

const SYSTEM_PROMPT =
  'You are a project scoping assistant for a digital agency.\n' +
  'Rewrite the client\'s rough request into a structured brief.\n' +
  'Respond ONLY with a valid JSON object matching this exact shape:\n' +
  '{ suggestedTitle: string, refinedDescription: string, scopeBullets: string[] }\n' +
  'scopeBullets must contain 3 to 5 items. No markdown, no preamble, no explanation.'

function buildUserPrompt(title: string, description: string): string {
  return `Title: ${title}\n\nDescription: ${description}`
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized', message: 'Authentication required' }, { status: 401 })
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey || apiKey === 'your-groq-api-key-here') {
    logger.error('ai_improve_failure', { errorCode: 'missing_key', message: 'GROQ_API_KEY is not configured' })
    return NextResponse.json(
      { error: 'ai_unavailable', message: 'AI service temporarily unavailable' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_json', message: 'Request body must be valid JSON' },
      { status: 400 }
    )
  }

  const parsed = inputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation_error', details: parsed.error.issues },
      { status: 400 }
    )
  }

  const { title, description } = parsed.data
  logger.info('ai_improve_request', { titleLength: title.length, descriptionLength: description.length })

  const groq = new Groq({ apiKey })

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 15_000)

  try {
    const completion = await groq.chat.completions.create(
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(title, description) },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      },
      { signal: controller.signal }
    )

    clearTimeout(timeoutId)

    const raw = completion.choices[0]?.message?.content
    if (!raw) {
      throw new Error('Empty response from Groq')
    }

    const parsedJson: Record<string, unknown> = JSON.parse(raw)

    const suggestedTitle =
      typeof parsedJson.suggestedTitle === 'string' ? parsedJson.suggestedTitle : title
    const refinedDescription =
      typeof parsedJson.refinedDescription === 'string' ? parsedJson.refinedDescription : description
    const scopeBullets = Array.isArray(parsedJson.scopeBullets)
      ? parsedJson.scopeBullets.filter((b): b is string => typeof b === 'string').slice(0, 5)
      : ['Scope to be defined']

    const durationMs = Date.now() - startTime
    logger.info('ai_improve_success', { durationMs })

    return NextResponse.json({ suggestedTitle, refinedDescription, scopeBullets })
  } catch (err) {
    clearTimeout(timeoutId)

    const durationMs = Date.now() - startTime
    const message = err instanceof Error ? err.message : 'Unknown error'

    if (err instanceof Error && err.name === 'AbortError') {
      logger.error('ai_improve_failure', { errorCode: 'timeout', message: 'Groq did not respond within 15 seconds' })
    } else {
      logger.error('ai_improve_failure', { errorCode: 'groq_error', message })
    }

    return NextResponse.json(
      { error: 'ai_unavailable', message: 'AI service temporarily unavailable' },
      { status: 503 }
    )
  }
}
