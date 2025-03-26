import { useState } from 'react'
import Hogwarts from './chapter2/Hogwarts'
import './App.css'
import styles from './chapter2/SpellBook.module.css';
import './chapter2/styles.css'
import Classroom from './chapter2/Classroom';

function TimeTurner({ hours }) {
  return <p>剩余时间：{hours * 60}分钟</p>;
}

function SortingHat({ points }) {
  return (
    <div>
      {points >= 100 ? <span>格兰芬多！</span> : <span>继续努力</span>}
    </div>
  );
}

function OwlPost({ letters }) {
  return (
    <ul>
      {letters.map((letter) => (
        <li key={letter.id}>{letter.content}</li>
      ))}
    </ul>
  );
}


function MaraudersMap() {
  const [locations] = useState([
    { id: 1, name: "尖叫棚屋", visible: true },
    { id: 2, name: "密室入口", visible: false }
  ]);

  return (
    <div className="parchment-map">
      <h3>我庄严宣誓我没干好事</h3>
      {locations.map((loc) => (
        loc.visible && <div key={loc.id}>{loc.name}</div>
      ))}
    </div>
  );
}

function App() {
  const spell = <h1>Lumos!</h1>; // 最简单的发光咒

  const potionRecipe = (
    <div className="cauldron">
      <h2>复方汤剂配方</h2>
      <p>3滴草蛉虫黏液</p>
    </div>
  );

  const letters = [{'id':1,'content':'您好'}]

  const spellEffect = {
    fontSize: '2rem',
    backgroundColor: '#2a9a2a'
  };

  return (
    <>
      {spell}

      <div className="parchment">
        {potionRecipe}
      </div>

      <TimeTurner hours={1}/>
      <SortingHat points={1}></SortingHat>
      {letters.length > 0 && <OwlPost letters={letters} />}


      <div style={spellEffect}>荧光闪烁!</div>

      <div className={styles.parchment}>魔法</div>

      <Hogwarts/>

      <Classroom>
      </Classroom>
      <MaraudersMap/>


    </>
  )
}

export default App
