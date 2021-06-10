var reg = new Register()

var ctx = document.getElementById('mainGraph').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["0"],
        datasets: []
    },
    
    // Configuration options go here
    options: {
        scales: {
        yAxes: [{
                            display: true,
                            ticks: {
                                min: 0,
                                steps: 10,
                                stepValue: 5,
                                max: 150
                            }
                        }]
        },
         plugins: {
          zoom: {
            zoom: {
              enabled: true,
              mode: 'xy'
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
    }

});

document.getElementById("resetbtn").addEventListener('click', function() { 
            chart.resetZoom(); 
        }, 
false);
    

function Register() {
    this.Sensors = new Map()
    this.addSensor = function(Sensor_object)
    {
        if(!(this.Sensors.has(Sensor_object.id)))
        {
            this.Sensors.set(Sensor_object.id,Sensor_object)
            AddCapteur(Sensor_object.id)
        }
    }
}

function Sensor(id) {
    this.id = id;
    this.dataset = new Map();
    this.addValue = function(type,value){
        if(typeof(value) == "object")
        {
            var number = 0
            value.forEach(data => {
                number = number+1
                if(!(this.dataset.has(type+number)))
                    {
                        this.dataset.set(type+number, new Array())

                    }
                this.dataset.get(type+number).push([data])
            });
        }else if(!(this.dataset.has(type)))
        {
            this.dataset.set(type, new Array())
            for (let index = 0; index < chart.data.labels.length; index++) {
                this.dataset.get(type).push("null")
            }
            this.dataset.get(type).push([value])
            AddTypeToCapteur(id,type)
        }else
        this.dataset.get(type).push([value])

        if(placementChart.has(id+type))
        {
            chart.data.datasets[placementChart.get(id+type)].data.push(value);
            chart.update()
        }
    }
}



function addValue(value){
    chart.data.labels.push(chart.data.datasets[0].data.length);
    chart.data.datasets[0].data.push(value);
    chart.update();
}
function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}


/*function display(graph){
    if (document.getElementById(graph).checked == true){
        var newDataset = {
            label: 'Dataset ' + graph,
            borderColor: dataTemp[graph].color,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: dataTemp[graph].data,
            fill: false,
            spanGaps: true,
        };

        chart.data.datasets.push(newDataset);
        chart.update();
        dataTemp[graph].key = chart.data.datasets.length - 1
    } else {

        chart.data.datasets.splice(dataTemp[graph].key,1);
        chart.update();
        for (var i = 0; i < keys.length - 1; i++){
            console.log(dataTemp[keys[i]].key);
        }
        for (var i = 0; i < keys.length - 1; i++){
            if(dataTemp[keys[i]].key > dataTemp[graph].key) {
                dataTemp[keys[i]].key -= 1;
            }
        }
    }
}*/

function getAllDataFromASensor(id,type){
    var toReturn = []
    var length = reg.Sensors.get(id).dataset.get(type).length
    for (let index = 0; index < length; index++) {
            toReturn.push(reg.Sensors.get(id).dataset.get(type)[index][0])
    }
    return toReturn
}

function getAllDataFromASensorWithoutNull(id,type){
    var toReturn = []
    var length = reg.Sensors.get(id).dataset.get(type).length
    for (let index = 0; index < length; index++) {
        if(reg.Sensors.get(id).dataset.get(type)[index] != "null")
        {
            toReturn.push(reg.Sensors.get(id).dataset.get(type)[index][0])
        }

    }
    return toReturn
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


//Par Charlie Coleman | J'ai récupéré son code sur son site "charlie-coleman.com", je me devais de le dire :)
function getCorrectColor(color) { //Function to turn the string into a color. Most important function. Enter the math factory.
    color = color.replace(/\s+/g, '');
    color = color.replace(/[^a-zA-Z 0-9]+/g, '');
    var lengthC = color.length; //length of the string
    var amount = Math.ceil(lengthC/3); //Determine length of the 3 parts that will define R, G, and B
    var add = amount*3 - lengthC; //Determine how many characters need to be added to reach the length needed
    if(color.length > add) //if the string is longer than the number of characters to be added (if length != 1, basically)
        color+=color.substring(0, add); //x is the number of characters to be added, takes x characters from the start of the string and adds them to the end.
    else { //if length == 1, basically
        for(var i = 0; i < add; i++) {
            color += color.substring(0,1); //adds the first charecter until you have enough charecters
        }
    }
    var red36 = color.substring(0, amount); //splits the string into 3 sections of equal length
    var green36 = color.substring(amount, amount*2);
    var blue36 = color.substring(amount*2, amount*3);
    if(red36 == '')
        red36 = '0';
    if(green36 =='')
        green36 = '0';
    if(blue36 == '')
        blue36 = '0';
    var red = parseInt(red36,36); //Turns the numbers from base-36 to base-10 (decimal)
    var green = parseInt(green36,36);
    var blue = parseInt(blue36,36);
    var max = Math.pow(36,amount)-1; // calculates the maximum possible value for a base-36 number of the length that each of the sections is
    if(max == 0)
        max = 1;
    var red16 = Math.round((red/max)*255).toString(16); //scales each value down to fit between 0 and 255, then converts them to base-16 (hexadecimal)
    var green16 = Math.round((green/max)*255).toString(16);
    var blue16 = Math.round((blue/max)*255).toString(16);
    if(red16.length < 2) //makes sure all 3 parts are 2 digits long
        red16 = "0" + red16;
    if(green16.length < 2)
        green16 = "0" + green16;
    if(blue16.length < 2)
        blue16 = "0" + blue16;
    var newColor = "#"+red16+green16+blue16; //creates the color
    return newColor; //returns the color
};
