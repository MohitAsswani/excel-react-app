import React from 'react';
import { useGrid } from '../context/GridContext.jsx';
import '../styles/FormulaBar.css';

const FormulaBar = ({ rowIndex, columnIndex }) => {
  const { grid, selectedCell, updateCell } = useGrid();
  const cell = grid[selectedCell.row][selectedCell.col];

  const handleFormulaChange = (e) => {
    updateCell(selectedCell.row, selectedCell.col, { inputValue: e.target.value });
  };

  const handleFormulaKeyDown = (e) => {
    if (e.key === 'Enter') {
      const inputValue = grid[selectedCell.row][selectedCell.col].inputValue;
      if (inputValue.startsWith('=')) {
        updateCell(selectedCell.row, selectedCell.col, { formula: inputValue, value: '' });
      } else {
        updateCell(selectedCell.row, selectedCell.col, { value: inputValue, formula: '' });
      }
    }
  };

  return (
    <div className="formula-bar">
      <div className="selected-cell">
        {String.fromCharCode(65 + selectedCell.col)}
        {selectedCell.row + 1}
      </div>
      <input
        type="text"
        className="formula-input"
        value={cell.inputValue}
        onChange={handleFormulaChange}
        onKeyDown={handleFormulaKeyDown}
      />
    </div>
  );
};

export default FormulaBar; 