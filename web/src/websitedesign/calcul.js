function max(valeurs)
{
    return Math.max.apply(Math,valeurs)
}

function min(valeurs)
{
    return Math.min.apply(Math,valeurs)
}

function moy(valeurs)
{
    var somme = 0
    valeurs.forEach(element => {
        somme += element
    });
    return (somme / valeurs.length).toFixed(3)
}

function variance(valeurs)
{
    var m = moy(valeurs)
    v = 0
    valeurs.forEach(element => {
        v=v+(element-m)**2
    });

    return(v/valeurs.length)
}

function ecart_type(valeurs)
{
    return Math.sqrt(variance(valeurs))
}