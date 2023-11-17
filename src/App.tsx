import { useEffect, useState } from 'react'

type BingoCard = {
  id: string
  numbers: number[][]
}

export function App() {
  const [newCard, setNewCard] = useState<BingoCard>({
    id: '',
    numbers: [
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ],
  })

  const [cards, setCards] = useState<BingoCard[]>([])

  useEffect(() => {
    const savedCards = localStorage.getItem('cards')
    if (savedCards) {
      setCards(JSON.parse(savedCards))
    }
  }, [])

  return (
    <>
      <label htmlFor='draw-number'>Draw number</label>
      <input type='text' name='draw-number' id='draw-number' />

      <button>Save draw number</button>

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
                  className='w-8 text-center border border-gray-300'
                >
                  {col}
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
                value={newCard.numbers[i][j]}
                disabled={i === 2 && j === 2}
                onChange={(e) => {
                  const newNumbers = [...newCard.numbers]
                  newNumbers[i][j] = Number(e.target.value)
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
