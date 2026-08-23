'use client'

import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:cursor-not-allowed select-none',
          {
            // Primary (#4F46E5 Default -> #4338CA Hover -> #3730A3 Pressed -> 3px focus ring)
            'bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] focus:ring-4 focus:ring-[#EEF2FF] focus:outline-none disabled:bg-[#CBD5E1] disabled:text-white disabled:opacity-90':
              variant === 'primary',

            // Outline (#E2E8F0 border -> #CBD5E1 on hover -> #0F172A text)
            'border border-[#E2E8F0] text-[#0F172A] bg-white hover:bg-[#F9FAFB] hover:border-[#CBD5E1] active:bg-[#F1F5F9] focus:ring-4 focus:ring-[#EEF2FF] focus:outline-none disabled:border-[#E2E8F0] disabled:text-[#CBD5E1] disabled:bg-[#F1F5F9]':
              variant === 'outline',

            // Ghost (Text primary -> #EEF2FF light hover)
            'text-[#4F46E5] hover:bg-[#EEF2FF] active:bg-[#E0E7FF] focus:ring-4 focus:ring-[#EEF2FF] focus:outline-none disabled:text-[#CBD5E1]':
              variant === 'ghost',

            // Dark (#0F172A / #1E293B)
            'bg-[#0F172A] text-white hover:bg-[#1E293B] active:bg-[#020617] focus:ring-4 focus:ring-[#E2E8F0] focus:outline-none disabled:bg-[#CBD5E1]':
              variant === 'dark',
          },
          {
            'text-xs px-3 py-1.5': size === 'sm',
            'text-sm px-4 py-2.5': size === 'md',
            'text-base px-6 py-3': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
