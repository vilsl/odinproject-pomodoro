/*
Simple pomodoro timer. Homework from The Odin Project. 
Do what you want with it. Disclaimer: It does not count completely accurately. -jitsedefault
*/

// Counter variables
let seconds = 0;
let minutes = 25; 
let currentRound = 1;

let intervalType = "Work!";
let counter = false;

// Length variables
let intervals = 5; // Rounds of work
let breakLength = 5; // Break length in minutes
let workLength = 25; // Work length in minutes

// Control buttons for the timer. Pause/start etc.
function controlInput(button){
    switch (button){
        case "start":
            counter = setInterval(countdown, 1000);
            break;
        case "pause":
            clearInterval(counter);
            break;
        case "reset":
            resetTimer();
            updateTimer()
            break;
    }
}
// Adjusts duration of work, breaks etc.
function durationInput(button){
    if (counter == false){
        switch (button){
            case "workUp":
                workLength += 1;
                minutes = workLength;
                document.getElementById("timerDisplay").innerHTML = "0:00"
                break;
            case "workDown":
                workLength -= 1;
                minutes = workLength;
                break;
            case "breakUp":
                breakLength += 1;
                break;
            case "breakDown":
                breakLength -= 1;
                break;
            case "intervalUp":
                intervals += 1;
                break;
            case "intervalDown":
                intervals -= 1;
                break;
        }
    }
    updateTimer();
}

// Counts down a custom interval, alternates breaks etc.
function countdown(){
    seconds -= 1;
    if (currentRound == intervals){ // If entire sequence is finished, stop counter
        clearInterval(counter);
        alert("You're done!");
    }
    else if (seconds <= 0 && minutes != 0){ // Count down minutes
        minutes -= 1;
        seconds = 59; 
    }
    else if (seconds == 0 && minutes == 0 && intervalType == "Work!"){ // Relax
        currentRound += 1;
        minutes = breakLength;
        intervalType = "Take a break.";
        document.title = intervalType; 
    }
    else if (seconds == 0 && minutes == 0 && intervalType == "Take a break."){ // Start working again
        minutes = workLength;
        intervalType = "Work!";
        document.title = intervalType; 
    }
    updateTimer();
}

// Updates the timer UI
function updateTimer(){
    // If counter is not active
    if (counter == false){ 
        document.getElementById("workLength").innerHTML = workLength;
        document.getElementById("timerDisplay").innerHTML = workLength + ":00";
        document.getElementById("breakLength").innerHTML = breakLength;
        document.getElementById("intervalsLength").innerHTML = intervals;
    }
    // If counter is active
    else { 
        if (currentRound == intervals){ // If entire sequence is finished, stop counter
            intervalType = "Well done. You finished all the rounds!";
            document.getElementById("timerDisplay").innerHTML = "0:00";
        }
        else {
            document.getElementById("timerDisplay").innerHTML = minutes + ":" + seconds;
            document.title = intervalType + " - " + minutes + ":" + seconds;
        }
        document.getElementById("intervalType").innerHTML = intervalType;
        document.getElementById("rounds").innerHTML = "Round: " + currentRound + " / " + intervals;  
    }
}

// Resets everything
function resetTimer(){
    clearInterval(counter);
    seconds = 0;
    minutes = 25; 
    currentRound = 1;
    intervalType = "Work!";
    counter = false;
    intervals = 5; 
    breakLength = 5; 
    workLength = 25; 
    document.getElementById("intervalType").innerHTML = "pomodoro.js";
}