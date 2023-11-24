import { useBingoStore } from '@/store/bingoStore'
import { Title } from './Title'

export function WinnerCardIndicator() {
  const winnerCard = useBingoStore((state) => state.winnerCard)

  function handleWinStatus() {
    if (winnerCard === null) {
      return 'None'
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

    if (winnerCard.type === 'full-card') {
      return `${winnerCard.id} - Full`
    }

    return 'Error'
  }

  return (
    <Title size='md' aria-label='Win status' className='w-full text-center'>
      Win: <span className='font-normal'>{handleWinStatus()}</span>
    </Title>
  )
}