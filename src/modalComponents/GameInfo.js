import React from 'react'
import Conway from '../images/conway.jpg'

function GameInfo () {
return(
    <div className="aboutModal">
        <h3 className="title">
            About
        </h3>
        <div className="aboutDiv">
            <div className="aboutText">
                <p>
                The Game of Life, also known simply as Life, 
                is a cellular automaton devised by the British 
                mathematician John Horton Conway in 1970.
                It is a zero-player game, meaning that its 
                evolution is determined by its initial state, 
                requiring no further input. 
                One interacts with the Game of Life by 
                creating an initial configuration and observing how it evolves. 
                It is Turing complete and can simulate a universal 
                constructor or any other Turing machine.
                </p>
            </div>
           
            <img id="hideOnMobile" className="conwayImage" src={Conway} alt="John Horton Conway" />
        </div>
    </div>
)
}

export default GameInfo