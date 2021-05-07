var ctx = document.getElementById('mainGraph').getContext('2d');

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: 30, max: 80};


const labels = ["Temperature","RAM","CPU","Storage"];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Raspberry 1',
      data: [50,24,21,19],
      borderColor: "#000000",
      backgroundColor: "#FFA500",
    },
    {
      label: 'Raspberry 2',
      data: [50,24,21,19],
      borderColor: "#000000",
      backgroundColor: "#FF967A",
    },
    {
      label: 'Raspberry 3',
      data: [50,24,21,19],
      borderColor: "#000000",
      backgroundColor: "#C6E2FF",
    }
    ,
    {
      label: 'Raspberry 4',
      data: [50,24,21,19],
      borderColor: "#000000",
      backgroundColor: "#AF8A9E",
    }
    ,
    {
      label: 'Raspberry 5',
      data: [50,24,21,19],
      borderColor: "#000000",
      backgroundColor: "#B5E7D4",
    }
    ,
    {
      label: 'Raspberry 6',
      data: [50,24,21,19],
      borderColor: "#000000",
      backgroundColor: "#3E074D",
    }
  ]
};


var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: data,
    
    // Configuration options go here
    options: {
        responsive: true,
        maintainAspectRatio: false
      }
});