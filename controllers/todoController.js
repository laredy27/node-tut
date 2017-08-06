var bodyParser = require('body-parser');
// Node MongoDB driver package
var mongoose = require('mongoose');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Connect to MongoDB
mongoose.connect('mongodb://db_test_user:Ibadan27@ds163232.mlab.com:63232/heroku_65zdtpxl')
// Define a schema (table)
var todoSchema = new mongoose.Schema({
	item: String
});
// Create a model (class), params: Model_name, schema
var Todo = mongoose.model('Todo', todoSchema);
// Create objects of class Todo and save
/*
var itemOne = Todo({item: 'Get milk'}).save(function(err){
	if (err) throw err;
	console.log("item saved");
});
*/

// define some dummy data
// var todos = [{item: 'Get milk'}, {item: 'Walk dog'}, {item: 'Kick something'}, {item: 'Learn node.js'}]

// Node module to represent the todo controller
module.exports = function(app){

	// Define this controller request routes
	app.get('/todo', function(req, res){
		// get data from MongoDB and pass it to the view
		Todo.find({}, function(err, todos){
			if(err) throw err;
			res.render('todo', {todos: todos});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// console.log(req.body);
		// get data from view and add to MongoDB
		var newTodo = Todo(req.body).save(function(err, todos){
			if(err) throw err;
			res.json(todos);
		});
	});

	app.delete('/todo/:item', function(req, res){
		// delete requested item form mongoDB
		Todo.find({item: req.params.item.replace(/\-/g, ' ')}).remove(function(err, todos){
			if(err) throw err;
			res.json(todos);
		});
	});
}