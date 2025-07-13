import { BingoCard } from '@/components/BingoCard'
import { Button } from '@/components/Button'
import { DrawnNumbers } from '@/components/DrawnNumbers'
import { Text } from '@/components/Text'
import { WinnerCardIndicator } from '@/components/WinnerCardIndicator'
import { useBingoStore } from '@/store/bingoStore'
import { BingoCardConfig } from '@/types/bingoTypes'
import { useEffect, useState } from 'react'

export function Bingo() {
  const [cards, setCards] = useState<BingoCardConfig[]>([])
  const [drawnNumber, setDrawnNumber] = useState('')
  const [quickAdd, setQuickAdd] = useState('')

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

  function handleQuickAdd() {
    const name = quickAdd.split(',')[0]
    const n = quickAdd
      .split(',')
      .slice(1)
      .filter((v) => v !== '' && !isNaN(Number(v)))
      .map((v) => ({ number: v.trim(), checked: false }))

    if (n.length !== 24) {
      alert(`Invalid number of input, expected 24 numbers but got ${n.length}.`)
      return
    }

    const newCard = {
      id: name,
      win: false,
      numbers: [
        [n[0], n[1], n[2], n[3], n[4]],
        [n[5], n[6], n[7], n[8], n[9]],
        [n[10], n[11], { number: '', checked: true }, n[12], n[13]],
        [n[14], n[15], n[16], n[17], n[18]],
        [n[19], n[20], n[21], n[22], n[23]],
      ],
    }

    const newCards = [...cards, { ...newCard }]
    setCards(JSON.parse(JSON.stringify(newCards)))
    setQuickAdd('')
  }

  return (
    <div className='flex w-full flex-col items-center justify-center p-4'>
      <Text size='lg' className='mb-4 w-full text-center'>
        Bingo Assist
      </Text>

      <div className='flex w-full flex-col gap-2'>
        <label>Drawn Number</label>
        <input
          className='h-8 rounded-md p-2 text-neutral-800 shadow-md outline-neutral-300 placeholder:text-neutral-300 focus:outline-none'
          placeholder='Add a new bingo card quickly'
          value={quickAdd}
          onChange={(e) => setDrawnNumber(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              saveDrawnNumber()
            }
          }}
        />
      </div>

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

      <div className='mt-4 flex w-96 items-end gap-2'>
        <div className='flex w-full flex-col gap-2'>
          <label>Quick Add</label>
          <input
            className='h-8 rounded-md p-2 text-neutral-800 shadow-md outline-neutral-300 placeholder:text-neutral-300 focus:outline-none'
            placeholder='Add a new bingo card quickly'
            value={quickAdd}
            onChange={(e) => setQuickAdd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleQuickAdd()
              }
            }}
          />
          <p className='text-xs  text-neutral-300'>
            Ex: name, number1, number2...
          </p>
        </div>

        <Button
          className='rounded-md bg-black px-4 py-2 text-white'
          onClick={handleQuickAdd}
        >
          Add
        </Button>
      </div>
    </div>
  )
}
