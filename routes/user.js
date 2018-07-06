/*my inserts*/
var date = require('date-and-time');

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}
var now = new Date().addHours(8);
date.format(now, 'MM/DD/YY hh:mm:ss A');
date.setLocales('en', {
    A: ['AM', 'PM']
});
var dateNow = date.format(now, 'MM/DD/YY hh:mm:ss A');

var needle = require('needle');

//ticket id
function makeid() {
  var rand = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    rand += possible.charAt(Math.floor(Math.random() * possible.length));

  return rand;
}

var tid = makeid();

exports.submit_photos = function(req, res){      
   message = '';
   if(req.method == "POST"){
      var post = req.body;
      var claimtype = post.claimType;
      var subclaimtype = post.subCType;
      var mid = post.mid;
      var fname = post.fname;
      var mname = post.mname;
      var lname = post.lname;
      var mob = post.contact;
      var email = post.email;
      var bday = post.bday;
      var address = post.address;
      var policy = post.policy;
/*      var imgName = req.files.imgFiles.name;
      var imgDir = 'https://honeypot.palmsolutions.co/pioneer-web/public/img/uploads/'+imgName;

      var imgFile = req.files.imgFiles;*/
      
/*      imgFile.mv('public/img/uploads/'+imgName, function(err) {
*/
/*         if(err){
            console.log(err);
         }else{*/
/*            console.log("img uploaded"); */
              var postInsert = {TicketId: tid, ClaimType: claimtype, SubClaimType: subclaimtype, MessengerId: mid, Fname: fname, Mname: mname, Lname: lname, Address: address, ContactNo: mob, EmailAdd: email, Bday: bday, PolicyNo: policy, ClaimDate: dateNow};
              var query = db.query("INSERT INTO pioneer_claims SET ?", postInsert, function(err, result) {

                //update patsy_users tag='ticketid'
                var postUpdate = {Tag: tid};
                var query2 = db.query("UPDATE patsy_users SET ? WHERE MessengerId='"+mid+"'", postUpdate, function(err, result){
                  console.log("pioneer user's ticket id updated");
                });                

                  message = "Succesfully! Your entry has been submitted.";
                  res.render('submit_photos.ejs', {message: message, status: "updateDone", title: "Success"});                 
                   var InitialData = {
                     mid: mid,
                     fname: fname,
                     lname: lname,
                     mobile: mob,
                     email: email,
                     policy: policy,
                     ctype: claimtype,
                     sctype: subclaimtype
                   };

                   var GlobalHeader = {
                     headers: { 'Content-Type': 'application/json' }
                   };
                    
                   needle.post('https://pioneer-patsy.herokuapp.com/submit_success', InitialData, GlobalHeader, function(err, resp, body) {
                     if(!err){
                       console.log(resp.body);

                     }
                     else{
                       console.log('needle error');
                     }
                   });                  

              });    //end sql  
/*         }*/

/*      });*/

   } else {
      res.render('submit_photos', {message: "", status: "", title: ""});   
   }

};

exports.safetrip_req = function(req, res){      
  if(req.method == "POST"){
    var post = req.body;
    var mid = req.mid;
    var safetripType = post.safetripType;

    var InitialData = {
      mid: mid,
      sttype: safetripType
    };
  
    var GlobalHeader = {
      headers: { 'Content-Type': 'application/json' }
    };
                    
    needle.post('https://pioneer-patsy.herokuapp.com/safetrip_req', InitialData, GlobalHeader, function(err, resp, body) {
      res.render('safetrip_req', {message: "success"});   
    }); 

  }else{
    res.render('safetrip_req', {message: ""});   
  }
};

