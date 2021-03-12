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
       function wait(ms){
           var start = new Date().getTime();
           var end = start;
           while(end < start + ms) {
             end = new Date().getTime();
          }
        }

        client.on('reconnect', (error) => {
            console.log('reconnecting:', error)
        })

        client.on('error', (error) => {
            console.log('Connection failed:', error)
        })
                client.on('connect', function () {
          client.subscribe('presence', function (err) {
            if (!err) {
              
            }
          })
        })

       
function publishMsg() {
    window.setInterval(function () {
        client.publish('presence', "{\"id\":1,\"Digital_Input\":0,\"Humidity\":35}")
    }, 3000); // repeat forever, polling every 3 seconds
}

 client.on('message', function (topic, message) {
                // message is Buffer
    var receive = message.toString().split(",");
    console.log(receive);
                //client.end()
})