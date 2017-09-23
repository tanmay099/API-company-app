var mongoose = require("mongoose");

var UserSchema  = new mongoose.Schema({
email : String,
password : String,
Referral: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "Referral"

}
]




});

module.exports = mongoose.model("User", UserSchema);