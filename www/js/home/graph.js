/**
 * グラフの表示
 */
function graph() 
{
    //ここら辺で過去のデータの読み込みを行いたい
    // something function
    new Chart
    (
        document.getElementById("myChart"), 
        {
            type: "bar",
            data: {
                labels: ["2019-06-30", "2019-07-17", "2019-08-10"],
                datasets: [{
                    data: [66.8, 67.2, 66.3],
                    backgroundColor: ['#FF4444', '#4444FF', '#EEEE44']
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 60,
                            max: 70,
                            fontSize: 12,
                            stepSize: 2
                        }
                    }]
                },
                title: {
                    display: true,
                    fontSize: 20,
                    text: "過去の体重"
                },
                legend: {
                    display: false
                }
            }
        }
    );
}