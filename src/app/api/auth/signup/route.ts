import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signupSchema } from '@/lib/validations'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { email, password, name } = parsed.data

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    const hashed = await bcrypt.hash(password, 12)

    await db.user.create({
      data: { email, password: hashed, name: name ?? null },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
