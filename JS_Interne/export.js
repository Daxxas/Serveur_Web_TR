//Export format CSV
document.getElementById('btn_exportcsv').addEventListener("click",function()
{
    
});

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