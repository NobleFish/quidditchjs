document.addEventListener("DOMContentLoaded", function () {
    const consoleElement = document.getElementById("console");
    const clearButton = document.getElementById("clear-button");
    const button1 = document.getElementById("button1");
    const button2 = document.getElementById("button2");
    const button3 = document.getElementById("button3");

    let counters = [0,0,0];
    let mysteries = ["K̷̰̈́̇́n̴̖͎̓̓́o̸̮̘̺̿̌͂ẉ̶̘̍̓ĭ̷̥͙̙̉n̵͇̠̬̚g̴̣͔̅","T̷̖̜̖̙̝͍̱̄̇͠h̴̡̡͙͙̫͔̬̺̞͓̻̊̾̀͗̓͊͒̌̑̑͘ͅȇ̸̡̪̠̯̹͈̜͕̣̬̗̈́̐ ̵̳͚̦͉̳͙̳̥̗̹̞̳̣͌͂̽̔͛͊̍̄̎̓̚̕̕V̴̡̥͔͊̅̒̉̂̋̾̍̍͒͐̀́͠ǫ̷̜̠̥̫̼̙͖̥͍̲͉̟͙̔̀̊͜͠ȋ̶̪̩̍͌̈́̒̃̒͒͐̋͆͘͠d̵̡̛͇̠͖͕͎̗̐̈̂̊͌̌̓̈́͌͘ ̷̢̖͙͓͇͎̹̦̜̙̠̫̀̀̐̈́̋̊̄̑͊͒͆̕͝͝͝ì̵͉̤͍̦͉̻͚̀̇̒ş̴̧͙̤̩̱͓̟̹̻͚̮͔́̓̀̓͗́͜ͅ ̵̨̧̜̰͓̀͐́̈́̐̅͘͜͝W̵̟̦̓͛̂̒͊̑̅̑̑̈́̎̉̔̅͜͠ā̷̢̡̞̤͓̥̌̃̐ͅt̸̡̡̥̭̙̲̗͕͍̫̤̦̲͊ͅc̶̮͒͝h̵̹̞̩̒͛͛̈́̑͘ỉ̶̛͚͔̞̱̬̹̗̙̪̮͆͒̔̈́̍͋͆̌͜ņ̸̹̤̭̙̩̻̿̽̐̈́̈̇̄͌͆̅̌͘͘͝g̸̰̬̞̫̽͋̌͋̈͜."]

    function writeToConsole(message) {
        consoleElement.innerText += message + "\n";
    }

    clearButton.addEventListener("click", function () {
        consoleElement.innerText = ""; // Clear the console
        //writeToConsole(counters);
        counters = [0,0,0];
    });

    button1.addEventListener("click", function () {
        writeToConsole("Binary whispers.");
        counters[0]++;
    });

    button2.addEventListener("click", function () {
        writeToConsole("Secrets encoded in light.");
        counters[1]++;
        
    });

    button3.addEventListener("click", function () {
        writeToConsole("Mystery's embrace.");
        counters[2]++;

        let sum = counters[0] + counters[1] + counters[2];
        if((sum%6) == 0){
            writeToConsole(mysteries[(counters[0]%2)]);
        }
    });

});