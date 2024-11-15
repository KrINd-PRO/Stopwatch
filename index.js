//Simple Stopwatch

let Start_Button = document.getElementById("Start_Button");
let Stop_Button = document.getElementById("Stop_Button");
let Reset_Button = document.getElementById("Reset_Button");
let Top_Result_Time = document.getElementById("Top_Result_Time");

let display = document.getElementById("display");
let Timer = null;
let Start_Time = 0;
let Elapsed_Time = 0;
let Which_Button = 0;

let Top_Time ="00:00:00:00";
let Time_Parts;
let Fake_Top_Time = "00:00:00:00";
let Fake_Time_Parts;
let First_Top_Time = true;

Start_Button.onclick = function Start(){
    if(Which_Button === 0){
        Start_Time = Date.now() - Elapsed_Time;
        Timer = setInterval(ubdate, 10);
        Which_Button = 1;
    }
}

Stop_Button.onclick = function Stop(){
    if(Which_Button === 1){
        clearInterval(Timer);
        Elapsed_Time = Date.now() - Start_Time;

        Top_Time = Time_Parts.join(":");
        Fake_Top_Time = Fake_Time_Parts.join(":");

        const Time_1 = timeToMinutes(Top_Time);
        const Time_2 = timeToMinutes(Fake_Top_Time);
        
        First_Top_Time = false;

        if(Time_1 >= Time_2){
            Top_Result_Time.textContent = Fake_Top_Time;
            Top_Time = Fake_Top_Time;
        }

        Which_Button = 0;
    }
}

Reset_Button.onclick = function Reset(){
    clearInterval(Timer);
    display.textContent = `00:00:00:00`;
    Start_Time = 0;
    Elapsed_Time = 0;
    Which_Button = 0;
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

    Fake_Time_Parts = Fake_Top_Time.split(':');
    Time_Parts = Top_Time.split(':');

    Fake_Time_Parts[0] = Hours;
    Fake_Time_Parts[1] = Minutes;
    Fake_Time_Parts[2] = Seconds;
    Fake_Time_Parts[3] = Milliseconds;

    if(First_Top_Time){Time_Parts[0] = Hours;}
    if(First_Top_Time){Time_Parts[1] = Minutes;}
    if(First_Top_Time){Time_Parts[2] = Seconds;}
    if(First_Top_Time){Time_Parts[3] = Milliseconds;}
}

// Function to convert time to total minutes
function timeToMinutes(timeStr){
    const timeParts = timeStr.split(':').map(Number);
  
    let milliseconds = 0;
  
    if (timeParts.length === 4) {
      milliseconds = timeParts.pop();
    }
    
    const [hours, minutes, seconds] = timeParts;
  
    const totalMinutes = hours * 60 + minutes + seconds / 60 + milliseconds / 60000;

    return totalMinutes;
}