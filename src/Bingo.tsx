import { useEffect, useState } from 'react'

type BingoNumber = {
  number: string
  checked: boolean
}

type BingoCard = {
  id: string
  numbers: BingoNumber[][]
}

const initialCard: BingoCard = {
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
  const [newCard, setNewCard] = useState<BingoCard>(initialCard)

  const [cards, setCards] = useState<BingoCard[]>([])

  const [drawnNumber, setDrawnNumber] = useState('')
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([])

  useEffect(() => {
    const savedCards = localStorage.getItem('cards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  return (
    <>
      <h1 className='font-bold text-xl'>Bingo Assist</h1>

      <h2>Win: None</h2>

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

          setDrawnNumber('')

          setDrawnNumbers([...drawnNumbers, Number(drawnNumber)])

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
                console.log('Win row')
              }
            })

            // Check columns
            for (let i = 0; i < card.numbers.length; i++) {
              if (card.numbers.every((row) => row[i].checked)) {
                console.log('Win column')
              }
            }

            // Check corners
            if (
              card.numbers[0][0].checked &&
              card.numbers[0][4].checked &&
              card.numbers[4][0].checked &&
              card.numbers[4][4].checked
            ) {
              console.log('Win corners')
            }

            // Check diagonals
            if (
              card.numbers[0][0].checked &&
              card.numbers[1][1].checked &&
              card.numbers[3][3].checked &&
              card.numbers[4][4].checked
            ) {
              console.log('Win diagonal')
            }

            if (
              card.numbers[0][4].checked &&
              card.numbers[1][3].checked &&
              card.numbers[3][1].checked &&
              card.numbers[4][0].checked
            ) {
              console.log('Win diagonal')
            }

            // Win full card
            if (
              card.numbers.every((row) => row.every((number) => number.checked))
            ) {
              console.log('Win full card')
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

      <h1>Draw numbers</h1>

      <div>
        {drawnNumbers.sort().map((number, i) => (
          <span
            role='list-item'
            aria-label={`Drawn numbers list item ${i + 1}`}
            key={`draw-number-${number}`}
          >
            {number}
          </span>
        ))}
      </div>

      <h1>Saved Cards</h1>

      {cards.map((card) => (
        <div
          role='listitem'
          aria-label={`Card ${card.id}`}
          key={card.id}
          className='flex flex-col max-w-md border border-gray-200'
        >
          <div aria-label={`Card id ${card.id}`}>Id: {card.id}</div>

          <div className='flex flex-row justify-between w-full font-bold'>
            <div>B</div>
            <div>I</div>
            <div>N</div>
            <div>G</div>
            <div>O</div>
          </div>

          {card.numbers.map((row, i) => (
            <div
              key={`row-${i}`}
              className='flex flex-row justify-between w-full'
            >
              {row.map((col, j) => (
                <div
                  aria-label={`Card ${card.id} number col ${j} row ${i}`}
                  key={`col-${j}`}
                  className={`w-8 text-center border border-gray-300 ${col.checked ? 'bg-green-200' : ''
                    }`}
                >
                  {col.number}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

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

      <h1 className='font-bold text-lg'>New Bingo Card</h1>

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

      <div className='flex flex-col max-w-md border border-gray-200'>
        <div className='flex flex-row justify-between w-full font-bold'>
          <div className='w-8 text-center'>B</div>
          <div className='w-8 text-center'>I</div>
          <div className='w-8 text-center'>N</div>
          <div className='w-8 text-center'>G</div>
          <div className='w-8 text-center'>O</div>
        </div>

        {newCard.numbers.map((row, i) => (
          <div
            key={`row-${i}}`}
            className='flex flex-row justify-between w-full'
          >
            {row.map((_, j) => (
              <input
                aria-label={`New card number col ${i} row ${j}`}
                role='textbox'
                name={`new-card-number-input-${i}-${j}`}
                key={`col-${j}`}
                type='text'
                className='w-8 text-center border border-gray-300'
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
    </>
  )
}
