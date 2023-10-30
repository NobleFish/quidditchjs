export class AsciiGrid{
    // Create an empty ASCII grid
    constructor(numRows,numCols, preElement){
        this.asciiGrid = [];
        this.numRows = numRows;
        this.numCols = numCols;
        this.assignedElement = preElement;
        for (let row = 0; row < this.numRows; row++) {
            this.asciiGrid.push([]);
            for (let col = 0; col < this.numCols; col++) {
                this.asciiGrid[row][col] = '.';
            }
        }
    }

    // Function to render the ASCII grid
    renderAsciiGrid() {
        this.assignedElement.textContent = this.asciiGrid.map(row => row.join('')).join('\n');
    }

    // Set a character at a specific grid position
    setCharacter(row, col, character) {
        if (row >= 0 && row < this.numRows && col >= 0 && col < this.numCols) {
            this.asciiGrid[row][col] = character;
            this.renderAsciiGrid();
            return true;
        }
        return false;
    }

    withinBounds(row,col){
        if (row >= 0 && row < this.numRows && col >= 0 && col < this.numCols) {
            return true;
        }
        return false;
    }

}



