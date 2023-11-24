import { useBingoStore } from '@/store/bingoStore'
import { Title } from './Title'

export function DrawnNumbers() {
  const drawnNumbers = useBingoStore((state) => state.drawnNumbers)
  const sortedNumbers = drawnNumbers.sort((a, b) => a - b)

  return (
    <div className='flex w-full flex-col items-center'>
      <Title size='md' className='w-full text-center'>
        Draw numbers
      </Title>

      <div className='mt-2 flex w-full max-w-md justify-center'>
        {sortedNumbers.map((number, i) => (
          <span
            role='list-item'
            aria-label={`Drawn numbers list item ${i + 1}`}
            key={`draw-number-${number}`}
            className='color-gray-600 w-8 text-center'
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  )
}
