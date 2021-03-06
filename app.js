var express               = require("express"),
    app                   = express(),
    mongoose              = require("mongoose"),
    bodyParser            = require("body-parser"),
    passport              = require("passport"),
    User                  = require("./models/user.js"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/auth");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
//Passport
app.use(require("express-session")({
  secret: "Chuy is awesome",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//RESTful Routes
app.get("/", function(req, res){
  res.render("landing");
});
app.get("/secret", function(req, res){
  res.render("secret");
})
app.get("/register", function(req, res){
  res.render("register");
});
app.get("/login", function(req, res){
  res.render("login");
})
//Login logic
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}) ,function(req, res){
});
//Sign up logic
app.post("/register", function(req, res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      return res.render("register");
    }
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secret");
      });
  });
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
