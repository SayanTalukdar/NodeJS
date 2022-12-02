import mongoose from "mongoose";

const module = mongoose.Schema;
const Recordmodule = new module(
    {
        rollno: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,

        },
        date: {
            type: Date,
            required: true,

        },
        score: {
            type: Number,
            required: true,

        },

    })


var ResultRecord = mongoose.model('StudentRecord', Recordmodule);
export default ResultRecord;