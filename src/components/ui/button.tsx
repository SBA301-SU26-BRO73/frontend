import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variantClasses = {
  ghost:
    'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50',
  primary:
    'border border-green-600 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50',
  danger:
    'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50',
} as const

type Variant = keyof typeof variantClasses

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  icon?: ReactNode
  children?: ReactNode
}

export function Button({
  variant = 'ghost',
  icon,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
