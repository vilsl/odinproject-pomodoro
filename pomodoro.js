/*
Simple pomodoro timer. Homework from The Odin Project. 
Do what you want with it. Disclaimer: It does not count completely accurately. -jitsedefault
*/

let seconds = 0;
let minutes = 25; // How long should the work time be
let currentRound = 1;
let breakLength = 5;
let maxRounds = 5; // How many rounds of work minutes

let intervalType = "Work!";

let counter;

// Takes input and acts accordingly
function pomInput(button){
    switch (button){
        case "Start":
            counter = setInterval(countdown, 1000);
    }
}

// Counts down a custom interval, alternates breaks etc.
function countdown(){
    seconds -= 1;
    if (currentRound == maxRounds){ // If entire sequence is finished, stop counter
        clearInterval(counter);
    }
    else if (seconds <= 0 && minutes != 0){ // Count down minutes
        minutes -= 1;
        seconds = 5; 
    }
    else if (seconds == 0 && minutes == 0 && intervalType == "Work!"){ // Relax
        currentRound += 1;
        minutes = 5;
        document.title = intervalType; 
    }
    else if (seconds == 0 && minutes == 0 && intervalType == "Take a break."){ // Start working again
        minutes = 25;
        document.title = intervalType; 
    }
    updateDisplay();
}

function updateDisplay(){
    if (currentRound == maxRounds){ // If entire sequence is finished, stop counter
        intervalType = "Well done. You finished all the rounds!";
        document.getElementById("timerDisplay").innerHTML = "0:00";
        alert("You're done!");
    }
    else {
        document.getElementById("timerDisplay").innerHTML = minutes + ":" + seconds;
        document.title = intervalType + " - " + minutes + ":" + seconds;
    }
    document.getElementById("intervalType").innerHTML = intervalType;
    document.getElementById("rounds").innerHTML = "Round:" + currentRound + "/" + maxRounds;
    
}