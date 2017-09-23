var mongoose = require("mongoose");
var ReferralSchema = mongoose.Schema({
    rcode: String
});
module.exports = mongoose.model("Referral", ReferralSchema);