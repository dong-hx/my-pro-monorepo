import { NewsletterForm } from '@/features/newsletter'
import { HOME_NEWSLETTER } from '@/shared/config/home-content'

export function HomeNewsletter() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center lg:px-8 lg:py-20">
      <h2 className="section-title">{HOME_NEWSLETTER.title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
        {HOME_NEWSLETTER.description}
      </p>
      <div className="mx-auto mt-8 max-w-xl">
        <NewsletterForm variant="home" />
      </div>
    </section>
  )
}
