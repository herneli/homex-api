var mongoose = require('mongoose');
// Import sc
var expenseSchema = mongoose.Schema({
  date: { type: Date, required: true },
  concept:{ type:String, required: true },
  amount: { type: Number, required: true }
});

var Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;