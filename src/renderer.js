import { AsciiGrid } from './AsciiGrid.js';
import {Match,Teams} from './Match.js';

document.addEventListener("DOMContentLoaded", function () {
    
    let currmatch = new Match();

    // Define the dimensions of the grid (rows and columns)
    const numRows = 36;
    const numCols = 100;
    // Define the element for the field/grid
    const fieldElement = document.getElementById('ascii-grid');
    const currField = new AsciiGrid(numRows,numCols,fieldElement);
    currField.renderAsciiGrid();

    const consoleDiv = document.getElementById('console');
    const input = document.getElementById('input');

    // Function to write to console
    function logMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        consoleDiv.appendChild(p);
        consoleDiv.scrollTop = consoleDiv.scrollHeight; // Scroll down to the bottom

    }

    // Function to clear console
    function clearConsole() {
        while (consoleDiv.firstChild) {
            consoleDiv.removeChild(consoleDiv.firstChild);
        }
    }

    // Function to handle user input
    function handleInput() {
        const command = input.value;
        logMessage(`> ${command}`); // Display the entered command
        processCommand(command); // Call the function with the entered command
        input.value = ''; // Clear the input field
    }

    // Function to process the entered command
    function processCommand(command) {
        const cmdArr = command.split(/[ ,]+/);
        switch(cmdArr[0]){
            case "get_score":
                let data = currmatch.getScores();
                logMessage("Home: "+data.teamHomeScore+"- Away: "+data.teamAwayScore);
                logMessage("Current Time:" + data.currentTime);
                break;
            case "clear":
                clearConsole();
                break;
            case "score":
                switch(cmdArr[1]){
                    case "quaffle":
                        switch(cmdArr[2]){
                            case "H":
                                currmatch.scoreQuaffle(Teams.Home);
                                logMessage("New Home Score:" + currmatch.getScores().teamHomeScore);
                                break;
                            case "A":
                                currmatch.scoreQuaffle(Teams.Away);
                                logMessage("New Away Score:" + currmatch.getScores().teamAwayScore);
                                break;
                            default:
                                logMessage("score [quaffle|snitch] [H|A]");
                        }
                    break;
                    default:
                        logMessage("score [quaffle|snitch] [H|A]");
                }
                break;
            case "time":
                switch(cmdArr[1]){
                    case "increment":
                        if(null != cmdArr[2]){
                            currmatch.incrementTimeMulti(cmdArr[2])
                            logMessage("New Time:" + currmatch.getScores().currentTime);
                        }
                        else{
                            currmatch.incrementTime();
                            logMessage("New Time:" + currmatch.getScores().currentTime);
                                
                        };
                        break;
                    default:
                        logMessage("time increment [optional:count]");
                }
                break;
            case "next_round":
                currmatch.performRound();
                break;
            case "write_character":
                let success = false;
                let char = '';
                if(cmdArr[3] != null){
                    char = cmdArr[3][0];
                    success = currField.setCharacter(cmdArr[1], cmdArr[2], char);

                }
                if(success == true){
                    logMessage("Character "+ char +" written to field");
                }
                else{
                    logMessage("write_character [row] [col] [character]");
                }
                break;
            case "help":
                logMessage("get_score");
                logMessage("clear");
                logMessage("time increment [optional:count]");
                logMessage("score [quaffle|snitch] [H|A]");
                logMessage("next_round")
                break;
            default:
                logMessage("Unknown command:" + command);
            
        }
    }

    // Listen for Enter key press in the input field
    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            handleInput();
        }
    });
    
});