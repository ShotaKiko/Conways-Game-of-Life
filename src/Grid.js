import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import Sonic from "./icons/sonic.png"
import Snorlax from "./icons/snorlax.png"

import produce from 'immer'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import SpeedGrid from '@material-ui/core/Grid';
import useWindowDimensions from './useWindowDimensions.js'


//Coordinate Imports
import neighboringCoordinates from './displacementCoordibates/neighboringCoordinates.js'
import toadCoordinates from './displacementCoordibates/toadCoordinates.js'
import beaconCoordinates from './displacementCoordibates/beaconCoordinates.js'
import pentadecathalonCoordinates from './displacementCoordibates/pentadecathalonCoordinates.js'
import pulsarCoordinates from './displacementCoordibates/pulsarCoordinates.js'
import loafCoordinates from './displacementCoordibates/loafCoordinates.js'
import beeHiveCoordinates from './displacementCoordibates/beeHiveCoordinates.js'
import tubCoordinates from './displacementCoordibates/tubCoordinates.js'
import boatCoordinates from './displacementCoordibates/boatCoordinates.js'
import gliderCoordinates from './displacementCoordibates/gliderCoordinates.js'
import LWSSCoordinates from './displacementCoordibates/LWSSCoordinates.js'
import MWSSCoordinates from './displacementCoordibates/MWSSCoordinates.js'
import gosperGliderGunCoordinates from './displacementCoordibates/gosperGliderGunCoordinates.js'
import InstructionsModal from './InstructionsModal';

const unactiveButtonColor = "steelBlue"
const unactiveButtonFontColor = "#b1f1fa"

const activeButtonColor = "#b1f1fa"
const activeButtonFontColor = "steelBlue"


const useStyles = makeStyles({
  root:{
    // border:"1px solid pink",
    width:"400px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  slider:{
    width:"210px",
    // border:"1px solid white"
  },
  booton:{
      color: unactiveButtonFontColor,
      backgroundColor:unactiveButtonColor,
      padding:"7px",
      fontSize:".9rem",
      borderRadius:"3px",
      '&:hover': {
          color: activeButtonFontColor,
          backgroundColor: activeButtonColor
      }
  },
  insert:{
      color: unactiveButtonFontColor,
      backgroundColor:unactiveButtonColor,
      padding:"7px",
      fontSize:".8rem",
      // borderRadius:"3px",
      '&:hover': {
          color: activeButtonFontColor,
          backgroundColor: activeButtonColor
      }
  }
})

const SpeedSlider = withStyles({
  root: {
    color: '#b1f1fa',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 7,
    borderRadius: 4,
  },
})(Slider);


console.log("WINDOW", window.innerWidth)
//MODIFIABLE TO CHANGE GRID SIZE
let numOfRows= 40
let numOfColumns = 100

//These vars affect random point of pattern insert
const lowerThreshold = .15
const upperThreshold = .85

const gosperLowerThreshold = .35
const gosperUpperThreshold = .65

//selects more centered coordinate for gosper glider pattern
const gMin = (gridDirectionRange) => {
  const gRangeMin = Math.ceil(gridDirectionRange * gosperLowerThreshold)
  
  return gRangeMin
}

const gMax = (gridDirectionRange) => {
  const rangeMax = Math.floor(gridDirectionRange * gosperUpperThreshold)

  return rangeMax
}

const getGosperRandomLocationRow = () => {
  const min = gMin(numOfRows)
  const max = gMax(numOfRows)
  const randomRowLoc = (Math.floor(Math.random() * (max - min)) + min)

  return randomRowLoc
}

const getGosperRandomLocationColumn = () => {
  const min = gMin(numOfColumns)
  const max = gMax(numOfColumns)
  const randomColumnLoc = (Math.floor(Math.random() * (max - min)) + min)

  return randomColumnLoc
}

// FOR ALL PATTERN INSERTS EXCLUDING GOSPER GLIDER GUN
const directionalMin = (gridDirectionRange) => {
  const rangeMin = Math.ceil(gridDirectionRange * lowerThreshold)
  
  return rangeMin
}

const directionalMax = (gridDirectionRange) => {
  const rangeMax = Math.floor(gridDirectionRange * upperThreshold)

  return rangeMax
}

//gets a random row & col locations based on grid size and thresholds established above
const getRandomLocationRow = () => {
  const min = directionalMin(numOfRows)
  const max = directionalMax(numOfRows)
  const randomRowLoc = (Math.floor(Math.random() * (max - min)) + min)

  return randomRowLoc
}

const getRandomLocationColumn = () => {
  const min = directionalMin(numOfColumns)
  const max = directionalMax(numOfColumns)
  const randomColumnLoc = (Math.floor(Math.random() * (max - min)) + min)

  return randomColumnLoc
}

