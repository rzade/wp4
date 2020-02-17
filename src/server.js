const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

let root = path.join(__dirname, '../', 'build/')
app.use(express.static(root))

app.get('/', function(req, res){
	res.sendFile('index.html', { root })
});

app.get('/main', function(req, res){
	res.sendFile('main.html', { root })
});

app.listen(4000, function(){
	console.log('Server is running on 4000 port')
});