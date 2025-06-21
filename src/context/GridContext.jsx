import React, { createContext, useContext, useState } from 'react';
import { create, all } from 'mathjs';

const GridContext = createContext();
const math = create(all);

export const useGrid = () => {
  return useContext(GridContext);
};

export const GridProvider = ({ children }) => {
  const [grid, setGrid] = useState(
    Array(100)
      .fill(null)
      .map(() => Array(100).fill({ value: '', formula: '', inputValue: '' }))
  );
  const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
  const [dependencyGraph, setDependencyGraph] = useState({});

  const parseFormula = (formula, currentGrid, cellRow, cellCol) => {
    const dependencies = [];
    const scope = {};
    
    const cellRegex = /([A-Z]+)(\d+)/g;
    let match;
    while ((match = cellRegex.exec(formula)) !== null) {
      const colStr = match[1];
      const rowStr = match[2];
      const col = colStr.charCodeAt(0) - 65;
      const row = parseInt(rowStr, 10) - 1;

      if (currentGrid[row] && currentGrid[row][col]) {
        dependencies.push({ row, col });
        scope[match[0]] = currentGrid[row][col].value || 0;
      } else {
        scope[match[0]] = 0;
      }
    }

    const newDependencies = { ...dependencyGraph };
    newDependencies[`${cellRow},${cellCol}`] = dependencies;
    setDependencyGraph(newDependencies);

    return { scope };
  };

  const calculateCell = (grid, row, col) => {
    const cell = grid[row][col];
    if (cell.formula) {
      try {
        const formula = cell.formula.substring(1);
        const { scope } = parseFormula(formula, grid, row, col);
        grid[row][col].value = math.evaluate(formula, scope);
      } catch (e) {
        grid[row][col].value = 'ERROR';
      }
    }
  };

  const updateCell = (row, col, newCellData) => {
    setGrid((prevGrid) => {
      const newGrid = JSON.parse(JSON.stringify(prevGrid));
      newGrid[row][col] = { ...newGrid[row][col], ...newCellData };

      const recalculate = (r, c) => {
        calculateCell(newGrid, r, c);
        const dependents = Object.keys(dependencyGraph).filter(key => 
          dependencyGraph[key].some(dep => dep.row === r && dep.col === c)
        );
        dependents.forEach(dep => {
          const [depRow, depCol] = dep.split(',').map(Number);
          recalculate(depRow, depCol);
        });
      };

      recalculate(row, col);
      
      return newGrid;
    });
  };

  const value = {
    grid,
    selectedCell,
    setSelectedCell,
    updateCell,
  };

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
}; 