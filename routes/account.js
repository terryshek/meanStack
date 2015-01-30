var express = require('express');
var router = express.Router();
var session = require('express-session');
var account = require('../model/userDb.js');


/* GET /todos listing. */
router.get('/userlist', function(req, res, next) {
  account.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});
/* POST /todos */
router.post('/adduser', function(req, res, next) {
  account.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* GET /todos/id */
router.get('/:username/:password', function(req, res, next) {
    account.find({username:req.params.username, password:req.params.password}, function (err, post) {
        if (err) return next(err);

        console.log(post.length);
        if(post.length>0){
            //res.redirect('/admin');
            res.json(post)
        }else{
            res.json({ message: 'login fail!' });
        }
        //res.json(post);
    });
});
/* Delete /todos/id */
router.delete('/deleteuser/:id',function(req, res) {
        account.remove({
            _id: req.params.id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
/* PUT /todos/:id */
router.put('/update/:id', function(req, res, next) {
  account.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
