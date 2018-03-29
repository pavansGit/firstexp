var User = require('../models/user');

var async = require('async');

exports.index = function(req,res) {

   async.parallel({
      user_count: function(callback){
        User.count(callback);
      },
      list_users: function(callback) {
         User.find(callback)
           .sort([['first_name', 'ascending']])
      },

   }, function(err,results) {
       res.render('index', {title: 'Users Data Home', error: err, userCount: results.user_count, userList: results.list_users
     });
});

}

//Handle book create on POST.
exports.user_create = [

    (req, res, next) => {
      var user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name
      });

      //Data from form is valid. Save user.
      user.save(function(err){
         if (err) {return next(err);}
         //Successful - redirect to new book record.
           res.redirect('/users');
    });
  }
]
