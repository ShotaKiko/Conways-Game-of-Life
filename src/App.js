import React, { useState } from 'react';
import './App.css';

const numOfRows= 30
const numOfColumns = 60

function App() {

  const [grid, setGrid] = useState(() => {
    const rows = []
    for (let i = 0; i < numOfRows; i++) {
      rows.push(Array.from(Array(numOfColumns), () => 0))
    }
    return rows
  })

  // console.log(grid)


  return (
    <div className="App" style={{
      display:"grid",
      gridTemplateColumns:`repeat(${numOfColumns}, 20px)`
    }}>
      {grid.map((rows, rowIndex) => 
        rows.map((col, colIndex) => (
        <div key={`${rowIndex} - ${colIndex}`} 
          style={{ 
            width: 20, 
            height: 20, 
            backgroundColor: grid[rowIndex][colIndex] ? "blue" : undefined,
            border: "1px solid grey"
          }} 
          />
        ))
      )}
    </div>
  );
}

export default App;
