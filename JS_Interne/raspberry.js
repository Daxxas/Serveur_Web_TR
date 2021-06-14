var ctx = document.getElementById('mainGraph').getContext('2d');

const DATA_COUNT = 7;
const NUMBER_CFG = { count: DATA_COUNT, min: 30, max: 80 };


const labels = ["Temperature", "RAM", "CPU", "Storage"];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Raspberry 1',
      data: [50, 24, 21, 19],
      borderColor: "#000000",
      backgroundColor: "#FFA500",
    },
    {
      label: 'Raspberry 2',
      data: [50, 24, 21, 19],
      borderColor: "#000000",
      backgroundColor: "#FF967A",
    },
    {
      label: 'Raspberry 3',
      data: [50, 24, 21, 19],
      borderColor: "#000000",
      backgroundColor: "#C6E2FF",
    }
    ,
    {
      label: 'Raspberry 4',
      data: [50, 24, 21, 19],
      borderColor: "#000000",
      backgroundColor: "#AF8A9E",
    }
    ,
    {
      label: 'Raspberry 5',
      data: [54, 24, 21, 19],
      borderColor: "#000000",
      backgroundColor: "#B5E7D4",
    }
    ,
    {
      label: 'Raspberry 6',
      data: [55, 24, 21, 19],
      borderColor: "#000000",
      backgroundColor: "#3E074D",
    }
  ]
};


var chart = new Chart(ctx, {
  // The type of chart we want to create
  type: 'bar',

  // The data for our dataset
  data: data,

  // Configuration options go here
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,   // minimum value will be 0.
          max: 100,
          stepSize: 10 // 1 - 2 - 3 ...
        }
      }]
    }
  }
});






var mqtt;
var reconnectTimeout = 2000;
var host = "192.168.44.11";
var port = 443;

//var host = "192.168.44.11";
//var port = 443;

function onConnect() {
  console.log("Connected")
  mqtt.subscribe("data");
}

function onConnectionLost(responseObject) {
  var slideSource = document.getElementById('slideSource');
  slideSource.classList.toggle('fade');

  setTimeout('printErrorMessage()', 1000)
}

function printErrorMessage() {
  var node = document.getElementById('slideSource')
  node.innerHTML = '';


  var errorMessage = document.createElement('h1')
  errorMessage.innerHTML = "Connexion perdue !"
  errorMessage.className = "text-center errorMessage"
  var errorMessageh3 = document.createElement('h3')
  errorMessageh3.innerHTML = "Veuillez recharger la page ❤"
  errorMessageh3.className = "text-center errorMessage"
  document.getElementById('slideSource').appendChild(errorMessage)
  document.getElementById('slideSource').appendChild(errorMessageh3)
  node.classList.toggle('fade');
}

function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.payloadString);
  processing(message.payloadString);
}

function MQTTconnect() {
  console.log("Connecting to " + host + ":" + port);
  mqtt = new Paho.Client(host, Number(port), "/data", "clientjs" + Math.random());
  var options = {
    timeout: 3,
    onSuccess: onConnect,
    onFailure: onConnectionLost
  };
  mqtt.onerror = onConnectionLost;
  mqtt.connect(options);
  mqtt.onMessageArrived = onMessageArrived;
  mqtt.onConnectionLost = onConnectionLost;
}


function processing(requete) {
  //Contacter le groupe monitoring pour les faire changer de channel
  if (requete.search("Ram")) {
    console.log("message from monitoring");
    processing_monitoring(requete)
  }
}

function processing_monitoring(requete) {
  if (!window.location.pathname == "/raspberry.html") {
    console.log("Mauvaise page")
  }

  console.log(requete)
  return;
  const obj = JSON.parse(requete) 
  var key;
  for(key in obj)
  {
      if(key == "id"){
          console.log("ID :", key)
      }else{
          console.log("Type :", key)
      }
  }
  //Analyse de la trame

  /*Ordre des raspberry:
    chart.data.datasets[0].data[0] -> Rasp 1 Temperature
    chart.data.datasets[0].data[1] -> Rasp 1 Ram
    chart.data.datasets[0].data[2] -> Rasp 1 CPU
    chart.data.datasets[0].data[3] -> Rasp 1 Storage

    chart.data.datasets[1].data[0] -> Rasp 2 Temperature
    chart.data.datasets[1].data[1] -> Rasp 2 Ram
    chart.data.datasets[1].data[2] -> Rasp 2 CPU
    chart.data.datasets[1].data[3] -> Rasp 2 Storage

    chart.data.datasets[2].data[0] -> Rasp 3 Temperature
    chart.data.datasets[2].data[1] -> Rasp 3 Ram
    chart.data.datasets[2].data[2] -> Rasp 3 CPU
    chart.data.datasets[2].data[3] -> Rasp 3 Storage

    chart.data.datasets[3].data[0] -> Rasp 4 Temperature
    chart.data.datasets[3].data[1] -> Rasp 4 Ram
    chart.data.datasets[3].data[2] -> Rasp 4 CPU
    chart.data.datasets[3].data[3] -> Rasp 4 Storage


  */


  //gna gna gna


  chart.update()

}

MQTTconnect();


