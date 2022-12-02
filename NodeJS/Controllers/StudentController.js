import ResultRecord from "../models/recordmodule.js";

const studentController = (req, res) => {

    res.render('S-login', { title: "student login", rollno: "", date: '', error: '' });
}
const verifyStudentController = (req, res) => {

    const rollno = req.body.rollno;
    const date = req.body.date;
    const data = {
        title: "Student Login Page"
    }
    isrollnoValid(rollno);
    isdateValid(date);

    function isrollnoValid(rollno) {
        if (!rollno) {
            return res.render('S-login', { title: data, rollno: "rollno is invalid!!!", date: '', error: '' });
        }

        if (rollno.length != 10) {

            return res.render('S-login', { title: data, rollno: "rollno should have 10 characters!!!", date: '', error: '' });
        }
    }
    function isdateValid(date) {
        if (!date) {
            return res.render('S-login', { title: data, rollno: "", date: 'date is not empty!!!', error: '' });
        }
    }
    console.log(rollno);
    console.log(date);
    ResultRecord.findOne({ rollno: rollno }, (err, result) => {

        if (result == null) {
            res.render('S-login', { title: data, rollno: "", date: '', error: "record not found plese enter right rollno" });

        }
        else {
            const date = result.date.toString();
            const date1 = new Date(date);
            console.log(date1.toLocaleDateString());
            const date2 = new Date(req.body.date);
            console.log(date2.toLocaleDateString());
            if (date1.toLocaleDateString().toString() === date2.toLocaleDateString().toString()) {

                const name = result.name;
                const rollno = result.rollno;
                const date = date1.toLocaleDateString();
                const score = result.score;
           

                return res.render('Success', {
                    success: name + " you got  " + score + " marks out of 500 please improve performance",
                    name: name, rollno: rollno, score: score, date: date
                });
            }
            else
                res.render('S-login', { title: data, rollno: "", date: '', error: 'no record found plese enter right rollno or date' });

        }




    });
}

export { studentController }
export { verifyStudentController }