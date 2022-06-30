import React, {useEffect, useState} from 'react';
import Dice from "./Dice";
import Button from "./Button";
import {nanoid} from "nanoid";
import Winner from "./Winner";
import ReactConfetti from "react-confetti";

const App = () => {
    const [numsTable, setNumsTable] = useState(getRandomNumbers())
    const [tenzies, setTenzies] = useState(false)
    const [confetti, setConfetti] = useState(window.innerWidth)
    const [counter, setCounter] = useState(0)
    
    useEffect(() => {
        const watchWidth = () => {
            setConfetti(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)
    }, [])


    useEffect(() => {
        const allHeld = numsTable.every(num => num.isHeld)
        const firstValue = numsTable[0].value
        const allSameValue = numsTable.every(num => num.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [numsTable])


    function getRandomNumbers() {
        const newTable = []
        for (let i = 0; i<10; i++) {
            newTable.push(generateNewDie())
        }
        return newTable
    }

    function generateNewDie() {
        return {
            id: nanoid(),
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false
        }
    }


    const hold = (id) => {
        setNumsTable(prevState => {
            return prevState.map(num => {
                return num.id === id ? {...num, isHeld: !num.isHeld}: num
            })
        })
    }

    const rollDice = () => {
        if (!tenzies) {
            setCounter(prevState => prevState+1)
            setNumsTable(prevState => prevState.map(num => {
                return num.isHeld ? num : generateNewDie()
            }))
        } else {
            setTenzies(false)
            setCounter(0)
            return setNumsTable(getRandomNumbers())
        }
    }



    return (
        <div className="wrapper">
            {tenzies && <div className="shadow"/>}
            <main className="main">
                {tenzies && <ReactConfetti width={confetti}/>}
                <h1 className="main-header">Tenzies</h1>
                <div className="main-dices">
                    <p className="main-info">Roll until all dice are the same. Click each die to freeze it at its
                        current value between rolls.</p>
                    <h2>Number of rolls: {counter}</h2>
                    <div className="container">
                        {numsTable.map(num => <Dice
                            key={num.id}
                            value={num.value}
                            isHeld={num.isHeld}
                            hold={() => hold(num.id)}
                        />)}
                    </div>
                </div>
                <Button btnRoll={rollDice}
                        gameStatus={tenzies}/>
                <Winner finish={tenzies}
                        clickCounter={counter}
                />
            </main>
        </div>

    );
}

export default App;