exports.promo = function(req, res){      

   message = '';
   if(req.method == "POST"){
      var post = req.body;
      var mid = post.mid;
      var transno = post.trans_no;
      var fname = post.fname;
      var lname = post.lname;
      var mob = post.contact;
      var email = post.email;
      var bday = post.bday;
      var address = post.address;

      var postInsert = {MessengerId: mid, TransNo: transno, Fname: fname, Lname: lname, ContactNo: mob, EmailAdd: email, Bday: bday, Address: address, DateReg: dateNow};

      var query = db.query("INSERT INTO pioneer_promo_reg SET ?", postInsert, function(err, result) {

        message = "Succesfully! Your entry has been submitted.";
        res.render('promo.ejs', {message: message, title: "Success", status: "insertPromo"});
                 
        var InitialData = {
          mid: mid,
          transno: transno,
          fname: fname,
          email: email
        };

        var GlobalHeader = {
          headers: { 'Content-Type': 'application/json' }
        };
                    
        needle.post('https://pioneer-patsy.herokuapp.com/promo_reg', InitialData, GlobalHeader, function(err, resp, body) {
          if(!err){
            console.log(resp.body);
          }
          else{
            console.log('needle error');
          }
        });     

      });//end sql  

   } else {
      res.render('promo', {message: "", status: "", title: ""});   
   }

};

//quotation
exports.quotation = function(req, res){      
   message = '';
   if(req.method == "POST"){
      var post = req.body;
      var mid = post.mid;
      var fname = post.fname;
      var vType = post.vType;
      var fileNo = post.fileNo;
      var plateNo = post.plateNo;
      var engineNo = post.engineNo;
      var chassisNo = post.chassisNo;
      var vMake = post.vMake;
      var vSeries = post.vSeries;
      var vVariant = post.vVariant;
      var vColor = post.vColor;
      var yearModel = post.yearModel;
      var inceptionDate = post.inceptionDate;

               var postInsert = {MessengerId: mid, VehicleType: vType, FileNo: fileNo, PlateNo: plateNo, EngineNo: engineNo, ChassisNo: chassisNo, VehicleMake: vMake, VehicleSeries: vSeries, VehicleVariant: vVariant, VehicleColor: vColor, YearModel: yearModel, InceptionDate: inceptionDate};
               var query = db.query("INSERT INTO pioneer_quotation_inquiry SET ?", postInsert, function(err, result) {

                  message = "Succesfully! Your entry has been submitted.";
                  res.render('quotation.ejs', {message: message, title: "Success", status: "insertDone"});
                 
                   var InitialData = {
                     mid: mid,
                     fname: fname
                   };

                   var GlobalHeader = {
                     headers: { 'Content-Type': 'application/json' }
                   };
                    
                   needle.post('https://pioneer-patsy.herokuapp.com/quotation_inquiry', InitialData, GlobalHeader, function(err, resp, body) {
                     if(!err){
                       console.log(resp.body);

                     }
                     else{
                       console.log('needle error');
                     }
                   });                  

               });    //end sql  

   } else {
      res.render('quotation', {message: "", status: "", title: ""});   
   }

};
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;

      var sql = "INSERT INTO `patsy_admin`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

      var query = db.query(sql, function(err, result) {
         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `patsy_admin` WHERE `user_name`='"+name+"' and password = '"+pass+"'";                           
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('index.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('user id='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

/*   var sql="SELECT pioneer_submit_photos.MessengerId as Mid, Fname, Lname, ImgDir FROM pioneer_submit_photos JOIN patsy_users ON pioneer_submit_photos.MessengerId = patsy_users.MessengerId";*/
   var sql="SELECT * FROM pioneer_claims";
   var sql2="SELECT * FROM `patsy_admin` WHERE `id`='"+userId+"'";          

   db.query(sql, function(err, results){
     db.query(sql2, function(err, results2){  
        res.render('dashboard.ejs', {user:results, user2:results2});    
     });    
   });

};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/login");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `patsy_admin` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `patsy_admin` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};


exports.test=function(req,res){

      res.render('test', {message: "", status: "", title: ""});   
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
/*exports.delete = function(req, res){

   
   if(req.method == "POST"){

      db.query('DELETE FROM markers WHERE id = ' + req.body.id, function(err, results) {
         if(!err)
         res.redirect("/home/dashboard")    
      })    

   }

};*/
