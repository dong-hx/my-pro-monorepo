import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 通用类名合并工具：clsx 处理条件类名，tailwind-merge 解决冲突类覆盖
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
