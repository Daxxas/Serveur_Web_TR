//Export format CSV
document.getElementById('btn_exportcsv').addEventListener("click",function()
{
    var data = []
    Register.Sensors.forEach(Sensor => {
        var cles = Array.from(Sensor.dataset.keys())
        cles.forEach(cle => {
            data.push(new Array)
            data[data.length-1].push(Sensor.id)
            data[data.length-1].push(cle)
            var values = ""
                Sensor.dataset.get(cle).forEach(value => {
                    values += (value[0]+"-"+value[1]) + ";"
                });
            values = values.slice(0,-1)
            data[data.length-1].push(values)
    });
});

    var csv = 'ID,TYPE,VALUE\n';
    data.sort(function(a, b){return a[0] - b[0]});
    data.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'data.csv';
    hiddenElement.click();
});

//Export format Image
document.getElementById('btn_exportimage').addEventListener("click",function()
{
    var canvas = document.getElementById('mainGraph')
    var dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);

    this.href = dataURL
});


//Export format PDF
document.getElementById('btn_exportpdf').addEventListener("click",function(){
    //create image from dumy canvas
        var canvas = document.getElementById('mainGraph')
        //creates PDF from img
        var doc = new jsPDF('landscape');
        doc.setFontSize(20);
        doc.addImage(canvas, 'JPEG', 10, 10, 280, 150 );
        doc.save('new-canvas.pdf');
    });