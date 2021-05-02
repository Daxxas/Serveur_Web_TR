
var placementChart = new Map()
var capteurNameBiggestWidth = 0;

function headerSwitch(childs, parentSwitch) {
    for(let i = 0; i < childs.length; i++) {

        let childSwitch = childs[i].getElementsByClassName("custom-control-input")

        if(!parentSwitch.checked) {
            if(childSwitch[0].checked)
            {
                childSwitch[0].click()
                childSwitch[0].setAttribute("disabled", "")
                childSwitch[0].removeAttribute("checked")
                childSwitch[0].checked = false;
            }


        }
        else {
            childSwitch[0].removeAttribute("disabled")
            childSwitch[0].setAttribute("checked", "")
        }
    }
}


function AddCapteur(id) {
    let switchbuttons = document.getElementsByClassName("switchbuttons")[0]

    let currentCapteurIndex = document.getElementsByClassName("capteur-category").length
    let categorydiv = document.createElement("div")
    let headerdiv = document.createElement("div")
    let switchheaderinput = document.createElement("input")

    currentCapteurIndex++

    categorydiv.className = "capteur-category"
    categorydiv.id = id
    switchbuttons.appendChild(categorydiv)

    switchheaderinput.type = "checkbox"
    switchheaderinput.className = "custom-control-input"
    switchheaderinput.setAttribute("checked", "")
    switchheaderinput.checked = false
    switchheaderinput.id = "customSwitch" + id

    headerdiv.appendChild(switchheaderinput)
    headerdiv.className = "custom-control custom-switch capteur-header"


    let switchheaderlabel = document.createElement("label")
    switchheaderlabel.className = "custom-control-label"
    switchheaderlabel.setAttribute("for", "customSwitch"+id)
    if(id != null) {
        switchheaderlabel.textContent = "Capteur " + id
    }
    else {
        switchheaderlabel.textContent = "Capteur"
    }

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

    let switchchildinput = document.createElement("input")
    switchchildinput.type = "checkbox"
    switchchildinput.className = "custom-control-input"
    switchchildinput.setAttribute("checked", "")
    switchchildinput.checked = false;
    switchchildinput.id = "customSwitchType" +type+ id
    switchchildinput.addEventListener("change", function() {CapteurContentSwitch(id, type)})

    let childdiv = document.createElement("div")
    childdiv.className = "custom-control custom-switch capteur-child"
    childdiv.appendChild(switchchildinput)
    childdiv.addEventListener("mouseenter", function(){setMathInfo(id,childdiv)})
    childdiv.addEventListener("mouseleave", function(){clearMathInfo(childdiv)})
    
    let switchchildlabel = document.createElement("label")
    switchchildlabel.className = "custom-control-label"
    switchchildlabel.setAttribute("for", "customSwitchType"+type+id)
    switchchildlabel.textContent = type

    childdiv.appendChild(switchchildlabel)
    categorydiv.appendChild(childdiv)
    RefreshCapteur()
}

function CapteurContentSwitch(id, type) {
    if (!placementChart.has(id+type)){
        var newDataset = {
            label: type + " du capteur " + id,
            borderColor: getCorrectColor(id+type),
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
        //headerSwitch(childs, capteurSwitch)

        for(let i = 0; i < childs.length; i++) {

            let childSwitch = childs[i].getElementsByClassName("custom-control-input")
    
            if(!capteurSwitch.checked) {
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
}



function setMathInfo(id,object)
{
    object.style.fontStyle = 'oblique'
    var type = object.children[1].innerHTML
    var values = getAllDataFromASensor(id,type)
    document.getElementById('label_max').innerText = max(values)
    document.getElementById('label_min').innerText = min(values)
    document.getElementById('label_var').innerText = variance(values)
    document.getElementById('label_moy').innerText = moy(values)
    document.getElementById('label_quantity').innerText = values.length   
}

function clearMathInfo(object)
{
    object.style.fontStyle = 'normal'
    document.getElementById('label_max').innerText = ""
    document.getElementById('label_min').innerText = "" 
    document.getElementById('label_var').innerText = ""
    document.getElementById('label_moy').innerText = ""
    document.getElementById('label_quantity').innerText = ""
}