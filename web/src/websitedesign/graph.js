/*var graph = document.getElementById('mainGraph');

var ctx = graph.getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});
//myChart.render()
*/

var dataTemp = {
    Temperature : {
        name: "Temperature",
        key: 0,
        data: [100,54,76,12,83,23],
        color : "rgb(255, 0, 0)"
    },
    Densité : {
        name: "Densité",
        key: 0,
        data: [32,25,10,100,34,76],
        color : "rgb(0, 255, 0)"
    },
    Hauteur : {
        name: "Hauteur",
        key: 0,
        data: [15,50,38,25,50,24],
        color : "rgb(0, 0, 255)"
    },
    Densité2 : {
        name: "Densité2",
        key: 0,
        data: [5,2],
        color : "rgb(0, 100, 100)"
    },
    Hauteur2 : {
        name: "Hauteur2",
        key: 0,
        data: [45,80,38,45,10,54],
        color : "rgb(100, 0, 100)"
    }
}
var keys = Object.keys(dataTemp);

var ctx = document.getElementById('mainGraph').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['0'],
        datasets: []
    },

    // Configuration options go here
    options: {
        'onClick' : function (evt, item) {
        console.log("Update VARIANCE MIN MAX ECT")
    }
}
});

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
const options = {
    clean: true, // retain session
    connectTimeout: 4000, // Timeout period
    // Authentication information
    clientId: 'emqx_test',
    username: 'emqx_test',
    password: 'emqx_test',
}

// Connect string, and specify the connection method by the protocol
// ws Unencrypted WebSocket connection
// wss Encrypted WebSocket connection
// mqtt Unencrypted TCP connection
// mqtts Encrypted TCP connection
// wxs WeChat applet connection
// alis Alipay applet connection
const connectUrl = 'wss://broker.emqx.io:8084/mqtt'
const client = mqtt.connect(connectUrl, options)


function pub(){
    client.subscribe('presence', function (err) {
        if (!err) {
            var id = 2;
            var type = "Temperature"
            var data = Math.floor(Math.random() * 3);
            var concat = '{"id":'+id+',"'+type+'":'+data+'}'
            client.publish('presence',concat.toString())
        }
    })
    client.subscribe('presence', function (err) {
        if (!err) {
            var id = 1;
            var type = "Humidity"
            var data = Math.floor(Math.random() * 3);
            var concat = '{"id":'+id+',"'+type+'":'+data+'}'
            client.publish('presence',concat.toString())
        }
    })
    client.subscribe('presence', function (err) {
        if (!err) {
            var id = 1;
            var type = "Temperature"
            var data = Math.floor(Math.random() * 3);
            var concat = '{"id":'+id+',"'+type+'":'+data+'}'
            client.publish('presence',concat.toString())
        }
    })
}


client.on('message', function (topic, message) {
    // message is Buffer
    processing(message.toString());
    //client.end()
})

function display(graph){
    if (document.getElementById(graph).checked == true){
        var newDataset = {
            label: 'Dataset ' + graph,
            borderColor: dataTemp[graph].color,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            data: dataTemp[graph].data,
            fill: false
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
}

var reg = new Register()
function processing(requete)
{
    const obj = JSON.parse(requete)
    var key
    for(key in obj)
    {
        if(key == "id")
        {
            reg.addSensor(new Sensor(obj.id))
        }else
        {
            reg.Sensors.get(obj.id).addValue(key,obj[key])
        }
    }
}

//Partie Capteur
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
                this.dataset.get(type+number).push([data,Date.now()])
            });
        }else if(!(this.dataset.has(type)))
        {
            this.dataset.set(type, new Array())
            this.dataset.get(type).push([value,Date.now()])
            AddTypeToCapteur(id,type)
        }else
        this.dataset.get(type).push([value,Date.now()])

        if(placementChart.has(id+type))
        {
            chart.data.datasets[placementChart.get(id+type)].data.push(value);
            chart.update()
        }


    }
}

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

function getAllDataFromASensor(id,type){
    var toReturn = []
    var length = reg.Sensors.get(id).dataset.get(type).length
    for (let index = 0; index < length; index++) {
        toReturn.push(reg.Sensors.get(id).dataset.get(type)[index][0])
        
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

setInterval(" pub()", 5000);

setInterval("chart.data.labels.push(new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds());chart.update();", 2000);