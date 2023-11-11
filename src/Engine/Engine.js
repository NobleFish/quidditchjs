import { Teams, Match } from "../Quidditch/Match.js"
import { AsciiCanvas } from "./AsciiCanvas.js";
import { CommandConsole } from "./CommandConsole.js";

export class Engine{
    constructor(){
        // Define the dimensions of the grid (rows and columns)
        const numRows = 36;
        const numCols = 100;

        const match = new Match();

        // Get Canvas element from index.html
        const canvas = document.getElementById('ascii-canvas');
        const canvasGrid = new AsciiCanvas(numRows,numCols,canvas,'.');
        canvasGrid.render();

        // Get consoleDiv & input from index.html
        const consoleDiv = document.getElementById('console');
        const input = document.getElementById('input');

        const terminal = new CommandConsole(consoleDiv,input);

        this.registerCommands(terminal, canvasGrid, match);
    }

    registerCommands(terminal, canvasGrid, currMatch){
        terminal.register('get_score', () => {
            let data = currMatch.getScores();
            terminal.log("Home: "+data.teamHomeScore+"- Away: "+data.teamAwayScore);
            terminal.log("Current Time:" + data.currentTime);
            return 0;
        }, "get_score - logs scores for both teams and current time");
    
        terminal.register('score', (args) => {
            if(args[0] == "quaffle")
            {
                if(args[1] == "H"){
                    currMatch.scoreQuaffle(Teams.Home);
                    terminal.log("New Home Score:" + currMatch.getScores().teamHomeScore);
                    return 0;         
                }
                else if(args[1] == "A"){
                    currMatch.scoreQuaffle(Teams.Away);
                    terminal.log("New Away Score:" + currMatch.getScores().teamAwayScore);
                    return 0;
                }
            }
            return 1;
        }, "score [quaffle|snitch] [H|A] -- adds [10/150] points to [Home/Away] team");
    
        terminal.register('time',(args) => {
            if(args[0] == "increment"){
                if(null != args[1]){
                    currMatch.incrementTimeMulti(args[1]);
                    terminal.log("New Time:" + currMatch.getScores().currentTime);
                    return 0;
                }
                else{
                    currMatch.incrementTime();
                    terminal.log("New Time:" + currMatch.getScores().currentTime);
                    return 0;
                };
            }
            return 1;                
        }, "time increment [optional:count] - increments time by 6 seconds or 6 seconds per count");
        
        terminal.register('next_round',() => {
    
        }, "next_round - runs the next round");
        
        terminal.register('write_character',(args) => {
            if(args[0] == null || isNaN(args[0]) || args[1] == null || isNaN(args[1]) || args[2] == null){
                return 1;
            }
    
            let char = args[2][0]
    
            let color = '';
            if(args[3] == null){
                color = 'black';
            }else{color = args[3];}
    
            canvasGrid.writeChar(args[0], args[1], char,color);
            terminal.log("Character "+ char +" written to field");
            return 0;
    
        }, "write_character [x] [y] [character] - writes character @x,y");
    
        terminal.register('test_draw', (args) => {
            switch(args[0]){
                case "cornerX":
                    canvasGrid.writeChar(0,0,'X','red');
                    canvasGrid.writeChar(35,0,'X','red');
                    canvasGrid.writeChar(35,99,'X','red');
                    canvasGrid.writeChar(0,99,'X','red');
                    return 0;
                case "cornerO":
                    canvasGrid.writeChar(0,0,'O','red');
                    canvasGrid.writeChar(35,0,'O','red');
                    canvasGrid.writeChar(35,99,'O','red');
                    canvasGrid.writeChar(0,99,'O','red');
                    return 0;
                case "edgeNumbers":
                    for(let i = 0; i < canvasGrid.numRows; i++){
                        canvasGrid.writeChar(i,0,i%10,'red');    
                    }
                    for(let i = 0; i < canvasGrid.numCols; i++){
                        canvasGrid.writeChar(0,i,i%10,'red');
                    }
                    return 0;
                default:
                    return 1;
    
            };
        }, "test_draw [cornerX|cornerO|edgeNumbers]");
    
        terminal.register('reset', () => {
            canvasGrid.writeAll('.','black');
        }, "reset - fills field with \".\"");
    
        terminal.register('arcadia_is_cute', () =>{
            canvasGrid.writeAll('♡','purple');
            terminal.log("You got that right.");
        },"There is no help for that level of cuteness");
    
        terminal.register('mira_is_cute', () =>{
            canvasGrid.writeAll('♡','red');
            terminal.log("Duh.");
        },"Can't help, you're doomed by the cute.");
    }

}