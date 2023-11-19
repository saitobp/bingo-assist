import { BingoCard } from '@/types/bingoTypes'
import { create } from 'zustand'

type BingoStore = {
  // Populate with the defaults values for the new card
  // before adding it to the list of cards
  newCard: BingoCard

  setNewCard: (newCard: BingoCard) => void
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
}))
