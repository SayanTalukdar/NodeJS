import mongoose, { Schema } from "mongoose";

const module = mongoose.Schema;
const Teachermodule = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,

        }
    })


var User = mongoose.model('Teacherlogin', Teachermodule);
export default User