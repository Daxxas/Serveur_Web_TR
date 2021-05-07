//Export format CSV
document.getElementById('btn_exportcsv').addEventListener("click",function()
{
    var csv = [];

    var row = [];
    row.push("NumCapteur");
    row.push("Type");
    row.push("Valeur");
    csv.push(row.join(","));
    for (let [key, value] of reg.Sensors) {
        var keys_type = Array.from( reg.Sensors.get(key).dataset.keys() );
        keys_type.forEach(element => {
            row = []
            var donnees = getAllDataFromASensorWithoutNull(key,element)
            row.push(key)
            row.push(element)
            donnees.forEach(donneelement => {
                row.push(donneelement)
            });
            csv.push(row.join(","));
        });
        
    }

    // download csv file
    downloadCSV(csv.join("\n"), "export.csv");
});


//Downdload csv file
function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    if (window.Blob == undefined || window.URL == undefined || window.URL.createObjectURL == undefined) {
        alert("Your browser doesn't support Blobs");
        return;
    }
    
    csvFile = new Blob([csv], {type:"text/csv"});
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

//Export format Image
document.getElementById('btn_exportimage').addEventListener("click",function()
{
    var a = document.createElement('a');
    a.href = chart.toBase64Image();
    a.download = 'export.png';

    // Trigger the download
    a.click();

});


//Export format PDF
document.getElementById('btn_exportpdf').addEventListener("click",function(){


        var newCanvas = document.querySelector('#mainGraph');
        var newCanvasImg = newCanvas.toDataURL("image/png", 1.0);
        var doc = new jsPDF('landscape');
        doc.addImage(newCanvasImg, 'JPEG', 10, 10, 280, 150 );
        doc.save('export.pdf');
    });