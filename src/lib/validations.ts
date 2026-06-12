import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1).optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const requestSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().min(1, 'Description is required').max(2000),
  budget: z.coerce.number().positive('Budget must be positive'),
  status: z.enum(['pending', 'in_progress', 'done']),
})

export const requestUpdateSchema = requestSchema.partial()
