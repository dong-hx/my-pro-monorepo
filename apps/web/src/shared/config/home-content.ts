/** 首页静态营销图（本地 public，避免外链失效或优化失败） */
const homeImage = (file: string) => `/images/home/${file}` as const

export const HOME_HERO = {
  eyebrow: 'For a life well lived',
  title: 'Elevated Living for Your Constant Companion.',
  description:
    'Sustainable materials and timeless design for the pets who share your home — because luxury should extend to every member of the family.',
  primaryCta: { label: 'Shop best sellers', href: '/collections/all' },
  secondaryCta: { label: 'Our story', href: '/about' },
  image: {
    src: homeImage('hero.jpg'),
    alt: 'Golden retriever resting comfortably in a cozy home',
  },
} as const

export const HOME_FEATURES = [
  {
    title: 'Safe Materials',
    description: 'Non-toxic, sustainable materials.',
    icon: 'leaf' as const,
  },
  {
    title: 'Fast Shipping',
    description: 'Direct from our house to yours.',
    icon: 'truck' as const,
  },
  {
    title: 'Vet Approved',
    description: 'Designed with pet health in mind.',
    icon: 'cross' as const,
  },
  {
    title: 'Easy Returns',
    description: '30-day satisfaction guarantee.',
    icon: 'package' as const,
  },
] as const

export const HOME_CATEGORY_BANNERS = [
  {
    title: 'For Dogs',
    cta: 'Shop dogs',
    href: '/collections/dogs',
    image: {
      src: homeImage('dogs.jpg'),
      alt: 'French bulldog among greenery',
    },
  },
  {
    title: 'For Cats',
    cta: 'Shop cats',
    href: '/collections/cats',
    image: {
      src: homeImage('cats.jpg'),
      alt: 'White cat beside a water fountain',
    },
  },
] as const

export const HOME_LIFESTYLE = [
  {
    label: 'Playtime',
    href: '/search?q=play',
    image: {
      src: homeImage('playtime.jpg'),
      alt: 'Dogs playing outdoors',
    },
  },
  {
    label: 'Grooming',
    href: '/search?q=groom',
    image: {
      src: homeImage('grooming.jpg'),
      alt: 'Pet grooming essentials',
    },
  },
  {
    label: 'Walking',
    href: '/search?q=walk',
    image: {
      src: homeImage('walking.jpg'),
      alt: 'Dog on a walk with owner',
    },
  },
  {
    label: 'Wellness',
    href: '/collections/wellness',
    image: {
      src: homeImage('cats.jpg'),
      alt: 'Cat in a calm home setting',
    },
  },
] as const

export const HOME_PHILOSOPHY = {
  eyebrow: 'Our philosophy',
  title: 'Born from a love for design and animals.',
  description:
    'We believe the objects we surround ourselves with — and those we choose for our pets — should be beautiful, intentional, and built to last. Every Zyvera piece is designed in New York and crafted with care.',
  cta: { label: 'Read our story', href: '/about' },
  badge: { line1: 'Est.', line2: '2024 NYC' },
  image: {
    src: homeImage('brand-philosophy.png'),
    alt: 'Golden retriever and companion silhouetted on a porch at golden hour',
  },
} as const

export const HOME_TESTIMONIALS = [
  {
    quote:
      'The quality is unmatched. My picky cat actually uses the bed we bought — that alone is worth five stars.',
    name: 'Sarah M.',
    location: 'Los Angeles, CA',
    initials: 'SM',
  },
  {
    quote:
      'Finally, pet products that look as good in our living room as they feel for our dog. Beautiful design.',
    name: 'James L.',
    location: 'Brooklyn, NY',
    initials: 'JL',
  },
  {
    quote:
      'Fast shipping, thoughtful packaging, and products that clearly prioritize pet safety. Highly recommend.',
    name: 'Emily R.',
    location: 'Austin, TX',
    initials: 'ER',
  },
] as const

export const HOME_NEWSLETTER = {
  title: 'Join Our Community',
  description:
    'Get 10% off your first order when you subscribe to curated care tips and new arrivals.',
} as const
