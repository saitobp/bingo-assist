import clsx from 'clsx'
import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'border border-gray-400 bg-gray-50 p-2 text-sm text-gray-600',
        props.className,
      )}
    ></button>
  )
}
