var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
})
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", userSchema);
module.exports =  User;
/*
User.create({
  username: "chuymedina96",
  password: "password"
}, function(err, newUser){
  if(err){
    console.log(err);
  }else{
    newUser.save()
    console.log(newUser);
  }
});
*/
