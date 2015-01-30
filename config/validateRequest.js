/**
 * Created by terryshek on 23/1/15.
 */
var isEmailValid = function (db, username, callback) {

    db.findOne({
        username: username
    }, function (err, user) {
        //console.log(username)
        callback(user);
    });
};

module.exports.validate = function (req, res, db, callback) {
    // if the request dosent have a header with email, reject the request
    if (!req.body.username) {
        var response = {
            error: "You are not authorized to access this application",
            message: "An Email is required as part of the header"
        }
        res.json(response);
    };
    //console.log(req.body)
    isEmailValid(db, req.body.username, function (user) {
        //console.log(user)
        if (!user) {
            var response ={
                error: "You are not authorized to access this application",
                message: "Invalid User Email"
            }
            res.json(response);
        } else {
            callback();
        }
    });
};
