import clsx from 'clsx'
import { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & {
  label: string
}

export function Input(props: InputProps) {
  return (
    <div
      className={clsx(
        'flex flex-col justify-center outline-none focus-within:outline-none focus-within:ring-0 active:outline-none',
        props.className,
      )}
    >
      <label htmlFor={props.id} className='text-center text-sm text-gray-400'>
        {props.label}
      </label>
      <input {...props} className='border-b border-gray-300' />
    </div>
  )
}
