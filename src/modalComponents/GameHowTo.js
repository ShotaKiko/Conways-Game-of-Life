import React from 'react'
import StartingInput from '../images/startingPattern.png'
import SimSpeedSlider from '../images/speedSlider.png'
import Inserts from '../images/patternInserts.png'

function GameHowTo () {
return(
    <div className="HowModal">
        <h3 className="title">
            How To
        </h3>
        <div className="HowDiv">
            <div id="shiftHow" className="step 1">
                <p>Activate some cells before starting the simulation</p>
                <img id="theBird" className="stepImg" src={StartingInput}
                    alt="Be sure to activate a few adjacent cells before
                    starting the simulation"
                />
            </div>

            <div className="step 2">
                <img className="stepImgBig" src={SimSpeedSlider}
                    alt="use slider to adjust sim speed"
                />
                <p>Use the slider to adjust the simulation speed</p>
            </div>
            
            <div id="shiftHow" className="step 3">
                <p>
                    Use the pattern presets to populate the grid!
                </p>
                <img className="stepImg"  src={Inserts}
                    alt="randomize grid or use patterns to populate the grid"
                />
            </div>
            
        </div>
    </div>
)
}

export default GameHowTo