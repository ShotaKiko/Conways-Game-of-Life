import React, { useState, useCallback, useRef } from 'react';
import './App.css';
import Sonic from "./icons/sonic.png"
import Snorlax from "./icons/snorlax.png"

import produce from 'immer'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import SpeedGrid from '@material-ui/core/Grid';

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
      padding:"10px",
      fontSize:"1rem",
      borderRadius:"3px",
      '&:hover': {
          color: activeButtonFontColor,
          backgroundColor: activeButtonColor
        }
  }
})


const numOfRows= 40
const numOfColumns = 80


const neighborCoordinates = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [-1, 0],
  [1, 0]
]

const generateEmptyGrid = () => {
  const rows = []
    for (let i = 0; i < numOfRows; i++) {
      rows.push(Array.from(Array(numOfColumns), () => 0))
    }
    return rows
}

function Grid() {
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid()
  })

  const classes = useStyles()

  const [isSimulationRunning, setSimulationRunning] = useState(false)
  const [speed, setSpeed] = useState(200)

  const handleChange = (e, newSpeed) => {
    setSimulationRunning(false)
    setSpeed(newSpeed)
  }

  const handleSlowest = () => {
    setSimulationRunning(false)
    setSpeed(1)
  }

  const handleFastest = () => {
    setSimulationRunning(false)
    setSpeed(1001)
  }

  const runningRef = useRef(isSimulationRunning)
  runningRef.current = isSimulationRunning

  const speedRef = useRef(speed)
  speedRef.current = speed

  // console.log(grid)

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
            neighborCoordinates.forEach(([x, y]) => {
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

    const simSpeed = (1000/speed)
    setTimeout(runSimulation, simSpeed)

  }, [speed])


  return (
    <>
    <div className="buttonSection">
      {/* if sim is running we will display stop otherwise start if sim is not running */}
      <Button className={classes.booton} variant="contained" onClick={() => {
          setSimulationRunning(!isSimulationRunning)
          if (!isSimulationRunning) {
            runningRef.current = true
            runSimulation()
          }
      }}>
          {isSimulationRunning ? "Stop Simulation" : "Start Simulation"}
      </Button>
      
      <Button className={classes.booton} variant="contained" onClick={() => {
        setGrid(generateEmptyGrid)
        setSimulationRunning(false)
        }}
      >
        Clear Grid</Button>

      <Button className={classes.booton} variant="contained" onClick={()=> {
        const rows = []
        for (let i = 0; i < numOfRows; i++) {
          rows.push(Array.from(Array(numOfColumns), () => Math.random() > 0.8 ? 1 : 0))
        }
        setGrid(rows)
        }}
      >
        Randomize Grid
      </Button>
      
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
          <Slider
            className={classes.slider}
            defaultValue={speed}
            value={speedRef.current}
            aria-labelledby="discrete-slider"
            step={200}
            marks
            min={1}
            max={1001}
            onChange={handleChange}
          />
        </SpeedGrid>
        <SpeedGrid item>
          <img 
            className={speedRef.current === 1001 ? "activatedSonicIcon" : "sonicIcon"} 
            src={Sonic} 
            alt="Fast like Sonic"
            onClick={()=> {
              handleFastest()
            }}  
          />
        </SpeedGrid>
      </SpeedGrid>
    </div>
    
    <div className="Grid" 
        style={{
            display:"grid",
            gridTemplateColumns:`repeat(${numOfColumns}, 15px)`,
        }}
        >
      {grid.map((rows, rowIndex) => 
        rows.map((col, colIndex) => (
        <div key={`${rowIndex} - ${colIndex}`} 
            onClick={() => {
                const newGrid = produce(grid, gridCopy =>{
                    //if grid at this index is alive kill it, if dead set to alive
                    gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex] ? 0 : 1
                })
                setGrid(newGrid)
                console.log(newGrid)
            }}
          style={{ 
            width: "15px", 
            height: "15px", 
            backgroundColor: grid[rowIndex][colIndex] ? "#b1f1fa" : undefined,
            border: "1px solid grey",
            borderRadius:"4px"
          }} 
          />
        ))
      )}
    </div>
  </>
  );
}

export default Grid;
