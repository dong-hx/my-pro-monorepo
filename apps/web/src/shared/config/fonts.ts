import { Inter, Manrope } from 'next/font/google'

// 正文：Inter
export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// 标题：Manrope（Serene Pet Lifestyle display/headline）
export const fontDisplay = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})
