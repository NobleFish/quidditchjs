export class AsciiGrid{
    // Create an empty ASCII grid
    constructor(numRows,numCols){
        this.asciiGrid = [];
        this.numRows = numRows;
        this.numCols = numCols;

        for (let row = 0; row < this.numRows; row++) {
            this.asciiGrid.push([]);
            for (let col = 0; col < this.numCols; col++) {
                this.asciiGrid[row][col] = '.';
            }
        }
    }

    // Function to render the ASCII grid
    renderAsciiGrid(preElement) {
        preElement.textContent = this.asciiGrid.map(row => row.join('')).join('\n');
    }

    // Set a character at a specific grid position
    setCharacter(row, col, character) {
        if (row >= 0 && row < this.numRows && col >= 0 && col < this.numCols) {
            this.asciiGrid[row][col] = character;
        }
    }


}



