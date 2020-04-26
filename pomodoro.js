/*
Simple pomodoro timer. Homework from The Odin Project. Do what you want with it. 
Disclaimer: It does not count completely accurately. -vilsl
*/

// Counter variables
let seconds = 60;
let minutes = 25; 
let currentRound = 1;

let intervalType = "Work!";
let counter = false;

// Length variables
let intervals = 5 // Rounds of work
let breakLength = 5; // Break length in minutes
let workLength = 25; // Work length in minutes

// Ask for notification permissions
document.addEventListener('DOMContentLoaded', function() {
    if (!("Notification" in window)) {
        return;
    }
    else if (Notification.permission !== "granted")
        Notification.requestPermission();
   });

// Issue alerts to the user
function notifyUser(message){
    if (!("Notification" in window)) {
        return;
    }
    else {
        // Check if notifications have been granted
        if (Notification.permission === "granted"){
            let notify = new Notification(message);
        }
        else {
            return;
        }
    }
}

// Control buttons for the timer. Pause/start/reset
function controlInput(button){
    switch (button){
        case "start":
            if (minutes > 0){
                minutes -= 1;
            }
            counter = setInterval(countdown, 1000);
            break;
        case "pause":
            clearInterval(counter);
            break;
        case "reset":
            resetTimer();
            updateTimer()
    }
}

// Adjusts duration of work, breaks, intervals
function durationInput(button){
    if (counter == false){
        switch (button){
            case "workUp":
                workLength += 1;
                minutes = workLength;
                document.getElementById("timerDisplay").innerHTML = "00:00"
                break;
            case "workDown":
                if (workLength <= 1){
                    break;
                }
                workLength -= 1;
                minutes = workLength;
                break;
            case "breakUp":
                breakLength += 1;
                break;
            case "breakDown":
                if (breakLength <= 1){
                    break;
                }
                breakLength -= 1;
                break;
            case "intervalUp":
                intervals += 1;
                break;
            case "intervalDown":
                if (intervals <= 1){
                    break;
                }
                intervals -= 1;
                break;
        }
    }
    updateTimer();
}

// Counts down for x intervals, alternates breaks
function countdown(){
    seconds -= 1;
    // If entire sequence is finished, stop counter
    if (currentRound == intervals && minutes == 0 && seconds == 0){ 
        clearInterval(counter);
    }
    else if (seconds == 0 && intervalType == "Work!"){ // Break time
        currentRound += 1;
        minutes = breakLength;
        intervalType = "Take a break.";
        document.title = intervalType; 
        notifyUser("Take a break.");
    }
    else if (seconds == 0 && intervalType == "Take a break."){ // Start working again
        minutes = workLength;
        intervalType = "Work!";
        document.title = intervalType; 
        notifyUser("Time to work!");
    }
    else if (seconds <= 0){ // Count down minutes
        minutes -= 1;
        seconds = 60;
    }
    updateTimer();
}

// Updates the timer UI
function updateTimer(){
    // If counter is not active
    if (counter == false){ 
        if (workLength < 10){ // Add leading 0 if needed
            document.getElementById("timerDisplay").innerHTML = "0" + workLength + ":00";
        }
        else {
            document.getElementById("timerDisplay").innerHTML = workLength + ":00";
        }
        document.getElementById("workLength").innerHTML = workLength;
        document.getElementById("breakLength").innerHTML = breakLength;
        document.getElementById("intervalsLength").innerHTML = intervals;
    }
    // If counter is active
    else { 
        let display = "";
        // If entire sequence is finished, stop counter
        if (currentRound == intervals && minutes == 0 && seconds == 0){ 
            intervalType = "Well done. You finished all the rounds!";
            document.getElementById("timerDisplay").innerHTML = "00:00";
            notifyUser("Well done. You finished all the rounds!");
        }
        else if (seconds == 60){ // Make it 23:00 instead of jumping straight to 22:59
            if (minutes < 10){ // Leading 0 for minutes if necessary
                display = "0" + (minutes+1) + ":" + "00";
            }
            else if (minutes == 0 && intervalType == "Take a break.") {
                display = "01" + ":" + "00";
            }
            else {
                display = (minutes+1) + ":" + "00";
            }
        }
        else { // Check if leading 0 is necessary
            if (minutes < 10){ // Add leading 0 if needed for minutes and/or seconds
                if (seconds < 10){
                   display = addLeadingZero(display,3);
                }
                else {
                    display = addLeadingZero(display,0);
                }
            }
            else if (seconds < 10) { // Add leading 0 if necessary for seconds only
                display = addLeadingZero(display,1);
            }
            else { // No leading 0 necessary
                display = minutes + ":" + seconds;
            }
        } 
        // Update display and tab title
        document.getElementById("timerDisplay").innerHTML = display;
        document.title = intervalType + " - " + display;
        
        // Update work status and  current round
        document.getElementById("intervalType").innerHTML = intervalType;
        document.getElementById("rounds").innerHTML = "Round: " + currentRound + " / " + intervals;  
    }
}

// Adds a leading zero for minute or seconds or both
function addLeadingZero(display, minuteorseconds){
    if (minuteorseconds == 0){ // return leading minute
        display = "0" + minutes + ":" + seconds;
    }
    else if (minuteorseconds == 1){ // return leading seconds
        display = minutes + ":" + "0" + seconds;
    }
    else if (minuteorseconds == 3) { // return leading minute and seconds
        display = "0" + minutes + ":" + "0" + seconds;
    }
    return display;
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
    document.title = "pomodoro.js";
}