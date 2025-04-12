import { Wand } from './chapter6/Wand'
import { SpellDetector } from './chapter6/SpellDetector'
import { OwlPostForm } from './chapter6/OwlPostForm'
import { EventBusProvider, MaraudersMap } from './chapter6/MaraudersMap'
import './App.css'

function App() {
  return (
    <>
      <Wand />

      <br />

      <SpellDetector />

      <br />
      <OwlPostForm />

      <br />
      <EventBusProvider>
        <div className="app">
          <MaraudersMap />
        </div>
      </EventBusProvider>
    </>
  )
}

export default App

