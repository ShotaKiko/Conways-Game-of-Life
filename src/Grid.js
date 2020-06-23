import React, { useState } from 'react';
import './App.css';

import produce from 'immer'

const numOfRows= 30
const numOfColumns = 60

function Grid() {

  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numOfRows; i++) {
      rows.push(Array.from(Array(numOfColumns), () => 0))
    }
    return rows
  })

  const [isSimulationRunning, setSimulationRunning] = useState(false)

  // console.log(grid)


  return (
    <>
    {/* if sim is running we will display stop otherwise start if sim is not running */}
    <button onClick={() => {
        setSimulationRunning(!isSimulationRunning)
    }}>
        {isSimulationRunning ? "Stop Simulation" : "Start Simulation"}
    </button>
    <div className="Grid" 
        style={{
            display:"grid",
            gridTemplateColumns:`repeat(${numOfColumns}, 20px)`,
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
            }}
          style={{ 
            width: 20, 
            height: 20, 
            backgroundColor: grid[rowIndex][colIndex] ? "steelblue" : undefined,
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
