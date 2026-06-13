'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { requestSchema, requestUpdateSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'

export async function getRequests() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const requests = await db.projectRequest.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return { data: requests }
}

export async function getRequest(id: string) {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const request = await db.projectRequest.findUnique({
    where: { id, userId: session.user.id },
  })

  if (!request) return { error: 'Request not found' }

  return { data: request }
}

export async function createRequest(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    budget: formData.get('budget'),
    status: formData.get('status'),
  }

  const parsed = requestSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const request = await db.projectRequest.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  })

  return { data: request }
}

export async function updateRequest(id: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const raw = {
    title: formData.get('title'),
    description: formData.get('description'),
    budget: formData.get('budget'),
    status: formData.get('status'),
  }

  const parsed = requestUpdateSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const existing = await db.projectRequest.findUnique({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: 'Request not found' }

  const request = await db.projectRequest.update({
    where: { id, userId: session.user.id },
    data: parsed.data,
  })

  return { data: request }
}

export async function updateRequestStatus(id: string, status: 'pending' | 'in_progress' | 'done') {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const parsed = requestUpdateSchema.shape.status.safeParse(status)
  if (!parsed.success) return { error: 'Invalid status' }

  const existing = await db.projectRequest.findUnique({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: 'Request not found' }

  const request = await db.projectRequest.update({
    where: { id, userId: session.user.id },
    data: { status: parsed.data },
  })

  return { data: request }
}

export async function deleteRequest(id: string) {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const existing = await db.projectRequest.findUnique({
    where: { id, userId: session.user.id },
  })
  if (!existing) return { error: 'Request not found' }

  await db.projectRequest.delete({
    where: { id, userId: session.user.id },
  })

  return { data: { success: true } }
}

export async function getServices() {
  const session = await auth()
  if (!session?.user?.id) return { error: 'Unauthorized' }

  const services = await db.service.findMany({
    orderBy: { order: 'asc' },
  })

  return { data: services }
}
