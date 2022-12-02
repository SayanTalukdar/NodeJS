
import User from "../models/homemodule.js";
import ResultRecord from "../models/recordmodule.js";
const teacherController = (req, res) => {
    const data = {
        title: "teacher login"
    }
    res.render('T-login', data);
}
const teachersignin = (req, res) => {
    const data = {
        title: "create result",

    }

    req.session.email = req.body.email;
    if (!req.session) {
        return res.render('T-loginerror', { email: "email lenth should be under 254 char!!!", password: "", error: '' });
    }
    const { email, password } = req.body;
    var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    isEmailValid(email);

    function isEmailValid(email) {
        if (!email) {

            return res.render('T-loginerror', { email: "email is not valid!!!", password: "", error: '' });
        }

        if (email.length > 254) {

            return res.render('T-loginerror', { email: "email lenth should be under 254 char!!!", password: "", error: '' });
        }

        var valid = emailRegex.test(email);
        if (!valid) {

            return res.render('T-loginerror', { email: "email is not valid!!!", password: "", error: '' });
        }

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if (parts[0].length > 64) {

            return res.render('T-loginerror', { email: "email should contain @ and . symbol in write places!!!", password: "", error: '' });
        }

        var domainParts = parts[1].split(".");
        if (domainParts.some(function (part) { return part.length > 63; })) {
            return res.render('T-loginerror', { email: "email should have . n !!!", password: "", error: '' });
        }
        ispasswordValid(password);

        function ispasswordValid(password) {
            if (!password) {
                return res.render('T-loginerror', { email: '', password: "password is invalid!!!", error: '' });
            }

            if (password.length < 5 || password.length > 250) {

                return res.render('T-loginerror', { email: '', password: "password should minimum have 5 character!!!", error: '' });
            }





            // Create a schema

            const {
                email,

            } = req.body;

            User.findOne({ email: email }, (error, result) => {

                if (result == null) {

                    return res.render('T-loginerror', { email: "", password: "", error: 'email is invalid!!!' });
                }
                else if (result.email === req.body.email && result.password != req.body.password) {

                    return res.render('T-loginerror', { email: "", password: "password is invalid", error: '' });
                }
                else if (result.email != req.body.email) {

                    return res.render('T-loginerror', { email: "email is invalid", password: "", error: '' });
                }
                else if (result.email === req.body.email && result.password === req.body.password) {
                    req.session.email = result.email;
                    ResultRecord.find({}, (error, result) => {
                        if (!error) {
                            console.log(typeof (result))
                            var data = result;
                            return res.render('Crud-result', {
                                records: data
                            });

                        }
                    });

                }
                else
                    return res.render('T-loginerror', { email: "", password: "", error: 'please login first!!!' });

            }

            )
        }



    }
}

export { teachersignin }
export { teacherController }
