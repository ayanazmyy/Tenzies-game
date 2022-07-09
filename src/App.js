import logo from './logo.svg';
import './App.css';
import Die from './Die';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {
  const rollCountResult = document.querySelector('.rollCountResult');

  const [tenzies, setTenzies] = useState(false);


  const generateNewDice = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }


  const allNewDice = () => {
    let numbersArr = []
    for (let i = 0; i < 12; i++) {
      numbersArr.push(generateNewDice());
    }
    return numbersArr;
  }

  const [dice, setDice] = useState(allNewDice());

  useEffect(() => {
    const isHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const sameValue = dice.every(die => die.value == firstValue);
    if (isHeld && sameValue) {
      setTenzies(true);
    }
  }, [dice])

  const resetGame = () => {
    if (tenzies == true) {
      let btn = document.querySelector('main .btn');
      btn.addEventListener('click', function () {
        setTenzies(false);
        setDice(allNewDice());
      })
    }
  }

  resetGame()

  const holdDie = (id) => {
    setDice(prevState => prevState.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }



  const [countRolls, setCountRolls] = useState(0);
  useEffect(() => {
    if (tenzies) {
      setCountRolls(0)
    }
  }, [tenzies])

  const rollDice = () => {
    setCountRolls(prevState => prevState + 1);
    setDice(prevState => prevState.map(die => {
      return die.isHeld ? die : generateNewDice()
    }))
  }

  const handleNewGame = () => {
    setCountRolls(0);
    setDice(prevState => prevState.map(die => {
      return die.isHeld ? die : generateNewDice()
    }))
  }

  useEffect(() => {
    let seconds = 0;
    let minutes = 0
    const timer = document.querySelector('.timer');
    
    const timeTracker = setInterval(() => {
      if (tenzies == false) {
        timer.innerHTML = `<div>Time <br/> ${minutes <= 9 ? '0' : ''}${minutes} : ${seconds <= 9 ? '0' : ''}${seconds}</div>`
        seconds++
        if (seconds == 59) {
          minutes++;
          seconds = 0;
        }
      }
    }, 1000)


    return () => {
      clearInterval(timeTracker)
      timer.innerHTML = `Congratulation! You cleared the game in ${minutes <= 9 ? '0' : ''}${minutes} : ${seconds <= 9 ? '0' : ''}${seconds}`}
  }, [tenzies])


  let dieElements = dice.map((die, index) => <Die id={die.id} isHeld={die.isHeld} key={die.id} value={die.value} holdDie={() => holdDie(die.id)} />)
  return (
    <div className="App">
      <main>
        {tenzies && <Confetti className='mx-auto' />}
        <h2 className='text-primary'>Tenzies game</h2>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='row'>
          {dieElements}
        </div>
        {!tenzies && <buttton className='btn btn-primary mt-5 px-4' onClick={rollDice}>
          Roll
        </buttton>}
        {tenzies && <button className='btn btn-primary mt-5 px-4' onClick={handleNewGame}>New game</button>}
        <div className={`timer ${tenzies? 'text-success': 'text-danger'}`}>Time<br />00 : 00</div>
        {!tenzies && <div className='rollCount text-danger'>Number of Rolls: {countRolls}</div>}
        
      </main>
    </div>
  );
}

export default App;
