var express = require('express');
var app = express();

var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);

var bodyParser = require('body-parser')

//app.get('/', function(req, res){
//	res.send('Hello World from Server')
//});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactList', function(req, res){
	console.log('I received a GET request');

	db.contactList.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	})

    /*
    person1 = {
    	name: 'Leo',
    	email: 'leo.fabiano@gmail.com',
    	number: '(11) 5212-5552'
    };

    person2 = {
    	name: 'Fabiano',
    	email: 'lfabiano@gmail.com',
    	number: '(62) 3522-9210'
    };

    person3 = {
    	name: 'Alves',
    	email: 'leo.alves@flytour.com',
    	number: '(11) 5212-5777'
    };

    var contactList = [person1, person2, person3];

    res.json(contactList);
    */

});

app.post('/contactList', function(req, res){
	console.log(req.body);
	db.contactList.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.get('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactList.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactList/:id', function(req, res){
	var id = req.params.id;
	console.log(req.body.name);	
	db.contactList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
	});
});

app.listen(3000);
console.log('Server is running on port 3000');