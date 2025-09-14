import * as React from "react"
import { cn } from "../../utils/helpers"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Switch({ checked, onCheckedChange, className, ...props }: SwitchProps) {
  return (
    <label className={cn("relative inline-flex items-center cursor-pointer", className)}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
      <div
        className={cn("w-11 h-6 flex items-center rounded-full p-1 transition-colors",
          checked ? "bg-blue-600" : "bg-gray-300"
        )}
      >
        <div
          className={cn("bg-white w-4 h-4 rounded-full shadow-md transform transition-transform",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </label>
  )
}
