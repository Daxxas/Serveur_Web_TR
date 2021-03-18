let capteurCategory = document.getElementsByClassName("capteur-category")

for(let i = 0; i < capteurCategory.length; i++) {
    let headerdiv = capteurCategory[i].getElementsByClassName("capteur-header")[0]
    let childs = capteurCategory[i].getElementsByClassName("capteur-child")
    let capteurSwitch = headerdiv.getElementsByClassName("custom-control-input")[0]

    capteurSwitch.addEventListener('change', function() {headerSwitch(childs, capteurSwitch)})
}

function headerSwitch(childs, parentSwitch) {

    console.log(parentSwitch.checked)

    for(let i = 0; i < childs.length; i++) {
        console.log(childs[i])

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

function AddCapteur() {
    let currentCapteurIndex = document.getElementsByClassName("capteur-category").length

    currentCapteurIndex++
    let categorydiv = document.createElement("div")
    categorydiv.className = "capteur-category"

    switchbuttons.appendChild(categorydiv)

    let headerdiv = document.createElement("div")
    headerdiv.className = "custom-control custom-switch capteur-header"
    //ajouter ici l'attribute custom qui est dans l'exemple, si je l'ai pas mis c'est que j'ai l'impression qu'il sert à rien

    let switchheaderinput = document.createElement("input")
    switchheaderinput.type = "checkbox"
    switchheaderinput.className = "custom-control-input"
    switchheaderinput.setAttribute("checked", "")
    switchheaderinput.id = "customSwitch" + buttoncount
    headerdiv.appendChild(switchheaderinput)


    let switchheaderlabel = document.createElement("label")
    switchheaderlabel.className = "custom-control-label"
    switchheaderlabel.setAttribute("for", "customSwitch"+buttoncount)
    switchheaderlabel.textContent = "Capteur " + currentCapteurIndex
    buttoncount++
    headerdiv.appendChild(switchheaderlabel)

    categorydiv.appendChild(headerdiv)



    for(let i = 0; i < arguments.length; i++) {
        let childdiv = document.createElement("div")
        childdiv.className = "custom-control custom-switch capteur-child"

        let switchchildinput = document.createElement("input")
        switchchildinput.type = "checkbox"
        switchchildinput.className = "custom-control-input"
        switchchildinput.setAttribute("checked", "")
        switchchildinput.id = "customSwitch" + buttoncount
        childdiv.appendChild(switchchildinput)


        let switchchildlabel = document.createElement("label")
        switchchildlabel.className = "custom-control-label"
        switchchildlabel.setAttribute("for", "customSwitch"+buttoncount)
        switchchildlabel.textContent = arguments[i]
        buttoncount++
        childdiv.appendChild(switchchildlabel)

        categorydiv.appendChild(childdiv)
    }
    switchbuttons.appendChild(categorydiv)
}

AddCapteur("test", "teste", "teste", "teste", "teste", "teste")
AddCapteur("testset")
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()
AddCapteur()