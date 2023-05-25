import { useState } from 'react'
import './App.css'
import ConsumeAPI from './components/consumeAPI/ConsumeAPI'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ConsumeAPI />
  )
}

export default App
