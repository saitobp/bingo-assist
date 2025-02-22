import clsx from 'clsx'
import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'rounded-md bg-black px-4 py-2 text-white',
        props.className,
      )}
    ></button>
  )
}
