const mongoose = require("mongoose");

let projectSchema= new mongoose.Schema(
	{
    users:[ { 
		type: mongoose.Types.ObjectId,
			ref: "user"
    }],
    tasks:[{
        type: mongoose.Types.ObjectId,
        ref: "task"
        }],
	title:
        {
		type: String,
		required: true
     },
								
    description:{
        type: String,
        Default: ""
      },  
   
});
	module.exports = mongoose.model("project",projectSchema);
