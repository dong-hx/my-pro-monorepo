import * as React from 'react'

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 一个通用的类名合并工具
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  }

  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors focus:ring-2 focus:ring-offset-2',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  )
}
