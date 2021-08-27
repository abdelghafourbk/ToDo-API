const Task = require("../models/task");
module.exports = {

    AddTask: async(req,res,next)=>{
        try {
            const{Index,text, title, day} = req.body;
            const user = req.user._id;

            if(!Index)
                Index=0;
            task = await Task.create({user,text, Index, title, day});

            res.status(201).json(task);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },

    ShowTasks: async(req, res, next)=>
    {
        try {
            const tasks = await Task.find({user: req.user._id});
            res.status(200).json(tasks);
        } catch (e) {
            next({ message: e.message, status: 500 });
        }    
    },

    ShowCompletedTasks: async(req,res,next)=>
    {
     try
     {
      
      const task =Task.find({user:req.user_id,completed: true})
      res.status(200).json(task);
        
     }
     catch(e)
     {
        next({ message: e.message, status: 500 });
     }
    },
    
     UpdateTask: async(req,res,next)=>
     {
        const {completed, title, text, Index} = req.body; 
        try {
            id= req.params.id;
            const t = await Task.findById(id);
            if (typeof completed !== 'undefined')
            t.completed = completed;
            t.title = title ? title : t.title;
            t.text = text ? text : t.text;
            t.Index = Index ? Index : t.Index;
            
            await t.save();
            res.status(201).send(t);
        } catch (error) {
            next({ message: e.message, status: 500 });
        }
     },
        
    
     DeleteTask:async(req,res,next)=>
     {
        try{
            id= req.params.id;
            const task = await Task.findById(id); 
            await task.remove();
            res.json({ deleted: "successfully" });
        } catch(error){
            next({ message: e.message, status: 500 });
        }
            
         
       
     },
     ShowSpecificTask: async(req,res,next)=>{

        try{
            id= req.params.id;
            const task = await Task.findById(id); 
            
            if (task==null) return next({
                message: "we didn't find any task with this id!: "+id,
                status: 401,
            });
            res.json(task);
        }catch(e){
            next({ message: e.message, status: 500 });
        }
     }

    


    
};