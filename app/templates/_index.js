var fs = require('fs');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5001));

app.use(express.static(__dirname + '/src'));

app.get('/api/items', function(req, res){
    var dataFilePath = __dirname + '/data/data.json';
    var obj = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    res.json(obj);
});

app.listen(app.get('port'), function() {
    console.log('Express app is running on port', app.get('port'));
});