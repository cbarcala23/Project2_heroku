// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/main.html"));
      });
    
      app.get("/kpop", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/kpop.html"));
      });

      app.get("/rock", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/rock.html"));
      });

      app.get("/classical", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/classical.html"));
      });

      app.get("/jazz", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/jazz.html"));
      });

      app.get("/edm", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/edm.html"));
      });

      app.get("/hiphop", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/hiphop.html"));
      });
    
      app.get("/signup", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/views/html/signup.html"));
      });
    
      app.get("/login", function(req, res) {
        // If the user already has an account send them to the members page
        if (req.user) {
          res.redirect("/members");
        }
        res.sendFile(path.join(__dirname, "../public/views/html/login.html"));
      });
    
      // Here we've add our isAuthenticated middleware to this route.
      // If a user who is not logged in tries to access this route they will be redirected to the signup page
      app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/views/html/members.html"));
      });
    
}