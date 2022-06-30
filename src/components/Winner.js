import React from 'react';

const Winner = (props) => {
    return (
        <div className="winner" style={{display: props.finish ? "block" : "none"}}>
            <div className="winner-box">
                <h1 className="winner-text">You Win!</h1>
                <p>Rolls: {props.clickCounter}</p>
                <i className="fa-solid fa-trophy"/>
            </div>
        </div>
    );
}

export default Winner;