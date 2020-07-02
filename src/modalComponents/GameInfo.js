import React from 'react'

function GameInfo () {
return(
    <div className="instructionModal">
        <h4 className="title">
            Instructions
        </h4>
        <div className="aboutDiv">
            <p>
            The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970.
            It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. 
            One interacts with the Game of Life by creating an initial configuration and observing how it evolves. 
            It is Turing complete and can simulate a universal constructor or any other Turing machine.
            </p>
        </div>
        <div className="rulesDiv">
            <ul>
                <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation</li>
                <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
                <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ul>
        </div>
    </div>
)
}

export default GameInfo