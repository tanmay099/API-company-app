// var mongoose = require("mongoose");
var faker = require('faker');
var User = require("./models/user.js");
var Referral = require("./models/refral.js");
var Company = require("./models/company.js");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nira_app");
// var code = { rcode: 'NIRA01' };

// Referral.remove({},function(err,res){
// 	if(err){
//     console.log(err);
//      }
// console.log("removed");
//     });

var data = {
email: faker.internet.email(),
password: faker.internet.password()

}

// };
// {
// email: 'mohit.gothi@gmail.com',
// password: 'mohit000'
// }
// ];

// var data = [
// {
//    name : "Goldman Sachs",
//    score : 3,
//    sector : "finance"

// },{

// name : "JP morgen",
// socre: 2,
// sector: "finance"



// },{
// name: "EY",
// score: 8,
// sector: "finance"




// }
// ]

// data.forEach(function(seed){
//   Company.create(seed,function(err,company){
//       if(err){
//         console.log("err");
//       }else{
// }
         
// console.log(company);
// }
      



//   );




//})

// var data = [
// {
// email: faker.internet.email();
// password: faker.internet.password();




// }

// ]
 var code = 
{
	rcode: faker.lorem.word().toUpperCase()
}


 





 function seedDB(){
     

	
// User.remove({},function(err){
// 	if(err){
//     console.log(err);
//      }
// console.log("user removed");
//     });

// // Referral.remove({},function(err){
// // 	if(err){
// //     console.log(err);
// //      }
// // console.log("referral removed");
// //     });


  User.create(data,function(err,data){
if(err){
	console.log(err);
}else{
      Referral.create(code,function(err2,resCode){
          if(err2){
            console.log(err2);

          }else{
          	console.log(data);
          	data.Referral.push(resCode);
          	data.save();

            console.log("saved refferal");

          }});
	console.log("added user");
}



  });


};


// Referral.remove({},function(err,res){
// 	if(err){
//     console.log(err);
//      }
// console.log("removed");
//     });

     // Referral.create(code,function(err2,resCode){
     //      if(err2){
     //        console.log(err2);

     //      }else{
     //        console.log("saved referral");

     //      }});
 seedDB();