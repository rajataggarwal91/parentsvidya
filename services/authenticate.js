var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


function authenticate(username, password, role){
var MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://127.0.0.1:27017/parentsVidya', function(err, db) {
    if(err) throw err;
    passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
})
}
module.export('authenticate');