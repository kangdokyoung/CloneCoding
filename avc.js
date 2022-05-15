const fs = require('fs');

let array =[];
    fs.readFile(`./Data_LSTM/1m.csv`, "utf-8", (err, data)=>{
        array = data.split('\r\n').map((value)=>{
            let jsondata ={
                index : '',
                data: '',
                pre: '',
                real:'',
            };
            let indata =[];
            let instdata = value.split(',');

            jsondata.index = instdata[0];

            if(instdata[1].length === 12){
                indata = instdata[1].substring(0,11);
                indata += '0' + instdata[1][11];
                console.log("*indata="+indata+'\r');
                jsondata.data = indata;
            }else{
                jsondata.data = instdata[1];
            }
            jsondata.pre = instdata[2];
            jsondata.real = instdata[3];
            return jsondata;
        })
        console.log(array);
        res.send(array);
    })