'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/shared/ui'

import { subscribeNewsletter } from '../actions'
import { type NewsletterInput, newsletterSchema } from '../schemas/newsletter.schema'

interface NewsletterFormProps {
  variant?: 'light' | 'dark' | 'home'
}

export function NewsletterForm({ variant = 'light' }: NewsletterFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) })

  const onSubmit = handleSubmit(async (values) => {
    const res = await subscribeNewsletter(values)
    if (res.ok) {
      toast.success(res.message)
      reset()
    } else {
      toast.error(res.message)
    }
  })

  const dark = variant === 'dark'
  const home = variant === 'home'

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className={home ? 'flex flex-col gap-2 sm:flex-row sm:items-stretch' : 'flex gap-2'}>
        <input
          type="email"
          placeholder={home ? 'Your email address' : 'email@address.com'}
          aria-label="Email address"
          className={`flex-1 border px-4 font-sans text-sm outline-none focus:border-sage ${
            home
              ? 'h-12 rounded-md border-soft-clay bg-white text-ink placeholder:text-muted sm:rounded-l-md sm:rounded-r-none'
              : dark
                ? 'h-11 rounded-md border-cream/30 bg-transparent text-cream placeholder:text-cream/50'
                : 'h-11 rounded-md border-soft-clay bg-cream text-ink placeholder:text-muted'
          }`}
          {...register('email')}
        />
        {/* 蜜罐：视觉隐藏 */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register('company')}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant={dark ? 'sage' : home ? 'primary' : 'dark'}
          className={home ? 'h-12 px-8 label-caps sm:rounded-l-none sm:rounded-r-md' : undefined}
        >
          {isSubmitting ? '...' : home ? 'Subscribe' : 'Join'}
        </Button>
      </div>
      {errors.email && (
        <p className={`mt-2 text-xs text-danger ${home ? 'text-left' : ''}`}>
          {errors.email.message}
        </p>
      )}
    </form>
  )
}
