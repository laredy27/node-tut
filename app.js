var express = require('express');

var todoController = require('./controllers/todoController');
var app = express();

// Set the default template (view) engine. Note: template files should be stores in /viewsnod
app.set('view engine', 'ejs');

// serve static files from the public folder for each route request
app.use(express.static('./public'));
// serve static files from the bower_components folder for each route request
app.use(express.static('./bower_components'));

// Fire/execute the todo contoller
todoController(app);

/*
// Define the express app routes
app.get('/', function(req, res){
	res.render('header');
})
*/

// listen to app on oort 3000
app.listen(3000);
console.log("Listening on port 3000");