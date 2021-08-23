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
        

        user: { 
            type: mongoose.Types.ObjectId,
            ref: "user"
        },

        Index:{    //! i think we should call it a priority
            type:int,
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
