'use strict'
console.log('loading...');
let global_array = [];

window.addEventListener('load', ()=>{
    document.getElementById('month').value = "1";    
    fetch('http://localhost:8080/lstm', {
        method : 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify({"month": document.getElementById('month').vlaue})
    })
    .then((res)=>{
        return res.json();
    })
    .then((dataa)=>{
        global_array = dataa;

        google.charts.load('current', {'packages':['corechart']})
        google.charts.setOnLoadCallback(chartLoadCallback);
        function chartLoadCallback(){
            drawChart();
            window.onresize = function(event) {drawChart();};
        }

        function drawChart(){
            let realdaeta = [];
            var chartData=[
                ['날짜', '실제 전력 값', '예측 전력값'],
            ];
            for(let i=0; i<dataa.length;i++){
                realdata = [];
                realdata.push(new DataTransfer(2016, document.getElementById('month').value-1, dataa[i].data.slice(8,10), dataa[i].data.slice(11)));
                realdata.psuh(Number(dataa[i].real));
                realdata.psuh(Number(dataa[i].pre));
                
                chartData.push(chartData)
            }
            console.log(chartData);

            var dataTable = google.visualization.arrayToDataTable(chartData);

            var option={

                'title' : document.getElementById('month').value+'월의 LSTM 모델로 1시간 단위로 예측한 그래프',
                "legend":{"position":'bottom'},
                "chartArea":{'width':'90%', 'height':'50%'},
                "selectionMode":'multiple',
                "tooltip":{"trigger":'both'},
                "aggreationTarget":'none',
                "focusTarget":'category',
                "explorer":{
                    "axis":'horizontal',
                    "actions":['dragToZoom', 'rightClickToReset']
                },
                "crosshair":{
                    "trigger":"both",
                    "orientation":'vertical'
                },
                width: '100%',
                height: $(window).height()*0.3,
                hAxis:{
                    gridlines:{
                        units:{
                            days:{format: ['dd일']},
                            hours:{format:['HH', 'ha']},
                        }
                    },
                    minorGridlines:{
                        units:{
                            hours:{format:['hh a', 'ha']},
                            minutes: {format:['HH a Z', ':mm']},
                        }
                    }
                },
                colors:['#2D9FF1', '#E22A2A' ]
            };
            var chart=new google.visualization.LineChart(document.getElementById('lstm_chart'));
            chart.draw(dataTable,options);
        }
    })
})