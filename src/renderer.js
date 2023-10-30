import {Match,Teams} from './Match.js';

document.addEventListener("DOMContentLoaded", function () {
    
    let currmatch = new Match();

    document.getElementById("b1").addEventListener("click", function() {
        currmatch.scoreQuaffle(Teams.Home);
        console.log("New Home Score:" + currmatch.getScores().teamHomeScore);
    });

    document.getElementById("b2").addEventListener("click", function() {
        currmatch.scoreQuaffle(Teams.Away);
        console.log("New Away Score:" + currmatch.getScores().teamAwayScore);
    });

    document.getElementById("b3").addEventListener("click", function() {
        currmatch.incrementTime();
        console.log("New Time:" + currmatch.getScores().currentTime);
    });

    document.getElementById("b4").addEventListener("click", function() {
        currmatch.incrementTimeMulti(890);
        console.log("New Time:" + currmatch.getScores().currentTime);
    });

    document.getElementById("b5").addEventListener("click", function() {
        console.log(currmatch.getScores());
    });

    


});