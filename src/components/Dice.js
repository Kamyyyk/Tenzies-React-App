import React from 'react';

const Dice = (props) => {

    const dices = {
        1: "fa-solid fa-rotate-by fa-dice-one",
        2: "fa-solid fa-dice-two",
        3: "fa-solid fa-dice-three",
        4: "fa-solid fa-dice-four",
        5: "fa-solid fa-dice-five",
        6: "fa-solid fa-dice-six",
    }


    return (
            <div className="dice" onClick={() => props.hold()}
                 style={{color:  props.isHeld ? '#59E391' : ""}}><i className={dices[props.value]}/></div>
    );
}

export default Dice;