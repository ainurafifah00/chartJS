const xlabels = [];
const ylabels = [];
const male = 'male';
const female = 'female';

chartIt();

async function chartIt(){
  await getData();
  var ctx = document.getElementById('chart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: [male, female],
          datasets: [{
              label: 'Students Writing Score',
              data: ylabels,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      }
  });
}

async function getData() {
  const response = await fetch('StudentsPerformance.csv');
  const data = await response.text();

  let TotalMale = 0;
  let TotalFemale = 0;
  let TotalMaleScore = 0;
  let TotalFemaleScore = 0;


  const table = data.split('\n').slice(1);
  table.forEach(row => {
    const columns = row.replace(/['"]+/g, '');
    const column = columns.split(',');
    const gender = column[0];
    const writing_score = parseFloat(column[7]);

      if (gender === male) {
        TotalMale += 1;
        TotalMaleScore += writing_score;
        console.log(TotalMale, TotalMaleScore);
      }
      else if (gender === female) {
        TotalFemale += 1;
        TotalFemaleScore += writing_score;
      }
  })

  const AvgMaleScore = TotalMaleScore / TotalMale;
  const AvgFemaleScore = TotalFemaleScore / TotalFemale;
  console.log(AvgMaleScore, AvgFemaleScore);
  ylabels.push(AvgMaleScore);
  ylabels.push(AvgFemaleScore);

}
