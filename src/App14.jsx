import { ProphecyCrystalBallComponent } from './chapter14/ProphecyCrystalBallComponent'
import { MaraudersMap } from './chapter14/MaraudersMap'
import DefenseLesson from './chapter14/DefenseLesson'
import LibraryPage from './chapter14/LibraryPage'
import HousePointsBoard from './chapter14/HousePointsBoard'
import ScheduleTable from './chapter14/ScheduleTable'
import './App.css'
import './chapter14/Chapter14.css'

function App() {
  return (
    <>
      <ProphecyCrystalBallComponent seekerName="哈利·波特" />
      <br />
      <MaraudersMap />
      <br />
      <DefenseLesson />
      <br />
      <LibraryPage />
      <br />
      <HousePointsBoard />
      <br />
      <ScheduleTable />
      
    </>
  )
}

export default App