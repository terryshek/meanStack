//var express = require('express');
//var app = express.app();
//var member = require('../routes/account');
var account = require('../model/userDb.js');
var product = require('../model/productDb.js');
var contactQuery = require('../model/msgDb.js');
var postMsg = require('../model/postDb.js');
var comment = require('../model/commentDb.js');
var like = require('../model/likeDb.js');


var validateRequest = require('../config/validateRequest.js')

//var upload = require('../upload.js')
var fs = require('fs-extra');				//File System - for file manipulation

module.exports = function(app, passport){
    /* GET home page. */
    console.log("admin page !")
    app.get('/admin',isLoggedIn, function(req, res) {
        res.render('index', { title: 'Welcome to admin Page', profile:req.user, page:'admin',role:req.user.role });
    });
    app.get('/contact',isLoggedIn, function(req, res) {
        res.render('contact', { title: 'Welcome to contact Page', profile:req.user, page:'contact',role:req.user.role});
    });

// the main entry
    app.get("/",isLoggedIn, function(req, res){
        console.log("first page !")
        //sess.test ="testing";
        res.redirect('/home');
    })
    app.get("/welcome", function(req, res){
        console.log("welcome !")
        //sess.test ="testing";
        res.render('createAcc', { title: 'Welcome to admin Page', page:'welcome', profile:req.user});
    })
    app.get("/home",isLoggedIn, function(req, res){
        console.log("home page !")
        //sess.test ="testing";
        res.render('home', { title: 'Welcome to admin Page', profile:req.user ,page:'home',role:req.user.role });
    })
    app.get("/purchase",isLoggedIn, function(req, res){
        console.log("about page !")
        //sess.test ="testing";
        res.render('purchase', { title: 'Welcome to admin Page', profile:req.user ,page:'purchase',role:req.user.role });
    })
    app.get("/contact",isLoggedIn, function(req, res){
        console.log("contact page !")
        //sess.test ="testing";
        res.render('home', { title: 'Welcome to admin Page', profile:req.user ,page:'contact',role:req.user.role });
    })
    app.get("/order",isLoggedIn, function(req, res){
        console.log("contact page !")
        //sess.test ="testing";
        res.render('order', { title: 'Welcome to admin Page', profile:req.user ,page:'order',role:req.user.role });
    })
    app.get("/post",isLoggedIn, function(req, res){
        console.log("Post page !")
        //sess.test ="testing";
        res.render('post', { title: 'Welcome to post Page', profile:req.user ,page:'post',role:req.user.role });
    })
    app.get("/comment",isLoggedIn, function(req, res){
        console.log("comment page !")
        //sess.test ="testing";
        res.render('postComment', { title: 'Welcome to comment Page', profile:req.user ,page:'comment',role:req.user.role });
    })
// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/welcome', function(req, res) {
        console.log("login page !")
        res.render('login', { msg:  req.flash('loginMessage')  ,title:'welcome', page:'login'});
        //res.render('index', { title: 'Welcome to admin Page' });
    });

    // process the login form
    app.post('/login',function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            console.log(user)
            msg = req.flash('loginMessage')[0]
            console.log(msg)

            console.log('authenticate callback');
            if (err) { return res.send({'status':'err','message':err}); }
            if (!user) { return res.send({'status':1001,'message':msg}); }
            req.logIn(user, function(err) {
                if (err) { return res.send({'status':'err','message':err.message}); }
                account.find({}, function(err, users){
                    if (err) return next(err);
                    return res.send({'status':'200', msg:"login success", allProfile:users, this_profile:user });
                })
            });
        })(req, res, next)
    });

    //// process the signup form
    app.post('/users/adduser', passport.authenticate('local-signup', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/admin', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.post('/users/checkExit', function(req,res){
        console.log(req.body)
        account.findOne(req.body, function(err, post){
            if (err) return next(err);
            if(post){
                res.json({ message: false });
            }else{
                res.json({ message: true });
            }
        })
    })
    app.get('/getProfile', function(req, res) {
        console.log(req.user)
        res.json(req.user);
    });
    app.get('/getAllProfile', function(req, res) {
        console.log(req.user)
        account.find({}, function(err, users){
            if (err) return next(err);
            res.json(users);
        })
    });


    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.json({ message: 'logout success!' });
    });

    //============================================member account=======================================//
    app.post('/users/userlist', function(req,res) {
        validateRequest.validate(req,res,account,function(){
            account.find({}).sort( { "created_at": -1 }).find(function (err, todos) {
                if (err) return next(err);
                res.json(todos);
            });
        })
    });
    app.get('/list', function(req,res) {
            account.find({}).sort( { "created_at": -1 }).find(function (err, todos) {
                if (err) return next(err);
                res.json(todos);
            });
    });
    // all query
    app.post('/querylist', function(req,res) {
        validateRequest.validate(req,res,account,function(){
            var queryObj ={};
             if(req.body.role){
                 queryObj = {};
             }else{
                 queryObj = {username:req.body.username};
             }
            console.log(req.body.username)
            console.log(queryObj)
            contactQuery.find(queryObj).sort( { "created_at": -1 }).find(function (err, todos) {
                if (err) return next(err);
                res.json(todos);
            });
        })
    });
    //query respost
    app.post('/response', function(req, res, next) {
        //console.log("update!")
        console.log(req.body)
        var obj = req.body;
        var username = obj.username;
        contactQuery.findOneAndUpdate({username: username}, obj, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });
    // get all order
    app.post('/orderList',function(req,res){
        var queryObj ={};
        if(req.body.role){
            queryObj = {};
        }else{
            queryObj = {username:req.body.username};
        }
        console.log(req.body.username)
        console.log(queryObj)
        product.find(queryObj).sort( { "created_at": -1 }).find(function (err, todos) {
            if (err) return next(err);
            res.json(todos);
        });
    })
    /* GET /todos/id */
    app.get('/users/:username/:password', function(req, res, next) {
        account.find({username:req.params.username, password:req.params.password}, function (err, post) {
            if (err) return next(err);

            console.log(post.length);
            if(post.length>0){
                //res.redirect('/admin');
                res.json(post)
            }else{
                sess=req.session;
                sess.paasport="pass";
                sess.account = post;
                res.json({ message: 'login fail!' });
            }
            //res.json(post);
        });
    });
    /* Delete /todos/id */
    app.delete('/users/deleteuser/:id',function(req, res) {
        account.remove({
            _id: req.params.id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    app.delete('/deleteQuery/:id',function(req, res) {
        contactQuery.remove({
            _id: req.params.id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
    /* PUT /todos/:id */
    app.post('/users/update', function(req, res, next) {
        //console.log("update!")
        console.log(req.body)
        var obj = req.body;
        var id = obj._id;
        delete obj._id;
        account.update({_id: id}, obj, {upsert: true}, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });
    app.post('/deleteImg', function(req,res){
        console.log(req.body)
        account.find({username:{$ne:req.body.username},imageUrl:req.body.img}, function (err, post) {
            if (err) return next(err);
            console.log(post)
            if(post.length>0 || req.body.img=="img/defaultImg.jpg"){
                res.json({ message: 'Cannot be deleted' });
            }else{
                var filePath = __dirname + '/../public/'+req.body.img ;

                fs.unlinkSync(filePath);

                res.json({ message: 'Deleted successfully' });
            }
        })


    })
    app.post('/saveOrder', function(req,res){
        console.log(req.body)
        var obj = req.body;
        var username = obj.username;
            product.findOneAndUpdate({username:username},obj,function (err, data) {
                if (err) console.log(err);
                else console.log('Saved : ', data );
                res.json({ 'Saved':data });
            });
    })
    // ==========================image upload ======================================//
    app.route('/upload')

        .post(function (req, res, next) {

            var arr;
            var fstream;
            var filesize = 0;
            req.pipe(req.busboy);

            //--------------------------------------------------------------------------
            req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

                //uploaded file name, encoding, MIME type
                console.log('File [' + fieldname +']: filename:' + filename + ', encoding:' + encoding + ', MIME type:'+ mimetype);

                //uploaded file size
                file.on('data', function(data) {
                    console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                    fileSize = data.length;
                    console.log("fileSize= " + fileSize);
                });

                file.on('end', function() {
                    console.log('File [' + fieldname + '] ENDed');
                    console.log("-------------------------");
                });

                //populate array
                //I am collecting file info in data read about the file. It may be more correct to read
                //file data after the file has been saved to img folder i.e. after file.pipe(stream) completes
                //the file size can be got using stats.size as shown below
                arr= [{fieldname: fieldname, filename: filename, encoding: encoding, MIMEtype: mimetype}];

                //Path where image will be uploaded
                console.log(__dirname)
                fstream = fs.createWriteStream("http://q67457789.myqnapcloud.com/learningAppImg/" + filename);	//create a writable stream

                file.pipe(fstream);		//pipe the post data to the file


                //stream Ended - (data written) send the post response
                req.on('end', function () {
                    //console.log(fstream)
                    res.writeHead(200, {"content-type":"text/html"});		//http response header
                    res.end(JSON.stringify({msg:"upload success",path:"http://q67457789.myqnapcloud.com/learningAppImg/" + filename}));							//http response body - send json data
                });

                //Finished writing to stream
                fstream.on('finish', function () {
                    console.log('Finished writing!');

                    //Get file stats (including size) for file saved to server
                    fs.stat(__dirname + '/../public/img/' + filename, function(err, stats) {
                        if(err)
                            throw err;
                        //if a file
                        if (stats.isFile()) {
                            //console.log("It\'s a file & stats.size= " + JSON.stringify(stats));
                            console.log("File size saved to server: " + stats.size);
                            console.log("-----------------------");
                        };
                    });
                });


                // error
                fstream.on('error', function (err) {
                    console.log(err);
                });


            });  //	@END/ .req.busboy
        })	//	@END/ POST
    // ==============================post qurery in contact page ==========================//
    app.post('/query',function(req,res){
        var user = req.body;
        var query = new contactQuery({
            username:user.username,
            queryMsg:user.message,
            title:user.title,
            created_at: new Date().getMonth()+1 + "-" + new Date().getDate() + "-" + new Date().getFullYear()
        })
        query.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data );
            res.json({ 'Saved':data });
        });
    })
    app.post('/postComment', function(req,res){
        console.log(req.body)
        //console.log(req.user)

        var postComment = new comment({
            category:req.body.category,
            type:req.body.type,
            postId:req.body.post_link,
            commentBy:req.body.commentBy,
            comment:req.body.comment
        })
        postComment.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data );
            res.json({ 'status':200, "saved":data });
        });
    })
    app.post('/getComment', function(req,res){
        console.log(req.body);
        comment.find(req.body).sort( { "created_at": -1 }).find(function (err, comments) {
            if (err) return next(err);
            res.json(comments);
        });
    })
    // like post
    app.post('/likePost', function(req,res){
        console.log(req.body)
        //console.log(req.user)

        var doLikePost = new like({
            category:req.body.category,
            type:req.body.type,
            postId:req.body.post_link,
            likeBy:req.body.likeBy,
        })
        console.log(doLikePost)
        doLikePost.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data );
            res.json({ 'status':200, saved:data});
        });
    })
    app.post('/getLikePost', function(req,res){
        console.log(req.body);
        like.find(req.body).sort({ "created_at": -1 }).find(function (err, likes) {
            if (err) return next(err);
            res.json(likes);
        });
    })
    //post useful tip
    app.post('/usefulTip',function(req,res){
        var postTip = {
            usernameId: req.body.usernameId,
            title:req.body.title,
            description:req.body.description,
            imageUrl:req.body.postImg,
            created_at:req.body.created_at
        }
        var postTips = new postMsg(postTip)
        postTips.save(function (err, data) {
            if (err) console.log(err);
            else console.log('Saved : ', data );
            res.json({ 'Saved':data });
        });
    })
    app.get('/getAllPost', function(req,res){
        postMsg.find({}).sort( { "created_at": -1 }).find(function (err, todos) {
            if (err) return next(err);
            res.json(todos);
        });
    })

//====================================post purchase product =================================//
    app.post('/purchasing',function(req,res){
        var productObj = req.body;
        console.log(productObj)
        console.log(req.user.username)
        productObj.forEach(function(val, index) {
            // el - current element, i - index
            console.log(val)
            var purchase = new product({
                username:req.user.username,
                product_name:val.product_name,
                product_description:val.product_description,
                product_quanity:val.product_quanity,
                productImg:val.productImg,
                created_at: new Date().getMonth()+1 + "-" + new Date().getDate() + "-" + new Date().getFullYear()
            })
            console.log(purchase)
            purchase.save(function (err, data) {
                if (err) console.log(err);
                else console.log('Saved : ', data );
                res.json({ 'Saved':data });
            });
        });


    })
}
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    console.log('checking!')
    console.log(req.isAuthenticated())
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    if (req.isAuthenticated())
        return next();
    res.redirect('/welcome');
}


//module.exports = app;
