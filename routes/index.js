var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/', });
var XLSX = require('xlsx');
var Expense = require('../models').Expense;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/file',upload.single('test'), function(req, res, next) {
  var wb = XLSX.readFile(req.file.path,{cellDates:true});
  var expenses = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{raw: true});
  Expense.insertMany(expenses);
  res.send(expenses);
});

router.post('/expenses', function(req, res, next) {
  var expense = new Expense({date: new Date("2017-12-06"), concept: "Concepto de test 2", amount: 123.45});
  expense.save()
    .then(
      result => { 
        res.send(result) 
      },
      error => { 
        res.statusCode = 400;
        res.send(error)
      }
    );
});

router.get('/expenses', function(req, res, next) {
  var amountFrom = parseFloat(req.query.amountFrom);
  var amountTo = parseFloat(req.query.amountTo);
  Expense.find({
    "amount" : { 
      "$gte" : - amountTo,
      "$lte" : - amountFrom
    }
  }).then(function(expenses){
    res.send(expenses);
  });
});


module.exports = router;
