import { BingoCardConfig } from '@/types/bingoTypes'
import { clsx } from 'clsx'

type BingoCardProps = {
  card: BingoCardConfig
}

export function BingoCard(props: BingoCardProps) {
  return (
    <div
      role='listitem'
      aria-label={`Card ${props.card.id}`}
      className=' flex  w-64 flex-col rounded-md border border-gray-300 bg-gray-50 px-4 py-2 shadow-md'
    >
      <div
        className='mb-2 w-full border-b-2 border-gray-200 pb-2 text-sm font-medium text-gray-400'
        aria-label={`Card id ${props.card.id}`}
      >
        Id: {props.card.id}
      </div>

      <div className='flex w-full flex-row justify-between pb-2 text-center font-bold text-gray-600'>
        <div className='w-8'>B</div>
        <div className='w-8'>I</div>
        <div className='w-8'>N</div>
        <div className='w-8'>G</div>
        <div className='w-8'>O</div>
      </div>

      {props.card.numbers.map((row, i) => (
        <div
          key={`card-${props.card.id}-row-${i}`}
          className='mb-2 flex w-full flex-row justify-between'
        >
          {row.map((col, j) => {
            if (i === 2 && j === 2) {
              return (
                <div
                  key={`card-${props.card.id}-col-${j}-row-${i}`}
                  className='flex h-8 w-8 items-center justify-center rounded-full text-center text-gray-600'
                >
                  ⚙️
                </div>
              )
            }
            return (
              <div
                aria-label={`Card ${props.card.id} number col ${j} row ${i}`}
                key={`card-${props.card.id}-col-${j}-row-${i}`}
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-center text-gray-600',
                  {
                    'bg-green-200': col.checked,
                  },
                )}
              >
                {col.number}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
