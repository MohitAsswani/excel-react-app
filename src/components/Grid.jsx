import React from 'react';
import { FixedSizeGrid, FixedSizeList } from 'react-window';
import Cell from './Cell.jsx';
import '../styles/Grid.css';

const Grid = () => {
  const columnHeaders = Array.from({ length: 100 }, (_, i) => String.fromCharCode(65 + i));
  const rowHeaders = Array.from({ length: 100 }, (_, i) => i + 1);

  return (
    <div className="grid-container">
      <div className="grid-headers">
        <div className="grid-header-corner" />
        <FixedSizeList
          className="grid-column-headers"
          height={35}
          itemCount={100}
          itemSize={100}
          layout="horizontal"
          width={window.innerWidth - 80}
        >
          {({ index, style }) => (
            <div style={style} className="grid-header-cell">
              {columnHeaders[index]}
            </div>
          )}
        </FixedSizeList>
      </div>
      <div className="grid-body">
        <FixedSizeList
          className="grid-row-headers"
          height={600}
          itemCount={100}
          itemSize={35}
          width={40}
        >
          {({ index, style }) => (
            <div style={style} className="grid-header-cell">
              {rowHeaders[index]}
            </div>
          )}
        </FixedSizeList>
        <FixedSizeGrid
          className="grid"
          columnCount={100}
          columnWidth={100}
          height={600}
          rowCount={100}
          rowHeight={35}
          width={window.innerWidth - 80}
        >
          {({ columnIndex, rowIndex, style }) => (
            <div style={style}>
              <Cell rowIndex={rowIndex} columnIndex={columnIndex} />
            </div>
          )}
        </FixedSizeGrid>
      </div>
    </div>
  );
};

export default Grid; 