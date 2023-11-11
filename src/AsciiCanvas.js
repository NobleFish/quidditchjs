export class AsciiCanvas
{
    // Create an empty Ascii Canvas
    constructor(nRows,nCols,canvasElement,defaultFillCharacter)
    {
        this.numRows = nRows;
        this.numCols = nCols;

        this.ctx = canvasElement.getContext('2d');
        this.canvas = canvasElement;
        this.cellWidth = canvasElement.width / nCols;
        this.cellHeight = canvasElement.height / nRows;

        const defaultCharObj = {character:defaultFillCharacter,color:'black'};

        this.asciiGrid = Array.from({ length: nRows }, () => Array(nCols).fill(defaultCharObj));

    } // default constructor

    // Function to render the ASCII grid on the canvas
    render() 
    {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.numCols; col++) {
                
                const char = this.asciiGrid[row][col].character;

                const x = col * this.cellWidth + this.cellWidth / 2; // Center of the cell horizontally
                const y = row * this.cellHeight + this.cellHeight / 2; // Center of the cell vertically
                
                this.ctx.textBaseline = 'middle';
                this.ctx.textAlign = 'center';
                this.ctx.font = Math.floor(this.cellWidth,this.cellHeight)+'px monospace'; // Set the font and size
                this.ctx.fillStyle = this.asciiGrid[row][col].color; // Set the default color
                this.ctx.fillText(char, x, y);
            }
        }
    } // render

    // Function to update the ASCII grid and redraw the canvas
    writeChar(row, col, char, char_color) {
        if (row >= 0 && row < this.numRows && col >= 0 && col < this.numCols) {
            const asciiCharObj = {character:char,color:char_color.replace(/[^a-zA-Z0-9# ]/g, "")};
            this.asciiGrid[row][col] = asciiCharObj;
            this.render();
        }
        else{
            console.error("Exceeded Bounds - Max_Row:"+this.numRows+" Max_Col:"+this.numCols);
        }
    } // writeChar

    writeRow(row,char,char_color){
        if (row >= 0 && row < this.numRows){
            const asciiCharObj = {character:char,color:char_color};
            for(let col = 0; col < this.numCols; col++){
                this.asciiGrid[row][col] = asciiCharObj;
            }   
            this.render();
        }
        else{
            console.error("Exceeded Bounds - Max_Row:"+this.numRows);
        }
    } // writeRow

    writeCol(col,char,char_color){
        if (col >= 0 && col < this.numCols){
            const asciiCharObj = {character:char,color:char_color};
            for(let row = 0; row < this.numCols; row++){
                this.asciiGrid[row][col] = asciiCharObj;
            }
            this.render();
        }
        else{
            console.error("Exceeded Bounds - Max_Col:"+this.numCols);
        }
    } // writeCol
    
    writeAll(char, char_color){
        const asciiCharObj = {character:char,color:char_color};
        for(let row = 0; row < this.numRows; row++){
            for(let col = 0; col < this.numCols; col++){
                this.asciiGrid[row][col] = asciiCharObj;
            }
        }
        this.render();
    } // writeAll

}; // class AsciiCanvas 