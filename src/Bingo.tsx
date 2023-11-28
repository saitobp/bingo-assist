import { BingoCard } from '@/components/BingoCard'
import { Button } from '@/components/Button'
import { DrawnNumbers } from '@/components/DrawnNumbers'
import { Input } from '@/components/Input'
import { Text } from '@/components/Text'
import { WinnerCardIndicator } from '@/components/WinnerCardIndicator'
import { useBingoStore } from '@/store/bingoStore'
import { BingoCardConfig } from '@/types/bingoTypes'
import { useEffect, useState } from 'react'

const initialCard: BingoCardConfig = {
  id: '',
  win: false,
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

  function saveDrawnNumber() {
    if (!drawnNumber) return
    const drawNumbers = useBingoStore.getState().drawnNumbers

    setDrawnNumber('')

    useBingoStore.setState({
      drawnNumbers: [...drawNumbers, Number(drawnNumber)],
    })

    let newCards = cards.map((card) => {
      const updatedNumbers = card.numbers.map((row) => {
        return row.map((number) => {
          if (number.number === drawnNumber || number.number === '') {
            return { ...number, checked: true }
          }
          return number
        })
      })
      return { ...card, numbers: updatedNumbers }
    })

    newCards.forEach((card) => {
      // Win full card
      if (card.numbers.every((row) => row.every((number) => number.checked))) {
        useBingoStore.setState({
          winnerCard: { ...card, type: 'full-card' },
        })

        return
      }

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
    })

    newCards = newCards.map((card) => {
      if (card.id === useBingoStore.getState().winnerCard?.id) {
        return { ...card, win: true }
      }

      return card
    })

    setCards(newCards)
  }

  function saveToLocalStorage() {
    localStorage.setItem('cards', JSON.stringify(cards))
  }

  function clearLocalStorage() {
    localStorage.clear()
  }

  function addBingoCard() {
    const newCards = [...cards, { ...newCard }]
    setCards(JSON.parse(JSON.stringify(newCards)))

    // Clear the new card
    setNewCard({
      id: '',
      win: false,
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
          { number: '', checked: true },
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
  }

  return (
    <div className='flex w-full flex-col items-center justify-center p-4'>
      <Text size='lg' className='mb-4 w-full text-center'>
        Bingo Assist
      </Text>

      <Input
        label='Drawn number'
        role='textbox'
        type='text'
        name='drawn-number'
        id='drawn-number'
        className='w-72'
        value={drawnNumber}
        onChange={(e) => setDrawnNumber(e.target.value)}
      />

      <div className='my-2 flex gap-4'>
        <Button onClick={saveDrawnNumber}>Save Drawn Number</Button>
        <Button onClick={saveToLocalStorage}>Save to local storage</Button>
        <Button onClick={clearLocalStorage}>Clear local storage</Button>
      </div>

      <DrawnNumbers />
      <WinnerCardIndicator />

      <Text size='md' className='my-2 w-full text-center'>
        Saved Cards
      </Text>

      <div className='flex flex-wrap justify-center gap-4'>
        {cards.map((card) => (
          <BingoCard key={card.id} card={card} />
        ))}
      </div>

      <Button onClick={addBingoCard} className='my-2'>
        Add bingo card
      </Button>

      <Text size='md' className='w-full text-center'>
        New Bingo Card
      </Text>

      <Input
        label='New Card Id'
        aria-label='New card id'
        role='textbox'
        type='text'
        name='new-card-id'
        id='new-card-id'
        value={newCard.id}
        className='mb-2'
        onChange={(e) => setNewCard({ ...newCard, id: e.target.value })}
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
