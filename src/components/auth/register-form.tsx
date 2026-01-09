'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { registerSchema, type RegisterFormData } from '@/lib/validations/auth'
import { useUserStore } from '@/stores/user-store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface RegisterFormProps {
  callbackUrl?: string
}

export function RegisterForm({ callbackUrl = '/training' }: RegisterFormProps) {
  const router = useRouter()
  const { register: registerUser, isLoading, error, clearError } = useUserStore()

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'ATHLETE',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    clearError()
    const success = await registerUser(data.name, data.email, data.password, data.role)
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
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          autoComplete="name"
          {...form.register('name')}
          disabled={isLoading}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-red-600 dark:text-red-400">{form.formState.errors.name.message}</p>
        )}
      </div>

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
          placeholder="Create a password"
          autoComplete="new-password"
          {...form.register('password')}
          disabled={isLoading}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-600 dark:text-red-400">{form.formState.errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
          {...form.register('confirmPassword')}
          disabled={isLoading}
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
