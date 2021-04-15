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
            data: [12,65,40,30,74,66],
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
                labels: [0,1],
                datasets: []
            },

            // Configuration options go here
            options: {
                // This chart will not respond to mousemove, etc
                events: ['click']
            }
        });

document.getElementById("mainGraph").onclick = function(evt){
    var activePoints = chart.getElementsAtEvent(evt);
    // use _datasetIndex and _index from each element of the activePoints array
    console.log(activePoints)
};

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

        /*
        function addValue(value){
            
            chart.data.datasets[0].data.push(value);
            chart.update();
        }
        */
window.onload = function start() {
    increment();
    publishMsg();
}
function increment() {
    window.setInterval(function () {
        chart.data.labels.push(chart.data.labels.length);
        dataTemp["Temperature"].data.push(Math.floor((Math.random() * 100) + 1));
        dataTemp["Densité"].data.push(Math.floor((Math.random() * 100) + 1));
        dataTemp["Hauteur"].data.push(Math.floor((Math.random() * 100) + 1));
        dataTemp["Densité2"].data.push(Math.floor((Math.random() * 100) + 1));
        chart.update();
    }, 10000); // repeat forever, polling every 3 seconds
}