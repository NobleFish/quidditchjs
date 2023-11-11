export class CommandConsole
{
    /* 
    
    // Required in .html
    <div id="console"></div>
    <input id="input" type="text" autofocus /><br />

    // Required in renderer.js
    const consoleDiv = document.getElementById('console');
    const input = document.getElementById('input');

    */
    
    constructor(outputElement,inputElement, initialText)
    {
        this.commandsPerLine = 7; // Configurable 
        this.consoleOut = outputElement;
        this.consoleIn = inputElement;
        this.commandRegistry = {};
        this.commandHistory = [];
        this.historyIndex = 0;
        this.maxHistorySize = 20; // Configurable

        // Listen for Enter key press in the input field
        this.consoleIn.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.handleInput();
            }
        });

        // Function to handle up and down arrow keys for command history
        this.consoleIn.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' && this.historyIndex > 0) {
                this.historyIndex--;
                this.consoleIn.value = this.commandHistory[this.historyIndex];
            } else if (event.key === 'ArrowDown' && this.historyIndex < this.commandHistory.length) {
                this.historyIndex++;
                this.consoleIn.value = this.commandHistory[this.historyIndex] || '';
            }

            if (event.key === 'Tab') {
                event.preventDefault();
                this.performTabAutocomplete();
            }

        });

        if(initialText){
            if(typeof initialText != "boolean"){
                this.log(initialText);
            }
        }
        else{
            this.log("Type 'commands' to see what commands you can use!")
        }

        // Pre-defined commands
        this.register('clear', () => {this.clearConsole(); return 0;}, "clear - clears console");
        this.register('commands',() => {this.listCommands(); return 0;}, "commands - lists all console commands")
        this.register('help',(args) => {
            if(args[0] == null){return 1;}
            const pass = args[0];
            this.fetchUsage(pass); 
            return 0;
        }, "help [command] - gives information on the command")
        
    }

    // Pre-process of commands from consoleIn
    handleInput() {
        const command = this.consoleIn.value.trim();
        this.log(`> ${command}`); // Display the entered command
        this.processCommand(command); // Call the function with the entered command
        this.consoleIn.value = ''; // Clear the input field
    }

    // Registers a command by command name, runs the command function on process, and has usage text
    register(commandName, commandFunction, commandUsage){
        // Removes whitespace from command name
        commandName = commandName.trim();
        
        if(commandName.indexOf(' ') >= 0){
            console.error(commandName+" is invalid command name")
        }
        else if(!this.inRegistry(commandName)){
            if(typeof commandFunction == "function"){
                this.commandRegistry[commandName] = commandFunction;
                if (commandUsage) {
                    this.commandRegistry[`${commandName}-usage-text`] = commandUsage;
                }
                else{
                    console.warn(commandName+ " has been registered without usage text")
                }
            }
            else{
                console.error(commandName+" cannot have null or undefined function")
            }
        }
        else{
            console.error(commandName+" has already been registered");
        }
    }

    // Helper function to see if a command is in the registry
    inRegistry(command){
        if(this.commandRegistry[command]){
            return true;
        }
        return false;
    }

    // Processes command from command registry
    processCommand(command){
        // Stores the command into history
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        // Trim history if it exceeds the maximum size
        if (this.commandHistory.length > this.maxHistorySize) {
            this.commandHistory.shift();
        }

        const [commandName, ...args] = command.split(' ');
        const commandFunction = this.commandRegistry[commandName];
        
        if (commandFunction) {
            const result = commandFunction(args);
            if(result === 1){
                const commandUsageText = this.commandRegistry[`${commandName}-usage-text`];
                this.log(commandUsageText);
            }
        }
        else {
            this.log(`Command not found: ${commandName}`);
        }
    }

    // Logs the usage text from registry
    fetchUsage(cmd){
        if(this.commandRegistry[cmd]){
            let commandUsageText = cmd+"-usage-text";
            const usageText = this.commandRegistry[commandUsageText];
            if(usageText){
                this.log(usageText);
            }
            else{
                this.log(`No usage text for: ${cmd}`);
            }
            
        }
        else{
            this.log(`Command not found: ${cmd}`);
        }
    }
    
    // Function to list the registered commands
    listCommands() {
        const commandNames = Object.keys(this.commandRegistry);
        const matches = commandNames
            .filter((name) => !name.endsWith('-usage-text'));
        
        this.log(':~ Registered Commands ~:');
        
        for (let i = 0; i < matches.length; i += this.commandsPerLine) {
            const group = matches.slice(i, i + this.commandsPerLine).join('\t');
            this.log(group);
        }

    }

    // Clears all text from consoleOut
    clearConsole(){
        while (this.consoleOut.firstChild) {
            this.consoleOut.removeChild(this.consoleOut.firstChild);
        }
    }

    // Writes message to consoleOut
    log(message){
        const p = document.createElement('p');
        p.textContent = message;
        this.consoleOut.appendChild(p);
        this.consoleOut.scrollTop = this.consoleOut.scrollHeight;
    }
 
    // Function to perform tab autocomplete
    performTabAutocomplete() {
        const currentInput = this.consoleIn.value;
        const commandNames = Object.keys(this.commandRegistry);
        const matches = commandNames
            .filter((name) => name.startsWith(currentInput) && !name.endsWith('-usage-text'));

        if (matches.length === 1) {
            // If there's a single match, autocomplete the input
            this.consoleIn.value = matches[0];
        } else if (matches.length > 0) {
            // Display suggestions in groups of five
            this.log('Possible completions:');
            for (let i = 0; i < matches.length; i += this.commandsPerLine) {
                const group = matches.slice(i, i + this.commandsPerLine).join('\t');
                this.log(group);
            }
    }
    }

}