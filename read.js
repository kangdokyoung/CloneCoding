const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.static('public'));

app.use(express.json());

app.listen(8080, (err)=> {
    if(err) return console.log(err);
    console.log('Node.js Server is running on port 8080...');
});

app.get('/', (req,res)=> {
    console.log("index.html loading");
    res.sendFile(__dirname + '/index.html');
});

app.get('/data_collection', (req, res)=>{
    console.log("data_collection.html loading");
    res.sendFile(__dirname + '/data_collection.html');
});

app.get('/data_preprocessing', (req, res)=>{
    console.log("data_preprocessing.html loading");
    res.sendFile(__dirname + '/data_preprocessing.html');
});

app.get('/deep_learing_model', (req, res)=>{
    console.log("deep_learning_model.html loading");
    res.sendFile(__dirname + '/deep_learning_model.html');
});

app.get('/graph_predict', (req, res)=>{
    console.log("graph_predict.html loading");
    res.sendFile(__dirname + '/graph_predict.html');
});

app.get('/reference', (req, res)=>{
    console.log("reference.html loading");
    res.sendFile(__dirname + '/reference.html');
});

module.exports = {
    devServer: {
        proxy:{
            '/' : {
                target : 'http://127.0.0.1:8080/',
                changeOrigin: true,
                pathRewrite: {'^/': ''},
                
            }
        }
    }
};
app.post('/lstm', (req, res)=>{
    let array =[];
    fs.readFile(`./Data_LSTM/${Number(req.body.month)}m.csv`, "utf-8", (err, data)=>{
        array = data.split('/r/n').map((value)=>{
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
            jsondata.data;pre = instdata[2];
            jsondata.real = instdata[3];
            return jsondata;
        })
        console.log(array);
        res.send(array);
    })
});

app.post('/cnn', (req, res)=>{
    let array =[];
    fs.readFile(`./data_CNN+LSTM/${Number(req.body.month)}m.csv`, "utf-8", (err, data)=>{
        array = data.split('/r/n').map((value)=>{
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
            jsondata.data;pre = instdata[2];
            jsondata.real = instdata[3];
            return jsondata;
        })
        console.log(array);
        res.send(array);
    })
});

app.get('/button', (req, res)=> {
    res.sendFile(__dirname + '/button.js')
})