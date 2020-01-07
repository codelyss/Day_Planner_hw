var NineAM = document.getElementById('9AM');
var TenAM = document.getElementById('10AM');
var ElevenAM = document.getElementById('11AM');
var TwelvePM = document.getElementById('12PM');
var OnePM = document.getElementById('1PM');
var TwoPM = document.getElementById('2PM');
var ThreePM = document.getElementById('3PM');
var FourPM = document.getElementById('4PM');
var FivePM = document.getElementById('5PM');

var txt9 = document.getElementById('txt9');
var txt10 = document.getElementById('txt10');
var txt11 = document.getElementById('txt11');
var txt12 = document.getElementById('txt12');
var txt13 = document.getElementById('txt13');
var txt14 = document.getElementById('txt14');
var txt15 = document.getElementById('txt15');
var txt16 = document.getElementById('txt16');
var txt17 = document.getElementById('txt17');

var containers = [NineAM, TenAM, ElevenAM, TwelvePM, OnePM, TwoPM, ThreePM, FourPM, FivePM];
var textboxes = [txt9, txt10, txt11, txt12, txt13, txt14, txt15, txt16, txt17];

var datepicker = document.getElementById('datepicker');

InitializeAgenda();
SetTimeColors();

// Display current date when page load
function InitializeAgenda() {
    datepicker.valueAsDate = new Date('2020-01-06');
    LoadAgenda();
}

// Determine past, present, or future by different color
function SetTimeColors () {

    var rightNow = moment(); 
    var rightNowNoMinutes = moment().startOf('hour');

    //var rightNow = moment().startOf('day').add(13, 'h');
    //var rightNowNoMinutes = moment().startOf('day').add(13, 'h');

    for (i = 0; i < containers.length; i++) {
        var hr = i + 9;
        var thisDate = moment(datepicker.value).startOf('day');  
        var compareDate = thisDate.add(hr, 'hours'); 

        if (rightNowNoMinutes.toString() == compareDate.toString()) {
            //console.log('right now is right now');
            containers[i].className = "now";
        }
        else if (rightNow > compareDate) {
            //console.log('right now is in the past of' + compareDate);
            containers[i].className = "pastday";
        }
        else {
            //console.log('right now is in the future from ' + compareDate);
            containers[i].className = "futureday";
        }

        //console.log(compareDate);
    }
}

function LoadAgenda() {
    SetTimeColors();

   
    for (i = 0; i < textboxes.length; i++) {
        textboxes[i].value = "";
    }

    var inputValues = localStorage.getItem(datepicker.value);
    if (inputValues != null) {
        var allTheValues = inputValues.split(";");
        for (i = 0; i < allTheValues.length; i++) {
            var thisValue = allTheValues[i].split(":");
            //console.log("On " + thisValue[0] + " at hour " + thisValue[1] + " this happened: " + thisValue[2]);
            textboxes[i].value = thisValue[2];
        }
    }

}

function SaveAgenda() {
    var inputValues = "";
    for (i = 0; i < textboxes.length; i++) {
        var hr = i + 9;
        var txt = textboxes[i].value;
        inputValues += datepicker.value + ":" + hr + ":" + txt + ";";
    }
    inputValues = inputValues.substring(0, inputValues.length - 1);

    localStorage.setItem(datepicker.value, inputValues);
}