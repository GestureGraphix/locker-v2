'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { loginSchema, type LoginFormData } from '@/lib/validations/auth'
import { useUserStore } from '@/stores/user-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginFormProps {
  callbackUrl?: string
}

export function LoginForm({ callbackUrl = '/training' }: LoginFormProps) {
  const router = useRouter()
  const { login, isLoading, error, clearError } = useUserStore()

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    clearError()
    const success = await login(data.email, data.password)
    if (success) {
      router.push(callbackUrl)
      router.refresh()
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="athlete@example.com"
          autoComplete="email"
          {...form.register('email')}
          disabled={isLoading}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-600 dark:text-red-400">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...form.register('password')}
          disabled={isLoading}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-600 dark:text-red-400">{form.formState.errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}
