import { useState, memo } from 'react'
import SuspenseBoundary from './chapter3/SuspenseBoundary.jsx'
import DarkArtsList from './chapter3/DarkArtsList.jsx'
import WizardTower  from "./chapter3/WizardTower.jsx";
import PotionWorkshop from './chapter3/PotionWorkshop'
import MagicContextComponent from './chapter3/MagicContextComponent'
import OwlMessage from './chapter3/OwlMessage'
import DynamicSpell from './chapter3/DynamicSpell'
import MagicShop from './chapter3/MagicShop'
import './chapter3/styles.css'
import './App.css'

function MagicCounter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c+1)}>点击施法：{count}</button>;
}

const PotionRecipe = memo(({ ingredients }) => (
  <ul>{ingredients.map(i => <li key={i.id}>{i.name}</li>)}</ul>
));

const ingredients = [{ id: 1, name: "龙鳞" }, { id: 2, name: "月光草" }]

function App() {
  const dynamicSpell = {
    id: "1",
    name: "荧光闪烁",
    type: "防御",
    incantation: "Lumos",
    difficulty: 1
  };

  return (
    <>
    <MagicCounter />

    <PotionRecipe  ingredients={ingredients}></PotionRecipe>
    <PotionWorkshop />
    <br />    

    <WizardTower></WizardTower>

    <MagicContextComponent> 
    </MagicContextComponent>


    <SuspenseBoundary>
      <DarkArtsList />
    </SuspenseBoundary>

    <OwlMessage message="你好，我是小灰灰！" />

    <DynamicSpell spell={dynamicSpell} />
    

    <MagicShop />
    </>
  );
}

export default App
