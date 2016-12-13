var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/todoList');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    title: {type: String, required: true},
    details: String,
    toDoTask: String,
    status: String,
    author: String
}, {collection: 'user-data'});

var UserData = mongoose.model('UserData', userDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');

});

router.get('/get-data', function(req, res, next){
    UserData.find()
        .then(function (doc) {
            res.render('index', {items: doc});
        });

});

router.post('/insert', function(req, res, next){
	var item = {
		title: req.body.title,
		details: req.body.details,
        toDoTask: req.body.toDoTask,
        status: req.body.status,
		author: req.body.author
	};

	var data = new UserData(item);
	data.save();

	res.redirect('/get-data');
});

router.post('/update', function(req, res, next){
    var item = {
        title: req.body.title,
        details: req.body.details,
        toDoTask: req.body.toDoTask,
        author: req.body.author
    };

    var id = req.body.id;

    UserData.findById(id, function (err, doc) {
        if (err){
            console.log('No entry found');
        }
        doc.title = req.body.title;
        doc.details = req.body.details,
        doc.toDoTask = req.body.toDoTask,
        doc.author = req.body.author;
        doc.save();

    });

    res.redirect('/get-data');
});

router.post('/delete', function(req, res, next){
    var id = req.body.id;
    UserData.findByIdAndRemove(id).exec();

    res.redirect('/get-data');
});

module.exports = router;