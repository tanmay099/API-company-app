var mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
 
name: String,
score: Number,
sector: String,

user : [{
 type: mongoose.Schema.Types.ObjectId,
 ref: "User"

}
]




});


module.exports = mongoose.model("Company",CompanySchema);