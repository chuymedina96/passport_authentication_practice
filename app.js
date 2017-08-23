var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    User                  = require("./models/user.js"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth");
//Passport
app.use(require("express-session")({
  secret: "Chuy is awesome",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser()

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


//Routes
app.get("/", function(req, res){
  res.render("landing");
});
app.get("/posts", function(req, res){
  res.render("index");
});
app.get("*", function(req, res){
  res.send("404!!! go back before its too late!");
})
//server
app.listen(3030, function(){
  console.log("Server has started successfully!");
})
