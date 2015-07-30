/**
 * Created by terryshek on 8/1/15.
 */
// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var superagent = require('superagent');
var postSchema = require("../model/postDb");
// load up the user model
var User = require('../model/userDb');

module.exports = function (passport) {
    console.log("passport")
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {
            console.log(email)
            console.log(password)
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                User.findOne({'username': email}, function (err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password, user.password)) {
                        console.log("run")
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                    }


                    // all is well, return user
                    else {
                        //
                        postSchema.remove({}, function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                superagent.get(req.body.resource)
                                    .end(function (err, response) {
                                        //console.log(response)
                                        if (response.ok) {
                                            for(var index in response.body){
                                                var newPost = new postSchema({
                                                    id: response.body[index]["id"],
                                                    title: response.body[index]["title"],
                                                    permalink: response.body[index]["permalink"],
                                                    content: response.body[index]["content"],
                                                    excerpt: response.body[index]["excerpt"],
                                                    date: response.body[index]["date"],
                                                    author: response.body[index]["author"],
                                                    categories: response.body[index]["categories"],
                                                    tags: response.body[index]["tags"]
                                                })
                                                //console.log(newPost)
                                                newPost.save(function (err, data) {
                                                    if (err) console.log(err);
                                                    else console.log('Saved : ', data );
                                                    //console.log(data);
                                                    return done(null, user);
                                                });
                                            }
                                        }
                                    })
                            }
                        })
                    }

                });
            });

        }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function (req, email, password, done) {
            console.log(email)
            console.log(password)
            console.log(req.body)
            if (email)
                email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

            // asynchronous
            process.nextTick(function () {
                // if the user is not already logged in:
                if (req.body) {
                    User.findOne({'username': email}, function (err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
                        } else {
                            console.log("new user creating!")
                            postData = req.body;
                            console.log(req.body)
                            // create the user
                            var newUser = new User();
                            newUser.username = postData.username.toLowerCase();
                            newUser.password = newUser.generateHash(password);
                            newUser.email = postData.email,
                            newUser.gender = postData.gender,
                            newUser.fullname = postData.fullname,
                            newUser.contact = postData.contact,
                            newUser.location = postData.location,
                            newUser.imageUrl = postData.imageUrl,
                            newUser.preference = postData.preference,
                            newUser.created_at = new Date(),
                                newUser.save(function (err) {
                                    if (err)
                                        return done(err);

                                    return done(null, newUser);
                                });
                        }

                    });
                    // if the user is logged in but has no local account...
                }
                else {
                    // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });

        }));

}
