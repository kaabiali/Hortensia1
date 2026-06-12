'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signupSchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

type FormValues = z.infer<typeof signupSchema>

async function signupUser(data: FormValues) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export function SignupForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    },
  })

  async function onSubmit(data: FormValues) {
    setError(null)

    const result = await signupUser(data)

    if (result.error) {
      setError(result.error)
      return
    }

    const signInResult = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (signInResult?.error) {
      setError('Account created but sign-in failed. Please try logging in.')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="At least 8 characters" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-sm text-[var(--red)]">{error}</p>
        )}

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Already have an account?{' '}
          <a href="/login" className="text-[var(--accent)] hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </Form>
  )
}
