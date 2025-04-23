import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import EnhancedSpell from './chapter12/EnhancedSpell'
import ProtectedMap from './chapter12/ProtectedMap'
import EnhancedViewer from './chapter12/EnhancedViewer'
import rootReducer from './chapter12/rootReducer'
import './App.css'


const store = configureStore({reducer:rootReducer})
function App() {
  return (
    <>
      <EnhancedSpell />
      <br />
      <Provider store={store}>
        <ProtectedMap />
      </Provider>
      <br />

      <EnhancedViewer  timeCoordinate="2025-霍格沃茨大厅" />
    </>
  )
}

export default App

