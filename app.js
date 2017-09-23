var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var User = require("./models/user.js");
var referrals = require("./models/refral.js");
 var ObjectId = require('mongodb').ObjectId; 
// var Router = require("router");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Company = require("./models/company.js");
//var middleware = require("./middleware/middle.js");
var db = mongoose.connect("mongodb://localhost/nira_app");

var router = express.Router();
app.use('/api',router);
router.get('/',function(err,res){

res.json({message :"APi Intialised"});

});
app.use(bodyParser.urlencoded({ extended: true })); //support x-www-form-urlencoded
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//login in a user 
router.route('/login')

          .get(function(req,res){
          var email = req.query.email;
          console.log(email);
          var password  = req.query.password;
         console.log(password);
          var rcodes = req.query.rcode;
          var referral = rcodes.toString();
 console.log(referral);
     User.find({email: email, password : password},function(err,data){
                  if(err){
                    res.send();
                       res.json({message : "fail"});
               console.log("err");

                  }else if(data === null){
                  	 res.json({message : "fail"});
                  	}else{
                      console.log(data);
                      data[0].Referral.forEach(function(seed){
                      	// var id = req.params.gonderi_id;       
                          //  var o_id = new ObjectId(seed);
                          console.log(seed);
                         referrals.findOne({_id :seed},function(err,obj){
                                           console.log(obj);         
                             
                           //   console.log(rcode.toString());        
                      	if(referral ===   obj.rcode){
                       return  res.json({message :"code already used"});
                    }
});
                       });
                      	console.log("here");
        referrals.create({rcode:referral},function(err2,resCode){
          if(err2){
            console.log(err2);
            res.send();

          }else{
          	data[0].Referral.push(resCode);
          	data[0].save();
             res.json({message: "HTTPGOOD"});
       

          }});
                           

}
});
          

   });   
//show list of all companies form the company data bases
router.route('/company')

     .get(function(req,res){
      Company.find({},function(err,data){
if(err){
  console.log(err);
}
else{
  res.json({message: data});
}



      });
          


     })
     //adding a company provided by the users solution 2
router.route('/add')

     .get(function(req,res){
    
   var name = req.query.name;
   var score = req.query.score;
   var sector = req.query.sector;


console.log(name);
console.log(score);
console.log(sector);
      Company.create({name : name, score:score, sector: sector},function(err,company){
      if(err){
        console.log("err");
      }else{

         console.log(company);
         res.json({message: company});
}

});
    });
     //adding a user to the comapny solution 3  and maintaning real time protfolio
router.route('/user')

      .get(function(req,res){
           var company = req.query.company;
          console.log(company);
          var users = req.query.user;
         console.log(users);
     Company.find({name : company},function(err,data){
                  if(err){
                    res.send();
                       res.json({message : "fail"});
               console.log("err");

                  }else if(data === null){
                     res.json({message : "fail"});
                    }else
                    //solution part 3 users thresholed checing user threshold gor this company ASSUMED total no employee are 100 for the compniens
                      if(data[0].user.length < 10){
                             User.find({email : users},function(err,obj){
                                          console.log(obj);
                                          console.log(obj[0]);         
                     
                           //   console.log(rcode.toString());        
                        if(users ===   obj[0].email){
               
                 data[0].user.push(obj[0]._id);
            data[0].save();
             res.json({message: "HTTPOK"});
                    }
else{
         
             res.json({message: "sorry you are not allowed to register for this company"});
}                


}); 

                      }else{
                      data[0].user.forEach(function(seed){
                        // var id = req.params.gonderi_id;       
                          //  var o_id = new ObjectId(seed);
                          console.log(seed);
                         User.findOne({_id :seed},function(err,obj){
                                           console.log(obj);         
                             
                           //   console.log(rcode.toString());        
                        if(users ===   obj.email){
               
             res.json({message: "you alredy registerd for htis company"});
                    }
else{
              data[0].user.push(seed);
            data[0].save();
             res.json({message: "HTTPOK"});
}                


});       





      });



     


  }})

});

app.listen(3000,function(req,res){

   console.log("api is Up and live");	

});





