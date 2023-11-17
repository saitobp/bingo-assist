import { useEffect, useState } from 'react'

type BingoNumber = {
  number: number
  checked: boolean
}

type BingoCard = {
  id: string
  numbers: BingoNumber[][]
}

export function Bingo() {
  const [newCard, setNewCard] = useState<BingoCard>({
    id: '',
    numbers: [
      [
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
      ],
      [
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
      ],
      [
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
      ],
      [
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
      ],
      [
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
        { number: 0, checked: false },
      ],
    ],
  })

  const [cards, setCards] = useState<BingoCard[]>([])

  const [drawNumber, setDrawNumber] = useState('')
  const [drawNumbers, setDrawNumbers] = useState<number[]>([])

  useEffect(() => {
    const savedCards = localStorage.getItem('cards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  return (
    <>
      <label htmlFor='draw-number'>Draw number</label>
      <input
        type='text'
        name='draw-number'
        id='draw-number'
        value={drawNumber}
        onChange={(e) => {
          setDrawNumber(e.target.value)
        }}
      />

      <button
        onClick={() => {
          if (!drawNumber) return

          setDrawNumbers([...drawNumbers, Number(drawNumber)])

          const newCards = cards.map((card) => {
            const updatedNumbers = card.numbers.map((row) => {
              return row.map((number) => {
                if (number.number === Number(drawNumber)) {
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
        Save draw number
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
        {drawNumbers.map((number) => (
          <span key={`draw-number-${number}`}>{number}</span>
        ))}
      </div>

      <h1>Saved Cards</h1>

      {cards.map((card) => (
        <div
          key={card.id}
          className='flex flex-col max-w-md border border-gray-200'
        >
          <div>Id: {card.id}</div>

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
          console.log(newCard)

          const newCards = [...cards, { ...newCard }]
          setCards(JSON.parse(JSON.stringify(newCards)))
        }}
      >
        Add bingo card
      </button>

      <h1>New Bingo Card</h1>

      <label htmlFor='card-id'>Card Id</label>
      <input type='text' name='card-id' id='card-id' />

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
            key={`row-${i}`}
            className='flex flex-row justify-between w-full'
          >
            {row.map((_, j) => (
              <input
                key={`col-${j}`}
                type='text'
                className='w-8 text-center border border-gray-300'
                value={newCard.numbers[i][j].number}
                disabled={i === 2 && j === 2}
                onChange={(e) => {
                  const newNumbers = [...newCard.numbers]
                  newNumbers[i][j].number = Number(e.target.value)
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
