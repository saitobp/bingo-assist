export type BingoNumber = {
  number: string
  checked: boolean
}

export type BingoCardConfig = {
  id: string
  numbers: BingoNumber[][]
  win: boolean
}

export type WinType = 'row' | 'column' | 'diagonal' | 'full-card' | 'corners'
