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
        }else
        this.dataset.get(type).push([value,Date.now()])

    }
}

function Register() {
    this.Sensors = new Map()
    this.addSensor = function(Sensor_object)
    {
        if(!(this.Sensors.has(Sensor_object.id)))
        {
            this.Sensors.set(Sensor_object.id,Sensor_object)
        }
    }
}


//Début du process

var reg = new Register()
reg.addSensor(new Sensor(1))