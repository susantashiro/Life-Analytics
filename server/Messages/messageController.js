var mongoose = require('mongoose');
var schema = mongoose.Schema;
var promise = require('bluebird');
var accountSid = 'your account sid from twilio';
var authToken = 'your auth token from twilio';
var client = require('twilio')(accountSid, authToken);
var User = require('./../User/userModel');


var messageController = {
 //sends a text message asking if you achieved your goal today;
 sendText: function(){
   client.messages.create({
     to: '+your number from twilio',
     from: '+your number from twilio',
     body: 'Did you achieve your goal today?',
   }, function(err, message) {
         console.log(message.sid);
   });
 },

 //processes the response from the user
 getResponse: function(){
   console.log('get response is working')
   //gets messages from twilio
   var getMessageswithBluebird = function(messages){
     return new Promise(function(resolve,reject){
       client.messages.list({},function(err,data){
         if (err) console.log(err);
         else{
           var theMessages = data;
           resolve(theMessages);
         }
       });
     });
   };
   //then accesses the database to update information
   getMessageswithBluebird().then(function(theMessages){
     var responsetext = theMessages.messages[1].body;
     console.log(responsetext);

     //if response is yes, increase streak by 1
     if(responsetext.toLowerCase() === 'yes' ){
       User.findOne({firstName: 'leonard'},function(error,user){
         if(error) console.log(error);
         else {
           console.log(user.streak);
           var currentStreak = user.streak;
           var newStreak = {
             streak: currentStreak+1
           };

           User.update({ firstName: 'leonard' }, newStreak , { upsert: true }, function(err, result) {
             if (err) console.log(err);
             else {
               console.log(result);
               console.log('streak went up by 1 via Twilio');
             }
           });
         }
       });
     } else {

       //if User responds with anything other than yes, reset streak to zero
       User.findOne({firstName: 'leonard'}, function(error,user){
         if(error) console.log(error);
         else {
           console.log(user.streak);
           var currentStreak = user.streak;
           var newStreak = {
             streak: 0
           };

           User.update({ firstName: 'leonard' },newStreak , { upsert: true }, function(err, result) {
             if (err) console.log(err);
             else {
               console.log(result);
               console.log('streak cleared via Twilio');
             }
           });
         }
       });
     }
   });
 }
}

module.exports = messageController;
