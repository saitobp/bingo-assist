import clsx from 'clsx'
import { ComponentProps, ReactNode } from 'react'

type TitleProps = { children: ReactNode } & (
  | ({ size: 'lg' } & ComponentProps<'h1'>)
  | ({ size: 'md' } & ComponentProps<'h2'>)
)

export function Title(props: TitleProps) {
  if (props.size === 'lg') {
    return (
      <h1 {...props} className={clsx(props.className, 'text-gray-600')}>
        {props.children}
      </h1>
    )
  }

  if (props.size === 'md') {
    return (
      <h2
        {...props}
        className={clsx(props.className, 'text-md font-bold text-gray-600')}
      >
        {props.children}
      </h2>
    )
  }

  console.error('Invalid title size')

  return null
}
