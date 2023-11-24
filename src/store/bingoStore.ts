import { BingoCardConfig, WinType } from '@/types/bingoTypes'
import { create } from 'zustand'

type BingoStore = {
  newCard: BingoCardConfig
  setNewCard: (newCard: BingoCardConfig) => void

  drawnNumbers: number[]
  winnerCard: (BingoCardConfig & { type: WinType }) | null
}

export const useBingoStore = create<BingoStore>((set) => ({
  newCard: {
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
  },
  setNewCard: (newCard) => set({ newCard }),

  drawnNumbers: [],
  winnerCard: null,
}))
