var mongoose = require("mongoose");
var Company = require("../models/company.js");

var middle = {};

middle.checkRegisterUser = function(req,res,next){
      Company.find({},function(err,data){
              if(err){
              	console.log(err);
              }else{
                   data.forEach(function(entity){
                      if(entity.user.length < 10){
                            
                            next();



                      }else{

                        res.json({message: "sorry all valuable users have registerd"});
}
})
               }



      })





}
module.exports = middle;