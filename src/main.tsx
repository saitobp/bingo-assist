import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const element = document.getElementById('root')!
const root = createRoot(element)

type BingoCard = {
  id: string
  numbers: number[][]
}

const cards: BingoCard[] = [
  {
    id: '0001',
    numbers: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 25],
    ],
  },
]

root.render(
  <StrictMode>
    <label htmlFor='draw-number'>Draw number</label>
    <input type='text' name='draw-number' id='draw-number' />

    <button>Save draw number</button>

    <h1>Saved Cards</h1>

    {cards.map((card) => (
      <div className='flex flex-col max-w-md border border-gray-200'>
        <div>Id: {card.id}</div>

        <div className='flex flex-row justify-between w-full font-bold'>
          <div>B</div>
          <div>I</div>
          <div>N</div>
          <div>G</div>
          <div>O</div>
        </div>

        <div className='flex flex-row justify-between w-full'>
          <div>{card.numbers[0][0]}</div>
          <div>{card.numbers[0][1]}</div>
          <div>3</div>
          <div>4</div>
          <div>15</div>
        </div>

        <div className='flex flex-row justify-between w-full'>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>30</div>
        </div>

        <div className='flex flex-row justify-between w-full'>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>30</div>
        </div>

        <div className='flex flex-row justify-between w-full'>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>30</div>
        </div>

        <div className='flex flex-row justify-between w-full'>
          <div>16</div>
          <div>17</div>
          <div>18</div>
          <div>19</div>
          <div>30</div>
        </div>
      </div>
    ))}

    <button>Add bingo card</button>

    <h1>New Bingo Card</h1>

    <label htmlFor='card-id'>Card Id</label>
    <input type='text' name='card-id' id='card-id' />

    <div className='flex flex-col max-w-md border border-gray-200'>
      <div className='flex flex-row justify-between w-full font-bold'>
        <div>B</div>
        <div>I</div>
        <div>N</div>
        <div>G</div>
        <div>O</div>
      </div>

      <div className='flex flex-row justify-between w-full'>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>15</div>
      </div>

      <div className='flex flex-row justify-between w-full'>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>30</div>
      </div>

      <div className='flex flex-row justify-between w-full'>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>30</div>
      </div>

      <div className='flex flex-row justify-between w-full'>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>30</div>
      </div>

      <div className='flex flex-row justify-between w-full'>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>30</div>
      </div>
    </div>
  </StrictMode>,
)
