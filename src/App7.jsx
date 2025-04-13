import MagicBook from './chapter7/MagicBook'
import './App.css'

function App() {
  return (
    <>
      <MagicBook 
        title="黑魔法防御术" 
        wizard="哈利·波特" 
        basePower={50} 
        spellType="defense" 
      />
    </>
  )
}

export default App

