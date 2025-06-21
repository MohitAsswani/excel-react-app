import React from 'react';
import { GridProvider } from './context/GridContext.jsx';
import Grid from './components/Grid.jsx';
import FormulaBar from './components/FormulaBar.jsx';

function App() {
  return (
    <GridProvider>
      <FormulaBar />
      <Grid />
    </GridProvider>
  );
}

export default App;
