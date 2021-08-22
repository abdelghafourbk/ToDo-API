const mongoose = require("mongoose");

// task schema
//         userID: Object_id,
//         Index: int,   
//         day :”date”,
//         title: string,
//         Text: string ,
//         Completed: Boolean,

let taskSchema= new mongoose.Schema(
{
        Index:{
            type:int,
            required:true
        },

        user: {
            type: mongoose.Types.ObjectId,
            ref: "user",
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
}

);
module.exports=mongoose.model("task",taskSchema);