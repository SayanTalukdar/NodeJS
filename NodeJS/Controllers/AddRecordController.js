
import ResultRecord from "../models/recordmodule.js";
const recordController = (req, res) => {
    const data = {
        title: "add new Result"
    }
    if (!req.session.email) {
        return res.render('T-loginerror', { email: "", password: "", error: 'login first' });
    }
    res.render('AddRecord', { record: {}, success: '', name: '', rollno: "", score: '', date: '' });
}
const deleteController = (req, res) => {
    const data = {
        title: "add new Result"
    }
    if (!req.session.email) {
        return res.render('T-loginerror', { email: "", password: "", error: 'login first' });
    }

    var user_id = req.params.id;
    ResultRecord.findByIdAndRemove(user_id, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
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
    })
}
const updatedController = (req, res) => {
    const data = {
        title: "add new Result"
    }
    if (!req.session.email) {
        return res.render('T-loginerror', { email: "", password: "", error: 'login first' });
    }
    var user_id = req.params.id;
    console.log("start");
    ResultRecord.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            rollno: req.body.rollno,
            date: req.body.date,
            score: req.body.score,
            name: req.body.name
        }
    }, (error, result) => {
        if (!error) {
            console.log(typeof (result))
            var data = result;
            console.log(result + "jaiswho");
            console.log("end");
            res.render('updateRecord', { id: user_id, record: data, success: '', name: '', rollno: "", score: '', date: '' });
        }
    })
}
const backController = (req, res) => {
    if (!req.session.email) {
        return res.render('T-loginerror', { email: "", password: "", error: 'login first' });
    }
    ResultRecord.find({}, (error, result) => {
        if (!error && req.session.email) {
            console.log("jaiswal")
            console.log(result + "jaiswal");
            console.log(typeof (result))
            var data = result;
            return res.render('Crud-result', {
                records: data
            });

        }
        else
            return res.render('T-loginerror', { email: "", password: "", error: 'please login first' });

    });

}
const saveController = (req, res) => {
    let i = 0;
    const data = {
        title: "add new Result"
    }
    if (!req.session.email) {
        return res.render('T-loginerror', { email: "login first", password: "", error: '' });
    }
    const {
        name,
        rollno,
        date,
        score

    } = req.body;
    isrollnoValid(rollno);
    isnameValid(name);
    isscoreValid(score);
    isdateValid(date);

    function isrollnoValid(rollno) {
        if (!rollno) {
            i++;
            return res.render('AddRecord', { record: {}, success: '', name: '', rollno: "rollno is invalid!!!", score: '', date: '' });
        }

        if (rollno.length != 10) {
            i++;
            return res.render('AddRecord', { record: {}, success: '', name: '', rollno: "rollno should have 10 characters!!!", score: '', date: '' });
        }
    }
    function isnameValid(name) {

        if (!name) {
            i++;
            return res.render('AddRecord', { record: {}, success: '', name: 'name is invalid!!!', rollno: "", score: '', date: '' });
        }

        if (name.length < 5 || name.length > 20) {
            i++;
            return res.render('AddRecord', { record: {}, success: '', name: 'name should have minimum 5 characters max 20!!!', rollno: "", score: '', date: '' });
        }
    }
    function isscoreValid(score) {
        if (!score) {
            i++;
            return res.render('AddRecord', { record: {}, success: '', name: '', rollno: "", score: 'score is invalid!!!', date: '' });
        }

        if (parseInt(score) < 100 || parseInt(score) > 500) {
            i++;
            return res.render('AddRecord', { record: {}, success: '', name: '', rollno: "", score: 'score should have minimum 100 max 500!!!', date: '' });
        }
    }

    function isdateValid(date) {
        if (!date) {
            i++;
            console.log(i);
            return res.render('AddRecord', { record: {}, success: '', name: '', rollno: "", score: '', date: 'date is not empty!!!' });
        }
    }



    const record = new ResultRecord({
        name: name,
        rollno: rollno,
        date: date,
        score: score
    });

    try {
        if (i == 0 && req.session.email) {
            saveRecord();
            function saveRecord() {
                record.save();
                return res.render('AddRecord', {
                    record: {},
                    success: "record added successfully",
                    name: '', rollno: "", score: '', date: ''
                });
            }
        }



    }

    catch (err) {
        res.render('AddRecord', { record: {}, success: 'error in form', name: '', rollno: "", score: '', date: '' });
    }
}
const updateandsaveController = (req, res) => {
    const data = {
        title: "add new Result"
    }
    if (!req.session.email) {
        return res.render('T-loginerror', { email: "", password: "", error: 'login first' });
    }
    var user_id = req.params.id;
    let i = 0;
    isrollnoValid(req.body.rollno);
    isnameValid(req.body.name);
    isscoreValid(req.body.score);
    isdateValid(req.body.date);
    function isrollnoValid(rollno) {
        if (!rollno) {
            i++;
            return res.render('updateRecord', { id: user_id, record: {}, success: '', name: '', rollno: "rollno is invalid!!!", score: '', date: '' });
        }

        if (rollno.length != 10) {
            i++;
            return res.render('updateRecord', { id: user_id, record: {}, success: '', name: '', rollno: "rollno should have 10 characters!!!", score: '', date: '' });
        }
    }
    function isnameValid(name) {

        if (!name) {
            i++;
            return res.render('updateRecord', { id: user_id, record: {}, success: '', name: 'name is invalid!!!', rollno: "", score: '', date: '' });
        }

        if (name.length < 5 || name.length > 20) {
            i++;
            return res.render('AddRecord', { id: user_id, record: {}, success: '', name: 'name should have minimum 5 characters max 20!!!', rollno: "", score: '', date: '' });
        }
    }
    function isscoreValid(score) {
        if (!score) {
            i++;
            return res.render('updateRecord', { id: user_id, record: {}, success: '', name: '', rollno: "", score: 'score is invalid!!!', date: '' });
        }

        if (parseInt(score) < 100 || parseInt(score) > 500) {
            i++;
            return res.render('updateRecord', { id: user_id, record: {}, success: '', name: '', rollno: "", score: 'score should have minimum 100 characters max 500!!!', date: '' });
        }
    }

    function isdateValid(date) {
        if (!date) {
            i++;
            console.log(i);
            return res.render('updateRecord', { id: user_id, record: {}, success: '', name: '', rollno: "", score: '', date: 'date is not empty!!!' });
        }
    }

    console.log(user_id);
    ResultRecord.findOneAndUpdate({ _id: req.params.id }, {
        $set: {
            rollno: req.body.rollno,
            date: req.body.date,
            score: req.body.score,
            name: req.body.name
        }
    }, (error, result) => {
        if (!error) {
            ResultRecord.find({}, (error, result) => {
                if (!error) {
                    console.log(result + "jaiswal");
                    console.log(typeof (result))
                    var data = result;
                    return res.render('Crud-result', {
                        records: data
                    });

                }
            });
        }
    })
}



export { backController }
export { saveController }
export { recordController }
export { deleteController }
export { updatedController }
export { updateandsaveController }