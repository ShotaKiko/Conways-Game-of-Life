import React from 'react'

import CrystalModel from '../images/crystalGrowth.jpg'
import Coneshell from '../images/seashell.jpg'
import UrbanDevelopmentModel from '../images/urbanDevelopment.png'


function GameUtility () {
return(
    <div className="utilityModal">
        <h3 className="title">
            Utility
        </h3>
        <div className="utilityText">
            <p>
            The game of life is a special case of a cellular automaton. It illustrates a
            basic principle that complex, large-scale behaviour (e.g., life) can arise from 
            simple local rules.
            </p>
        <div className="quadGrid">
                <div className="quad 4">
                    <h5>Biological Development</h5>
                    <img className="gridImage"  src={Coneshell} 
                        alt="depiction of cellular automata 
                        patterns on shell pattern development"
                    />
                </div>
                
                <div id="shift" className="quad 1">
                    <h5 className="mobileLocationHeader">Crystal Formation</h5>
                    <img className="gridImage" src={CrystalModel} 
                        alt="crystal formation simulation"
                    />
                </div>
                
                <div id="hideOnMobile" className="quad 2">
                    <h5>Modeling Urban Development</h5>
                    <img className="gridImage" src={UrbanDevelopmentModel} 
                        alt="Urban development simulation model"
                    />
                </div>
                
                {/* <div className="quad 3">
                    <h5>Simulating Wildfire Propagation</h5>
                    <img className="gridImage" src={WildFireSim} 
                        alt="wild fire propagation simulation"
                    />
                </div> */}
        </div>
        </div>
    </div>
)
}

export default GameUtility