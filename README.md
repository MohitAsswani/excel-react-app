# Excel React App

This project is a frontend-only Excel sheet clone built with React and Vite. It renders a large grid of cells and supports basic formula operations.

# Screenshot
![image](https://github.com/user-attachments/assets/910c47d4-8c1e-4a0d-826b-8ac9c3d0b1bb)


## Features

- **Virtualized Grid**: Renders a 100x100 grid (designed to be scalable to 10,000x10,000) using `react-window` for high performance.
- **Editable Cells**: Double-click any cell to edit its value or formula.
- **Formula Bar**: A dedicated input bar to view and edit the formula of the selected cell.
- **Formula Calculation**: Supports basic arithmetic operations (`+`, `-`, `*`, `/`) with direct cell references (e.g., `=A1+B2`).
- **Dependency Tracking**: Formula results update automatically when their dependent cells change.
- **Sticky Headers**: Row and column headers remain visible during scrolling.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Setup & Run

1.  **Clone the repository** (or download the source code).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:5173` (or the next available port).

## Approach

The application is built using a modern frontend stack with a focus on performance and maintainability.

- **Framework**: [React](https://react.dev/) is used for building the user interface with its component-based architecture. [Vite](https://vitejs.dev/) provides a fast development experience and optimized builds.
- **Component Structure**: The UI is broken down into modular components:
  - `App`: The root component.
  - `GridProvider`: A context provider that manages the entire grid state.
  - `Grid`: Renders the main grid layout, including the virtualized cells and headers.
  - `Cell`: Represents a single cell, handling its own state and user interactions.
  - `FormulaBar`: Displays and allows editing of the selected cell's contents.
- **State Management**: State is managed globally using React's Context API (`GridContext`). This allows any component to access and update the grid data without prop-drilling.

## Performance Strategy

Handling a 10,000 x 10,000 grid requires careful performance optimization.

1.  **UI Virtualization**: The core performance strategy is UI virtualization, implemented with `react-window`. Instead of rendering all 100 million cells at once, we only render the small subset of cells that are currently visible in the viewport. This keeps the DOM size small and ensures the application remains fast and responsive, regardless of the grid size.

2.  **Optimized Formula Calculation**: A naive approach would be to recalculate the entire grid on every change. This would be too slow for a large sheet. Instead, we use a **dependency graph** to track the relationships between cells. When a cell's value is updated, we only recalculate that cell and any other cells that directly or indirectly depend on it.
