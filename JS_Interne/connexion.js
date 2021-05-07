var mqtt;
var reconnectTimeout = 2000;
var host = "127.0.0.1";
var port = 9001;

//var host = "192.168.44.11";
//var port = 443;



function onConnect(){
    console.log("Connected")
    mqtt.subscribe("data");
}
function onConnectionLost(responseObject) {
    // var slideSource = document.getElementById('slideSource');
    // slideSource.classList.toggle('fade');
    //
    // setTimeout('printErrorMessage()',1000)
}

function printErrorMessage()
{
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
    console.log("onMessageArrived:"+message.payloadString);
    processing(message.payloadString);
}

function MQTTconnect(){
    console.log("Connecting to "+host+":"+port);
    mqtt = new Paho.Client(host,Number(port),"/data","clientjs"+Math.random());
    var options = {
        timeout : 3,
        onSuccess: onConnect,
        onFailure : onConnectionLost
    };
    mqtt.onerror = onConnectionLost;
    mqtt.connect(options);
    mqtt.onMessageArrived = onMessageArrived;
    mqtt.onConnectionLost = onConnectionLost;
}


function processing(requete)
{
    //Contacter le groupe monitoring pour les faire changer de channel
    if(requete.search("Ram") != -1){
        console.log("message from monitoring -> skipped"); return;}

    const obj = JSON.parse(requete)
    action()    
    var key;
    for(key in obj)
    {
        if(key == "id"){
            reg.addSensor(new Sensor(obj.id))
        }else{
            reg.Sensors.get(obj.id).addValue(key,obj[key])
        }
    }
}

MQTTconnect();


