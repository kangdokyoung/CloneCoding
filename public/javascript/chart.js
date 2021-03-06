'use strict'
console.log('loading...');
let global_array = [];

//첫 LSTM
window.addEventListener('load', ()=>{
    document.getElementById('month').value = "1";  
    fetch('http://localhost:8080/lstm', {
        method : 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify({"month": document.getElementById('month').value})
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

        function drawChart()
        {
            let realdata = [];
            var chartData=[
                ['날짜', '실제 전력 값', '예측 전력값'],
            ];
            for(let i=0; i<dataa.length;i++){
                realdata = [];
                realdata.push(new Date(2016, document.getElementById('month').value-1, dataa[i].data.slice(8, 10), dataa[i].data.slice(11)));
                realdata.push(Number(dataa[i].real));
                realdata.push(Number(dataa[i].pre));
                chartData.push(realdata);
            }
            console.log(chartData);

            var dataTable=google.visualization.arrayToDataTable(chartData);

            var options={
              
                'title':document.getElementById('month').value+' 월의 LSTM 모델로 1시간 단위로 예측한 그래프',
  
                "legend": {"position":'bottom'},
                "chartArea": {'width': '90%', 'height':'50%'},
                //selectionMode:여러 점을 같이 선택함
                "selectionMode":'multiple',
                //tooltip:점 표시한 전력값 전부 화면에 표시해줌
                "tooltip":{"trigger":'both'},
                "aggreationTarget":'none',
                "focusTarget":"category",
                //explorer: 마우스 왼쪽으로 영역 선택하면 확대 마우스 오른쪽 버튼 누르면 원래 영역으로
                "explorer":{
                  "axis":'horizontal',
                  "actions":['dragToZoom','rightClickToReset']
                },
                //crosshar: 클릭하면 해당점에 선을 그어줌
                "crosshair":{
                  "trigger":"both",
                  "orientation":'vertical'
                },
                
                 width: '100%',
                 height: $(window).height()*0.5,   
                hAxis: {
                  gridlines: {
                    units: {
                      days: {format: ['dd일']},
                      hours: {format: ['HH', 'ha']},
                      
                    }
                  },
                  minorGridlines: {
                    units: {
                      hours: {format: ['hh a', 'ha']},
                      minutes: {format: ['HH a Z', ':mm']},
                     
                    }
                  }
                 
                  
                  
                },
                colors: ['#2D9FF1', '#E22A2A' ]
                
              };
            var chart=new google.visualization.LineChart(document.getElementById('lstm_chart'));
            chart.draw(dataTable,options);
        }
    })
})

//달 바뀔 때 LSTM
document.getElementById('month').addEventListener('change', ()=>{
    if(document.getElementById('month').value <=12 && document.getElementById('month').value >= 1){
        fetch('http://localhost:8080/lstm', {
        method : 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify({"month": document.getElementById('month').value})
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
            let realdata = [];
            var chartData=[
                ['날짜', '실제 전력 값', '예측 전력값'],
            ];
            for(let i=0; i<dataa.length;i++){
                realdata = [];
                realdata.push(new Date(2016, document.getElementById('month').value-1, dataa[i].data.slice(8, 10), dataa[i].data.slice(11)));
                realdata.push(Number(dataa[i].real));
                realdata.push(Number(dataa[i].pre));
                
                chartData.push(realdata)
            }
            console.log(chartData);

            var dataTable =google.visualization.arrayToDataTable(chartData);

            var options={
              
                'title':document.getElementById('month').value+' 월의 LSTM 모델로 1시간 단위로 예측한 그래프',
  
                "legend": {"position":'bottom'},
                "chartArea": {'width': '90%', 'height':'50%'},
                //selectionMode:여러 점을 같이 선택함
                "selectionMode":'multiple',
                //tooltip:점 표시한 전력값 전부 화면에 표시해줌
                "tooltip":{"trigger":'both'},
                "aggreationTarget":'none',
                "focusTarget":"category",
                //explorer: 마우스 왼쪽으로 영역 선택하면 확대 마우스 오른쪽 버튼 누르면 원래 영역으로
                "explorer":{
                  "axis":'horizontal',
                  "actions":['dragToZoom','rightClickToReset']
                },
                //crosshar: 클릭하면 해당점에 선을 그어줌
                "crosshair":{
                  "trigger":"both",
                  "orientation":'vertical'
                },
                
                 width: '100%',
                 height: $(window).height()*0.5,   
                hAxis: {
                  gridlines: {
                    units: {
                      days: {format: ['dd일']},
                      hours: {format: ['HH', 'ha']},
                      
                    }
                  },
                  minorGridlines: {
                    units: {
                      hours: {format: ['hh a', 'ha']},
                      minutes: {format: ['HH a Z', ':mm']},
                     
                    }
                  }
                 
                  
                  
                },
                colors: ['#2D9FF1', '#E22A2A' ]
                
              };
            var chart=new google.visualization.LineChart(document.getElementById('lstm_chart'));
            chart.draw(dataTable,options);
        }
    })

    }else{
        alert("달의 범위를 확인하세요.")
    }
})

