export type BingoNumber = {
  number: string
  checked: boolean
}

export type BingoCardConfig = {
  id: string
  numbers: BingoNumber[][]
}

export type WinType = 'row' | 'column' | 'diagonal' | 'full-card' | 'corners'
