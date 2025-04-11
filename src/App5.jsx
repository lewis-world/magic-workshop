import ParentComponent from './chapter5/ParentComponent'
import { OwlNetwork, OwlSender, OwlStation} from './chapter5/OwlNetwork'
import { ProphecyOracle } from './chapter5/ProphecyOracle'
import './App.css'

function App() {
  return (
    <>
      <ParentComponent />
      <br />
      <OwlNetwork>
        <div className="owl-app">
          <header>
            <h1>霍格沃茨飞路网通信系统</h1>
            <OwlSender />
          </header>
          <main>
            <OwlStation />
          </main>
        </div>
      </OwlNetwork>

      <br />
      <ProphecyOracle>
        {(futureData) => (
          <div className="prophecy-result">
            <h2>特里劳妮教授的预言</h2>
            <p>预言之子: {futureData.chosenOne}</p>
            <p>预言日期: {new Date(futureData.prophecyDate).toLocaleDateString()}</p>
            <p>黑暗标记: {futureData.darkMark ? '⚡' : '☀️'}</p>
          </div>
        )}
      </ProphecyOracle>
    </>
  )
}

export default App

