var mqtt;
var reconnectTimeout = 2000;
var host = "127.0.0.1";
var port = 9001;


function onConnect(){
    console.log("Connected")
    mqtt.subscribe("data");
}
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
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
    };
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