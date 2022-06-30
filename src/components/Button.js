import React from 'react';

const Button = (props) => {

    return (
        <>
            {!props.gameStatus && <button className="button-dice" onClick={() => props.btnRoll()}>Roll</button>}
            {props.gameStatus && <button className="button-winner" onClick={() => props.btnRoll()}>New Game</button>}
        </>
    );
}

export default Button;