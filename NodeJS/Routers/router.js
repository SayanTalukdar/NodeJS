import express from "express";
const router = express.Router();
import { logoutController } from "../Controllers/logutController.js"
import { teacherController, teachersignin } from "../Controllers/teacherController.js"
import { studentController, verifyStudentController } from "../Controllers/StudentController.js";
import { backController, deleteController, recordController, saveController, updatedController, updateandsaveController } from "../Controllers/AddRecordController.js";
import { indexController } from "../Controllers/indexController.js";

router.get('/', indexController);
router.get('/T-login', teacherController);
router.get('/delete/:id', deleteController);
router.get('/update/:id', updatedController);
router.post('/signin', teachersignin);
router.post('/updateandsave/:id', updateandsaveController);
router.get('/S-login', studentController);
router.post('/saverecord', saveController);
router.get('/addrecord', recordController);
router.get('/logout', logoutController);
router.get('/back', backController);
router.post('/verifyStudent', verifyStudentController);
export default router;

