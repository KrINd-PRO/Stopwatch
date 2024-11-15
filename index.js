//Simple Stopwatch

let Start_Button = document.getElementById("Start_Button");
let Stop_Button = document.getElementById("Stop_Button");
let Reset_Button = document.getElementById("Reset_Button");
let Top_Result_Time = document.getElementById("Top_Result_Time");

let display = document.getElementById("display");
let Timer = null;
let Start_Time = 0;
let Elapsed_Time = 0;
let Is_Running = true;

Start_Button.onclick = function Start(){
    if(Is_Running){
        Start_Time = Date.now() - Elapsed_Time;
        Timer = setInterval(ubdate, 10);
    }
}

Stop_Button.onclick = function Stop(){
    if(Is_Running){
        clearInterval(Timer);
        Elapsed_Time = Date.now() - Start_Time;
        Is_Running = true;

        Top_Result_Time.textContent = display.textContent;
    }
}

Reset_Button.onclick = function Reset(){
    clearInterval(Timer);
    display.textContent = `00:00:00:00`;
    Start_Time = 0;
    Elapsed_Time = 0;
    Is_Running = true;
}

function ubdate(){
    const Current_Time = Date.now();
    Elapsed_Time = Current_Time - Start_Time;

    let Hours = Math.floor(Elapsed_Time / (1000 * 60 *60));
    Hours = String(Hours).padStart(2, "0");
    let Minutes = Math.floor(Elapsed_Time / (1000 * 60) % 60);
    Minutes = String(Minutes).padStart(2, "0");
    let Seconds = Math.floor(Elapsed_Time / 1000 % 60);
    Seconds = String(Seconds).padStart(2, "0");
    let Milliseconds = Math.floor(Elapsed_Time % 1000 / 10);
    Milliseconds = String(Milliseconds).padStart(2, "0");

    display.textContent = `${Hours}:${Minutes}:${Seconds}:${Milliseconds}`;
}