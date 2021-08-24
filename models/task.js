const mongoose = require("mongoose");

let taskSchema= new mongoose.Schema(
{
        user: { 
            type: mongoose.Types.ObjectId,
            ref: "user"
        },

        Index:{    //! i think we should call it a priority
            type: Number,
            required:true
        },

        title:{
            type: String,
            required: true
        },
        text: {
            type:String,
            default:""
           
        },
        completed:{
            type: Boolean,
            default:false
        },
        day:{
            type:Date
        }
},{timestamps : true}

);
module.exports = mongoose.model("task",taskSchema);