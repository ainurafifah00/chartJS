const yWritinglabels = [];
const yReadinglabels = [];
const yMathlabels = [];
const male = 'male';
const female = 'female';

chartIt();

async function chartIt(){
  await getData();
  var ctx = document.getElementById('chartWritingScore').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [male, female],
          datasets: [{
              label: 'Average Students Writing Score',
              data: yWritinglabels,
              backgroundColor: ['rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });

  var ctx = document.getElementById('chartReadingScore').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [male, female],
          datasets: [{
              label: 'Average Students Reading Score',
              data: yReadinglabels,
              backgroundColor: ['rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });

  var ctx = document.getElementById('chartMathScore').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [male, female],
          datasets: [{
              label: 'Average Students Math Score',
              data: yMathlabels,
              backgroundColor: ['rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'],
              borderWidth: 1
          }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
}




async function getData() {
  const response = await fetch('StudentsPerformance.csv');
  const data = await response.text();

  let TotalMale = 0;
  let TotalFemale = 0;
  let TotalMaleWritingScore = 0;
  let TotalMaleReadingScore = 0;
  let TotalMaleMathScore = 0;
  let TotalFemaleWritingScore = 0;
  let TotalFemaleReadingScore = 0;
  let TotalFemaleMathScore = 0;


  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.replace(/['"]+/g, '');
    const column = columns.split(',');
    const gender = column[0];
    const writing_score = parseFloat(column[7]);
    const reading_score = parseFloat(column[6]);
    const math_score = parseFloat(column[5]);

      if (gender === male) {
        TotalMale += 1;
        TotalMaleWritingScore += writing_score;
        TotalMaleReadingScore += reading_score;
        TotalMaleMathScore += math_score;

        //console.log(TotalMale, TotalMaleScore);
      }
      else if (gender === female) {
        TotalFemale += 1;
        TotalFemaleWritingScore += writing_score;
        TotalFemaleReadingScore += reading_score;
        TotalFemaleMathScore += math_score;
      }
  })

  const AvgMaleWritingScore = TotalMaleWritingScore / TotalMale;
  const AvgFemaleWritingScore = TotalFemaleWritingScore / TotalFemale;

  const AvgMaleReadingScore = TotalMaleReadingScore / TotalMale;
  const AvgFemaleReadingScore = TotalFemaleReadingScore / TotalFemale;

  const AvgMaleMathScore = TotalMaleMathScore / TotalMale;
  const AvgFemaleMathScore = TotalFemaleMathScore / TotalFemale;

  console.log(AvgMaleWritingScore, AvgFemaleWritingScore);
  console.log(AvgMaleReadingScore, AvgFemaleReadingScore);
  console.log(AvgMaleMathScore, AvgFemaleMathScore);

  //console.log(AvgMaleScore, AvgFemaleScore);
  yWritinglabels.push(AvgMaleWritingScore);
  yWritinglabels.push(AvgFemaleWritingScore);

  yReadinglabels.push(AvgMaleReadingScore);
  yReadinglabels.push(AvgFemaleReadingScore);

  yMathlabels.push(AvgMaleMathScore);
  yMathlabels.push(AvgFemaleMathScore);

}
