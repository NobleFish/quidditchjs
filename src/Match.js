export const maxTime = 90 * 60;

export const Teams = {
    Home: Symbol("home"),
    Away: Symbol("away")
};

export class Match {
    
    constructor() {
      this.teamHomeScore = 0;
      this.teamAwayScore = 0;
      // in seconds  
      this.currTime = 0;
      // 900 actions in a 90' game 
      this.remainingActions = 900;
    }
    
    isMatchOver(){
        return (this.remainingActions <= 0);
    }

    incrementTime(){
        if(this.isMatchOver()){
            console.log("Cannot increment time: Match is over");
            return;
        }
        
        this.currTime += 6;
        this.remainingActions--;
    }

    incrementTimeMulti(ticks){
        for(let i = 0; i < ticks; i++){
            this.incrementTime();
        }
    }
    
    scoreQuaffle(team){
        if(this.isMatchOver()){
            console.log("Cannot Score: Match is over");
            return;
        }

        if(team == Teams.Home){
            this.teamHomeScore += 10;
        }
        else if(team == Teams.Away){
            this.teamAwayScore += 10;
        }
        else{
            console.log("No team defined: " + team);
        }
    }


    // Method to get the scores of both teams
    getScores() {
      return {
        teamHomeScore: this.teamHomeScore,
        teamAwayScore: this.teamAwayScore,
        currentTime: this.currTime/60
      };
    }
  }