var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Trail       = require("./models/trail"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");
    
//REQUIRED ROUTES
var commentRoutes = require("./routes/comments"),
    trailRoutes = require("./routes/trails"),
    indexRoutes = require("./routes/index");
    
var url = process.env.DATABASEURL || "mongodb://localhost/trail_finder";
mongoose.connect(url);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require('moment');

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Get to the next screen",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/trails", trailRoutes);
app.use("/trails/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("TrailFinder has started!");
});