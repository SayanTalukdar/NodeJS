import express from "express";
import mongoose from "mongoose";
const app = express();
const port = process.env.port || 3000
import router from "./Routers/router.js";
import session from "express-session";
mongoose.connect("mongodb://localhost:27017/TeacherData", { useNewUrlParser: true })
const db = mongoose.connection;
db.on('err', () => {
    console.log("error in connection");
})
db.once('open', () => {
    console.log("connected");
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "qwertyuioplkjhgf",
    resave: false,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');
app.use('/', router);
app.use('/back', router);
app.use('/addrecord', router);
app.use('/update/:id', router);
app.use('/updateandsave/:id', router);
app.use('/T-login', router);
app.use('/delete/:id', router);
app.use('/T-login', router);
app.use('/saverecord', router);
app.use('/logout', router);
app.use('/signin', router);
app.use('/S-login', router);
app.use("/verifyStudent", router);
app.listen(port, function () {
    console.log('connected');
});