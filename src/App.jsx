import { useState } from 'react'
import NutritionEstimator from './nutritionestimate'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NutritionEstimator />
    </div>
  )
}

export default App
