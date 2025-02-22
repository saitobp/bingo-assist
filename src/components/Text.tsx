import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

type TextProps = { children: ReactNode } & (
  | ({ size: 'lg' } & ComponentProps<'h1'>)
  | ({ size: 'md' } & ComponentProps<'h2'>)
)

export function Text(props: TextProps) {
  if (props.size === 'lg') {
    return (
      <h1
        {...props}
        className={clsx(props.className, 'text-lg font-bold text-neutral-800')}
      >
        {props.children}
      </h1>
    )
  }

  if (props.size === 'md') {
    return (
      <h2
        {...props}
        className={clsx(props.className, 'text-md font-bold text-neutral-800')}
      >
        {props.children}
      </h2>
    )
  }

  console.error('Invalid text size')

  return null
}
