var express = require('express');
var app = express();

app.listen(3000, ()=>{
    console.log('Servidor esta corriendo');
})
 app.get('/hello', function(req, res){
     res.send('hello world');
 });