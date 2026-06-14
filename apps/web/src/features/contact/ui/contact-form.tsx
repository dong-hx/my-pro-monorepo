'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/shared/ui'

import { submitContact } from '../actions'
import { type ContactInput, contactSchema } from '../schemas/contact.schema'

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) })

  const onSubmit = handleSubmit(async (values) => {
    const res = await submitContact(values)
    if (res.ok) {
      toast.success(res.message)
      reset()
    } else {
      toast.error(res.message)
    }
  })

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Name
        </label>
        <input
          id="name"
          className="mt-1.5 h-11 w-full rounded-md border border-soft-clay bg-cream px-4 text-sm outline-none focus:border-sage"
          {...register('name')}
        />
        {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-1.5 h-11 w-full rounded-md border border-soft-clay bg-cream px-4 text-sm outline-none focus:border-sage"
          {...register('email')}
        />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-1.5 w-full rounded-md border border-soft-clay bg-cream px-4 py-3 text-sm outline-none focus:border-sage"
          {...register('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-danger">{errors.message.message}</p>}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
