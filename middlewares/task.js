const Task = require("../models/task");
module.exports = {

    AddTask: async(req,res,next)=>{
        try {
            const{user, Index, title, completed, day} = req.body;
            task = await Task.create({user, Index, title, completed, day});
            res.status(201).json(task);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },

    /*ShowTasks:

    ShowCompletedTask:

    ShowSpecificTask:

    UpdateTask:

    DeleteTask:*/


    
};