// 첫 LSTM + CNN
window.addEventListener('load', ()=>{
    document.getElementById('month').value = "1";    
    fetch('http://localhost:8080/cnn', {
        method : 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify({"month": document.getElementById('month').value})
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
            let realdata = [];
            var chartData=[
                ['날짜', '실제 전력 값', '예측 전력값'],
            ];
            for(let i=0; i<dataa.length;i++){
                realdata = [];
                realdata.push(new Date(2016, document.getElementById('month').value-1, dataa[i].data.slice(8, 10), dataa[i].data.slice(11)));
                realdata.push(Number(dataa[i].real));
                realdata.push(Number(dataa[i].pre));
                
                chartData.push(realdata)
            }
            console.log(chartData);

            var dataTable =google.visualization.arrayToDataTable(chartData);

            var options={
              
                'title':document.getElementById('month').value+' 월의 LSTM + CNN 모델로 1시간 단위로 예측한 그래프',
  
                "legend": {"position":'bottom'},
                "chartArea": {'width': '90%', 'height':'50%'},
                //selectionMode:여러 점을 같이 선택함
                "selectionMode":'multiple',
                //tooltip:점 표시한 전력값 전부 화면에 표시해줌
                "tooltip":{"trigger":'both'},
                "aggreationTarget":'none',
                "focusTarget":"category",
                //explorer: 마우스 왼쪽으로 영역 선택하면 확대 마우스 오른쪽 버튼 누르면 원래 영역으로
                "explorer":{
                  "axis":'horizontal',
                  "actions":['dragToZoom','rightClickToReset']
                },
                //crosshar: 클릭하면 해당점에 선을 그어줌
                "crosshair":{
                  "trigger":"both",
                  "orientation":'vertical'
                },
                
                 width: '100%',
                 height: $(window).height()*0.5,   
                hAxis: {
                  gridlines: {
                    units: {
                      days: {format: ['dd일']},
                      hours: {format: ['HH', 'ha']},
                      
                    }
                  },
                  minorGridlines: {
                    units: {
                      hours: {format: ['hh a', 'ha']},
                      minutes: {format: ['HH a Z', ':mm']},
                     
                    }
                  }
                 
                  
                  
                },
                colors: ['#351C6C',  '#6DCE21']
                
              };
            var chart=new google.visualization.LineChart(document.getElementById('cnn_chart'));
            chart.draw(dataTable,options);
        }
    })
})

// 달 바뀔 때 LSTM + CNN
document.getElementById('month').addEventListener('change', ()=>{
    if(document.getElementById('month').value <=12 && document.getElementById('month').value >= 1){
        fetch('http://localhost:8080/cnn', {
        method : 'POST',
        headers:{
            'content-Type': 'application/json'
        },
        body: JSON.stringify({"month": document.getElementById('month').value})
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
            let realdata = [];
            var chartData=[
                ['날짜', '실제 전력 값', '예측 전력값'],
            ];
            for(let i=0; i<dataa.length;i++){
                realdata = [];
                realdata.push(new Date(2016, document.getElementById('month').value-1, dataa[i].data.slice(8, 10), dataa[i].data.slice(11)));
                realdata.push(Number(dataa[i].real));
                realdata.push(Number(dataa[i].pre));
                
                chartData.push(realdata)
            }
            console.log(chartData);

            var dataTable =google.visualization.arrayToDataTable(chartData);

            var options={
              
                'title':document.getElementById('month').value+' 월의 LSTM +CNN모델로 1시간 단위로 예측한 그래프',
  
                "legend": {"position":'bottom'},
                "chartArea": {'width': '90%', 'height':'50%'},
                //selectionMode:여러 점을 같이 선택함
                "selectionMode":'multiple',
                //tooltip:점 표시한 전력값 전부 화면에 표시해줌
                "tooltip":{"trigger":'both'},
                "aggreationTarget":'none',
                "focusTarget":"category",
                //explorer: 마우스 왼쪽으로 영역 선택하면 확대 마우스 오른쪽 버튼 누르면 원래 영역으로
                "explorer":{
                  "axis":'horizontal',
                  "actions":['dragToZoom','rightClickToReset']
                },
                //crosshar: 클릭하면 해당점에 선을 그어줌
                "crosshair":{
                  "trigger":"both",
                  "orientation":'vertical'
                },
                
                 width: '100%',
                 height: $(window).height()*0.5,   
                hAxis: {
                  gridlines: {
                    units: {
                      days: {format: ['dd일']},
                      hours: {format: ['HH', 'ha']},
                      
                    }
                  },
                  minorGridlines: {
                    units: {
                      hours: {format: ['hh a', 'ha']},
                      minutes: {format: ['HH a Z', ':mm']},
                     
                    }
                  }
                 
                  
                  
                },
                colors: ['#351C6C',  '#6DCE21' ]
                
              };
            var chart=new google.visualization.LineChart(document.getElementById('cnn_chart'));
            chart.draw(dataTable,options);
        }
    })

    }else{
        alert("달의 범위를 확인하세요.")
    }
})
