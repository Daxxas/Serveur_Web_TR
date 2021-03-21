function headerSwitch(childs, parentSwitch) {
    for(let i = 0; i < childs.length; i++) {

        let childSwitch = childs[i].getElementsByClassName("custom-control-input")

        if(!parentSwitch.checked) {
            childSwitch[0].setAttribute("disabled", "")
            childSwitch[0].removeAttribute("checked")
            childSwitch[0].checked = false;
        }
        else {
            childSwitch[0].removeAttribute("disabled")
            childSwitch[0].setAttribute("checked", "")
        }
    }
}

let switchbuttons = document.getElementsByClassName("switchbuttons")[0]

// TODO : changer le nombre de bouton quand il n'y en aura plus par défaut
let buttoncount = 10; // nombre de bouton présent de base

let capteurNameBiggestWidth = 0;

function AddCapteur(id) {

    if(document.getElementById(id) != null) {
        console.error("Attention : On essai d'ajouter un capteur avec l'id " + id + " qui existe déjà : " + document.getElementById(id))
        return
    }

    let currentCapteurIndex = document.getElementsByClassName("capteur-category").length

    currentCapteurIndex++
    let categorydiv = document.createElement("div")
    categorydiv.className = "capteur-category"
    categorydiv.id = id

    switchbuttons.appendChild(categorydiv)

    let headerdiv = document.createElement("div")
    headerdiv.className = "custom-control custom-switch capteur-header"

    //ajouter ici l'attribute custom qui est dans l'exemple, si je l'ai pas mis c'est que j'ai l'impression qu'il sert à rien

    let switchheaderinput = document.createElement("input")
    switchheaderinput.type = "checkbox"
    switchheaderinput.className = "custom-control-input"
    switchheaderinput.setAttribute("checked", "")
    switchheaderinput.checked = false
    switchheaderinput.id = "customSwitch" + buttoncount
    headerdiv.appendChild(switchheaderinput)


    let switchheaderlabel = document.createElement("label")
    switchheaderlabel.className = "custom-control-label"
    switchheaderlabel.setAttribute("for", "customSwitch"+buttoncount)
    if(id != null) {
        switchheaderlabel.textContent = "Capteur " + id
    }
    else {
        switchheaderlabel.textContent = "Capteur"
    }

    buttoncount++
    headerdiv.appendChild(switchheaderlabel)

    categorydiv.appendChild(headerdiv)

    if(capteurNameBiggestWidth < headerdiv.offsetWidth) {
        capteurNameBiggestWidth = headerdiv.offsetWidth
        document.documentElement.style.setProperty("minwidtheheader", capteurNameBiggestWidth)
    }

    switchbuttons.appendChild(categorydiv)
}

function AddTypeToCapteur(id, type) {

    let categorydiv = document.getElementById(id)

    let childdiv = document.createElement("div")
    childdiv.className = "custom-control custom-switch capteur-child"

    let switchchildinput = document.createElement("input")
    switchchildinput.type = "checkbox"
    switchchildinput.className = "custom-control-input"
    switchchildinput.setAttribute("checked", "")
    switchchildinput.checked = false;
    switchchildinput.id = "customSwitch" + buttoncount
    switchchildinput.addEventListener("change", function() {CapteurContentSwitch(id, type,switchchildinput)})
    childdiv.appendChild(switchchildinput)


    let switchchildlabel = document.createElement("label")
    switchchildlabel.className = "custom-control-label"
    switchchildlabel.setAttribute("for", "customSwitch"+buttoncount)
    switchchildlabel.textContent = type
    buttoncount++
    childdiv.appendChild(switchchildlabel)

    categorydiv.appendChild(childdiv)

    RefreshCapteur()
}
var placementChart = new Map()
function CapteurContentSwitch(id, type) {
    if (!placementChart.has(id+type)){
        var newDataset = {
            label: type + " du capteur " + id,
            borderColor: getRandomColor(),
            backgroundColor: 'rgba(0,0,0,0)',
            data: getAllDataFromASensor(id,type),
            fill: false
        };
        chart.data.datasets.push(newDataset);
        chart.update();
        placementChart.set(id+type,placementChart.size)
    } else {
        console.log("Element a enlever : "+ (id+type))
        var index_depart = placementChart.get(id+type)
        console.log("index de départ : " + index_depart)
        chart.data.datasets.splice(placementChart.get(id+type),1);
        placementChart.delete(id+type)
        chart.update();
        for (let [key, value] of placementChart) {
            if(value > index_depart)
            {
                placementChart.set(key,value-1)
            }
        }
    }

    /*
    Map:
        "key": valeur
        "key": valeur
        "1Humidity" : 0




    */
    
}

function RefreshCapteur() {

    let all = document.querySelectorAll(".capteur-header");
    for (let i = 0; i < all.length; i++) {
        all[i].style.minWidth = String(capteurNameBiggestWidth) + "px"
    }

    let capteurCategory = document.getElementsByClassName("capteur-category")

    for(let i = 0; i < capteurCategory.length; i++) {
        let headerdiv = capteurCategory[i].getElementsByClassName("capteur-header")[0]
        let childs = capteurCategory[i].getElementsByClassName("capteur-child")
        let capteurSwitch = headerdiv.getElementsByClassName("custom-control-input")[0]

        capteurSwitch.addEventListener('change', function() {headerSwitch(childs, capteurSwitch)})
        headerSwitch(childs, capteurSwitch)
    }
}



