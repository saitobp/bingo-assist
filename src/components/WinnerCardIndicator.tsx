import { useBingoStore } from '@/store/bingoStore'
import { Text } from './Text'

export function WinnerCardIndicator() {
  const winnerCard = useBingoStore((state) => state.winnerCard)

  function handleWinStatus() {
    if (winnerCard === null) {
      return 'None'
    }

    if (winnerCard.type === 'full-card') {
      return `${winnerCard.id} - Full`
    }

    if (winnerCard.type === 'column') {
      return `${winnerCard.id} - Vertical`
    }

    if (winnerCard.type === 'row') {
      return `${winnerCard.id} - Horizontal`
    }

    if (winnerCard.type === 'diagonal') {
      return `${winnerCard.id} - Diagonal`
    }

    if (winnerCard.type === 'corners') {
      return `${winnerCard.id} - Corners`
    }

    return 'Error'
  }

  return (
    <Text size='md' aria-label='Win status' className='mt-2 w-full text-center'>
      Win: <span className='font-normal'>{handleWinStatus()}</span>
    </Text>
  )
}
