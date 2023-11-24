import { BingoCard } from '@/components/BingoCard'
import { DrawnNumbers } from '@/components/DrawnNumbers'
import { WinnerCardIndicator } from '@/components/WinnerCardIndicator'
import { useBingoStore } from '@/store/bingoStore'
import { BingoCardConfig } from '@/types/bingoTypes'
import { useEffect, useState } from 'react'

const initialCard: BingoCardConfig = {
  id: '',
  numbers: [
    [
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
    ],
    [
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
    ],
    [
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
    ],
    [
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
    ],
    [
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
      { number: '', checked: false },
    ],
  ],
}

export function Bingo() {
  const [newCard, setNewCard] = useState<BingoCardConfig>(initialCard)
  const [cards, setCards] = useState<BingoCardConfig[]>([])

  const [drawnNumber, setDrawnNumber] = useState('')

  useEffect(() => {
    const savedCards = localStorage.getItem('cards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold'>Bingo Assist</h1>

      <WinnerCardIndicator />

      <label htmlFor='drawn-number'>Drawn number</label>
      <input
        role='textbox'
        type='text'
        name='drawn-number'
        id='drawn-number'
        value={drawnNumber}
        onChange={(e) => {
          setDrawnNumber(e.target.value)
        }}
      />

      <button
        onClick={() => {
          if (!drawnNumber) return
          const drawNumbers = useBingoStore.getState().drawnNumbers

          setDrawnNumber('')

          useBingoStore.setState({
            drawnNumbers: [...drawNumbers, Number(drawnNumber)],
          })

          const newCards = cards.map((card) => {
            const updatedNumbers = card.numbers.map((row) => {
              return row.map((number) => {
                if (number.number === drawnNumber) {
                  return { ...number, checked: true }
                }
                return number
              })
            })
            return { ...card, numbers: updatedNumbers }
          })

          setCards(newCards)

          newCards.forEach((card) => {
            // Check rows
            card.numbers.forEach((row) => {
              if (row.every((number) => number.checked)) {
                useBingoStore.setState({
                  winnerCard: { ...card, type: 'row' },
                })
              }
            })

            // Check columns
            for (let i = 0; i < card.numbers.length; i++) {
              if (card.numbers.every((row) => row[i].checked)) {
                useBingoStore.setState({
                  winnerCard: { ...card, type: 'column' },
                })
              }
            }

            // Check corners
            if (
              card.numbers[0][0].checked &&
              card.numbers[0][4].checked &&
              card.numbers[4][0].checked &&
              card.numbers[4][4].checked
            ) {
              useBingoStore.setState({
                winnerCard: { ...card, type: 'corners' },
              })
            }

            // Check diagonals
            if (
              card.numbers[0][0].checked &&
              card.numbers[1][1].checked &&
              card.numbers[3][3].checked &&
              card.numbers[4][4].checked
            ) {
              useBingoStore.setState({
                winnerCard: { ...card, type: 'diagonal' },
              })
            }

            if (
              card.numbers[0][4].checked &&
              card.numbers[1][3].checked &&
              card.numbers[3][1].checked &&
              card.numbers[4][0].checked
            ) {
              useBingoStore.setState({
                winnerCard: { ...card, type: 'diagonal' },
              })
            }

            // Win full card
            if (
              card.numbers.every((row) => row.every((number) => number.checked))
            ) {
              useBingoStore.setState({
                winnerCard: { ...card, type: 'full-card' },
              })
            }
          })
        }}
      >
        Save drawn number
      </button>

      <button
        onClick={() => {
          localStorage.setItem('cards', JSON.stringify(cards))
        }}
      >
        Save to local storage
      </button>

      <button
        onClick={() => {
          localStorage.clear()
        }}
      >
        Clear local storage
      </button>

      <DrawnNumbers />

      <h1>Saved Cards</h1>

      <div className='flex flex-wrap justify-center gap-4'>
        {cards.map((card) => (
          <BingoCard key={card.id} card={card} />
        ))}
      </div>

      <button
        className='border border-gray-300'
        onClick={() => {
          const newCards = [...cards, { ...newCard }]
          setCards(JSON.parse(JSON.stringify(newCards)))

          // Clear the new card
          setNewCard({
            id: '',
            numbers: [
              [
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
              ],
              [
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
              ],
              [
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
              ],
              [
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
              ],
              [
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
                { number: '', checked: false },
              ],
            ],
          })
        }}
      >
        Add bingo card
      </button>

      <h1 className='text-lg font-bold'>New Bingo Card</h1>

      <label htmlFor='new-card-id'>New card id</label>
      <input
        aria-label='New card id'
        role='textbox'
        type='text'
        name='new-card-id'
        id='new-card-id'
        value={newCard.id}
        onChange={(e) => {
          setNewCard({ ...newCard, id: e.target.value })
        }}
      />

      <div className='flex max-w-md flex-col border border-gray-200'>
        <div className='flex w-full flex-row justify-between font-bold'>
          <div className='w-8 text-center'>B</div>
          <div className='w-8 text-center'>I</div>
          <div className='w-8 text-center'>N</div>
          <div className='w-8 text-center'>G</div>
          <div className='w-8 text-center'>O</div>
        </div>

        {newCard.numbers.map((row, i) => (
          <div
            key={`row-${i}}`}
            className='flex w-full flex-row justify-between'
          >
            {row.map((_, j) => (
              <input
                aria-label={`New card number col ${i} row ${j}`}
                role='textbox'
                name={`new-card-number-input-${i}-${j}`}
                key={`col-${j}`}
                type='text'
                className='w-8 border border-gray-300 text-center'
                value={newCard.numbers[i][j].number}
                disabled={i === 2 && j === 2}
                onChange={(e) => {
                  const newNumbers = [...newCard.numbers]
                  newNumbers[i][j].number = e.target.value
                  setNewCard({ ...newCard, numbers: newNumbers })
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
