import React, { useState, useCallback, useRef } from 'react';
import './App.css';

import produce from 'immer'

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

  const [isSimulationRunning, setSimulationRunning] = useState(false)

  const runningRef = useRef(isSimulationRunning)
  runningRef.current = isSimulationRunning

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

    setTimeout(runSimulation, 100)

  }, [])


  return (
    <>
    <div className="buttonSection">
      {/* if sim is running we will display stop otherwise start if sim is not running */}
      <button onClick={() => {
          setSimulationRunning(!isSimulationRunning)
          if (!isSimulationRunning) {
            runningRef.current = true
            runSimulation()
          }
      }}>
          {isSimulationRunning ? "Stop Simulation" : "Start Simulation"}
      </button>
      
      <button onClick={() => {
        setGrid(generateEmptyGrid)
        setSimulationRunning(false)
        }}
      >
        Clear Grid</button>

      <button onClick={()=> {
        const rows = []
        for (let i = 0; i < numOfRows; i++) {
          rows.push(Array.from(Array(numOfColumns), () => Math.random() > 0.7 ? 1 : 0))
        }
        setGrid(rows)
        }}
      >
        Randomize Grid
      </button>
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
            border: "1px solid grey"
          }} 
          />
        ))
      )}
    </div>
  </>
  );
}

export default Grid;
