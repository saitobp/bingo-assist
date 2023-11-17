import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Bingo } from './Bingo'
import './index.css'

const element = document.getElementById('root')!
const root = createRoot(element)

root.render(
  <StrictMode>
    <Bingo />
  </StrictMode>,
)
