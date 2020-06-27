import React from 'react';
import './App.css';
import Grid from './Grid';
import Header from './Header'
import Footer from './Footer';

function App() {

  return (
    <div className="App">
      <Header  />
      <div className="gridContainer">
        <Grid />
    </div>
      <Footer />
      </div>
  );
}

export default App;
