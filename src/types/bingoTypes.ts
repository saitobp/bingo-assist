export type BingoNumber = {
  number: string
  checked: boolean
}

export type BingoCardConfig = {
  id: string
  numbers: BingoNumber[][]
}
