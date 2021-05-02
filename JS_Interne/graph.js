var reg = new Register()
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
        responsive: true,
        maintainAspectRatio: false
    }

});

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









 /*function pub(){
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
} */



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

