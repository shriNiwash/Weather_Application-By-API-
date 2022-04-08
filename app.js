const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const port = 3000;
const { json } = require('express/lib/response');
const async = require('hbs/lib/async');


// body parser url encoded code
app.use(express.json())
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// static file
const static_path = path.join('__dirname',"../public");
app.use(express.static(static_path));

// view engine template
app.set('views','./views');
app.set('view engine','hbs');

app.get("/",(req,res)=>{
    res.render('index');
});



// app.get("/weather",async(req,res)=>{
//     const api_url = "https://api.openweathermap.org/data/2.5/weather?q=birgunj&appid=9e8a30062b6e3f1bd0991be1850e5b66";
//     const fetch_response = await fetch(api_url);
//     const json = await fetch_response.json();
//     const arrayData = [json];
//     temp = arrayData[0].main.temp-273;
//     min = arrayData[0].main.temp_min-273;
//     max = arrayData[0].main.temp_max-273;
//     condition = arrayData[0].weather[0].main;
//     res.render('weather',{
//         min : min.toFixed(2),
//         max : max.toFixed(2),
//         condition: condition,
//         temp : temp.toFixed(2)
//     });
// });

app.get("/weather",(req,res)=>{
    res.send("Please set the name of city first from the Home page");
})

app.post("/weather",urlencodedParser,async(req,res)=>{
    Datas = req.body.name;
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${Datas}&appid=9e8a30062b6e3f1bd0991be1850e5b66`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    const arrayData = [json];
    temp = arrayData[0].main.temp-273;
    min = arrayData[0].main.temp_min-273;
    max = arrayData[0].main.temp_max-273;
    condition = arrayData[0].weather[0].main;
    names = arrayData[0].name;
    res.render('weather',{
        min : min.toFixed(2),
        max : max.toFixed(2),
        condition: condition,
        temp : temp.toFixed(2),
        named : names,
    });
});



app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
});

