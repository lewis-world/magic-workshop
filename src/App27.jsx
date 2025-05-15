import MagicShop from './chapter27/MagicShop'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './chapter27/ReduxImplementation';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <MagicShop />
    </Provider>
  )
}

export default App