function Grid() {
  //applies styles to material ui components
  const classes = useStyles()
  
  
  //to be used to calculate grid size depending on window dimensions
  const { height, width } = useWindowDimensions()
  // console.log("HEIGHT", height)
  // console.log("WIDTH", width)
  
  if (width < 1450) {
    numOfColumns = 85
  } else if (width < 1025){
    numOfColumns = 20
  } else if (width < 600) {
    numOfColumns = 15
    numOfRows = 10
  } else if (width > 1925 && height > 1085 ) {
    numOfColumns = 200
    numOfRows = 60
  }
  
  //Grid Generation function
  const generateEmptyGrid = () => {
    const rows = []
      for (let i = 0; i < numOfRows; i++) {
        rows.push(Array.from(Array(numOfColumns), () => 0))
      }
      return rows
  }
  
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })
  
  
  const [isSimulationRunning, setSimulationRunning] = useState(false)
  const [speed, setSpeed] = useState(5)

  //SPEED HANDLERS
  const handleSpeedChange = (e, newSpeed) => {
    setSpeed(newSpeed)
  }

  const handleSlowest = () => {
    setSpeed(1)
  }

  const handleFastest = () => {
    setSpeed(6)
  }

  //GENERAL INSERT FUNCTION
  const insertPattern = (displacementCoordinates) => {
    setGrid( g => {
      return produce(g, gridCopy => {
        const r = getRandomLocationRow()
        const c = getRandomLocationColumn()
        displacementCoordinates.forEach(([x, y]) => {
          const newR = r + x
          const newC = c + y
          gridCopy[newR][newC] = 1
        })
      })
    })
    if (speedRef.current !==6 && speedRef.current !==4){
      setSpeed(5)
    }
  }

  //GOSPER GLIDER GUN PATTERN INSERT
  const gosperInsertPattern = (displacementCoordinates) => {
    setGrid( g => {
      return produce(g, gridCopy => {
        const r = getGosperRandomLocationRow()
        const c = getGosperRandomLocationColumn()
        displacementCoordinates.forEach(([x, y]) => {
          const newR = r + x
          const newC = c + y
          gridCopy[newR][newC] = 1
        })
      })
    })
    if (speedRef.current !==6 && speedRef.current !==4){
      setSpeed(5)
    }
  }


  // PRESET PATTERNS INSERT HANDLERS
  const handleToadInsert = () => {
    insertPattern(toadCoordinates)
  }

  const handleBeaconInsert =() => {
    insertPattern(beaconCoordinates)
  }

  const handlePentadecathalonInsert = () => {
    insertPattern(pentadecathalonCoordinates)
  }

  const handledPulsarInsert = () => {
    insertPattern(pulsarCoordinates)
  }

  const handleLoafInsert = () => {
    insertPattern(loafCoordinates)
  }

  const handleHiveInsert = () => {
    insertPattern(beeHiveCoordinates)
  }

  const handleTubInsert = () => {
    insertPattern(tubCoordinates)
  }

  const handleBoatInsert = () => {
    insertPattern(boatCoordinates)
  }

  const handleGliderInsert = () => {
    insertPattern(gliderCoordinates)
  }

  const handleLWSSInsert = () => {
    insertPattern(LWSSCoordinates)
  }

  const handleMWSSInsert = () => {
    insertPattern(MWSSCoordinates)
  }

  const handleGosperInsert = () => {
    gosperInsertPattern(gosperGliderGunCoordinates)
  }
  //

  //Refs used to assess speed and running status on each simulation iteration
  const runningRef = useRef(isSimulationRunning)
  runningRef.current = isSimulationRunning

  const speedRef = useRef(speed)
  speedRef.current = speed
  


  //SIMULATION LOGIC
  const runSimulation = useCallback(() => {
    //simulate and see if we are running
    if(!runningRef.current){
      return //kill condition
    }

    setGrid(g => {
      return produce(g, gridCopy => {
        for (let r= 0; r < numOfRows; r++) {
          for(let c = 0; c < numOfColumns; c++) {
            let neighborsCount = 0 //dead cells
            neighboringCoordinates.forEach(([x, y]) => {
              const newR = r + x
              const newC = c + y
              if (newR >= 0 && newR < numOfRows && newC >= 0 && newC < numOfColumns) {
                neighborsCount += g[newR][newC]
              }
            })
            if (neighborsCount < 2 || neighborsCount > 3) {
              gridCopy[r][c] = 0
            } else if (g[r][c] === 0 && neighborsCount === 3) {
              gridCopy[r][c] = 1
            }
          }
        }
      })
    })

    if(speedRef.current < 5) {
      const simSpeed = (2000/(speedRef.current))
      setTimeout(runSimulation, simSpeed)
    } else if (speedRef.current === 5) {
      setTimeout(runSimulation, 100)
    } else {
      setTimeout(runSimulation, 10)
    }
  }, [])
  //


  return (
    <>
    <div className="contentSection">
      <div className="Grid" 
          style={{
              display:"grid",
              gridTemplateColumns:`repeat(${numOfColumns}, 10px)`,
          }}
          >
        {grid.map((rows, rowIndex) => 
          rows.map((col, colIndex) => (
          <div className="cell" key={`${rowIndex} - ${colIndex}`} 
              onClick={() => {
                  const newGrid = produce(grid, gridCopy =>{
                      //if grid at this index is alive kill it, if dead set to alive
                      gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1
                  })
                  setGrid(newGrid)
              }}
            style={{ 
              width: "10px", 
              height: "10px", 
              backgroundColor: grid[rowIndex][colIndex] ? "#b1f1fa" : undefined,
              border: ".5px solid grey",
              borderRadius:"2px",
            }}
            />
          ))
        )}
      </div>
    </div>

    <div className="buttonInputSection">
      <div className="controls">
        <h5>Controls</h5>
        {/* if sim is running we will display stop otherwise start if sim is not running */}
        <ButtonGroup  orientation="vertical">
          <Button className={classes.booton} onClick={() => {
              setSimulationRunning(!isSimulationRunning)
              if (!isSimulationRunning) {
                runningRef.current = true
                runSimulation()
              }
          }}>
              {isSimulationRunning ? "Stop Simulation" : "Start Simulation"}
          </Button>
          
          <Button className={classes.booton} onClick={() => {
            setGrid(generateEmptyGrid)
            setSimulationRunning(false)
            }}
          >
            Clear Grid</Button>

          <Button className={classes.booton} onClick={()=> {
            const rows = []
            for (let i = 0; i < numOfRows; i++) {
              rows.push(Array.from(Array(numOfColumns), () => Math.random() > 0.8 ? 1 : 0))
            }
            setGrid(rows)
            }}
          >
            Randomize Grid
          </Button>

          
          <InstructionsModal />
        </ButtonGroup>
      </div>
      
      <SpeedGrid className={classes.root} container spacing={2}>
        <SpeedGrid item>
          <img 
            className={speedRef.current === 1 ? "activatedSnorlaxIcon" : "snorlaxIcon"} 
            src={Snorlax} 
            alt="Slow like Snorlax"
            onClick={()=> {
              handleSlowest()
            }} 
          />
        </SpeedGrid>
        <SpeedGrid>
          <SpeedSlider
            className={classes.slider}
            defaultValue={speed}
            value={speedRef.current}
            aria-labelledby="discrete-slider"
            // aria-labelledby="continuous-slider"
            // valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={6}
            onChange={handleSpeedChange}
          />
        </SpeedGrid>
        <SpeedGrid item>
          <img 
            className={speedRef.current === 6 ? "activatedSonicIcon" : "sonicIcon"} 
            src={Sonic} 
            alt="Fast like Sonic"
            onClick={()=> {
              handleFastest()
            }}  
          />
        </SpeedGrid>
      </SpeedGrid>
      
      <div className="insertSection">

        <div className="oscillatorsDiv">
          <h5>Oscillators</h5>
          <ButtonGroup orientation="vertical" >
            <Button className={classes.insert} onClick={handleToadInsert}>Toad</Button>
            <Button className={classes.insert} onClick={handleBeaconInsert}>Beacon</Button>
            <Button className={classes.insert} onClick={handlePentadecathalonInsert}>Pentadecathalon</Button>
            <Button className={classes.insert} onClick={handledPulsarInsert}>Pulsar</Button>        
          </ButtonGroup>
        </div>

        <div className="staticDiv">
          <h5>Still Life</h5>
          <ButtonGroup orientation="vertical" >
            <Button className={classes.insert} onClick={handleLoafInsert}>Loaf</Button>
            <Button className={classes.insert} onClick={handleHiveInsert}>Bee-Hive</Button>
            <Button className={classes.insert} onClick={handleBoatInsert}>Boat</Button>
            <Button className={classes.insert} onClick={handleTubInsert}>Tub</Button>        
          </ButtonGroup>
        </div>

        <div className="spaceshipDiv">
          <h5>Space Ships</h5>
          <ButtonGroup orientation="vertical" >
            <Button className={classes.insert} onClick={handleGliderInsert}>Glider</Button>
            <Button className={classes.insert} onClick={handleLWSSInsert}>Light Weight Ship</Button>
            <Button className={classes.insert} onClick={handleMWSSInsert}>Middle Weigtht Ship</Button>
            <Button className={classes.insert} onClick={handleGosperInsert}>Gosper Glider</Button>        
          </ButtonGroup>
        </div>
      </div>
    </div>
    
  </>
  );
}

export default Grid;
