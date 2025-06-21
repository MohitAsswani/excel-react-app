import React, { useState } from 'react';
import { useGrid } from '../context/GridContext.jsx';
import '../styles/Cell.css';

const Cell = ({ rowIndex, columnIndex }) => {
  const { grid, updateCell, selectedCell, setSelectedCell } = useGrid();
  const cell = grid[rowIndex][columnIndex];
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    updateCell(rowIndex, columnIndex, { inputValue: e.target.value });
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
    updateCell(rowIndex, columnIndex, { inputValue: cell.formula || cell.value });
    setSelectedCell({ row: rowIndex, col: columnIndex });
  };

  const handleBlur = () => {
    setIsEditing(false);
    const inputValue = grid[rowIndex][columnIndex].inputValue;
    if (inputValue.startsWith('=')) {
      updateCell(rowIndex, columnIndex, { formula: inputValue, value: '' });
    } else {
      updateCell(rowIndex, columnIndex, { value: inputValue, formula: '' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div
      className={`cell ${selectedCell.row === rowIndex && selectedCell.col === columnIndex ? 'selected' : ''}`}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={cell.inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <div>{cell.value || cell.formula}</div>
      )}
    </div>
  );
};

export default Cell; 