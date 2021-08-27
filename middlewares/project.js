const Project = require("../models/project");
const Task = require("../models/task");
const User = require("../models/user");
module.exports = {
    AddProject: async(req,res,next)=>
    {
        
          const{title, description}= req.body,
            user = req.user;  
          try {
              const  project = await Project.create({title, description});
              await project.users.push(user);
             await project.save();
              res.status(201).json(project);  
            } catch (e) 
            {
                next({ message: e.message, status: 500 });
            }
    
        },
	
    deleteProject :async(req,res,next)=>
    {
        const {id} = req.params.id;
        userId = req.user;
        try{       
         await Project.findOneAndDelete(id);
         res.json({ deleted: "successfuly" });       
	    }
	    catch(e)
	    {
            next({ message: e.message, status: 500 });  
		}
	},
  

    addTaskToProject: async(req, res, next)=>
    {
        const id = req.params.id,
            {taskId}=req.body;
            userId = req.user;
        try{
           
            for ( var x=0;x<taskId.length;x++)
            {
                    //open project 
                let project= await Project.findById(id),   
                found=false;

                //check if task is already in project 

                for (var i=0;i<project.tasks.length;i++)
                {    
                    if(taskId[x]==project.tasks[i])
                    {
                        found=true;
                        break;
                    }
                }
                // if task is in project then go to next task
                if(found)
                continue;
                //check if task exists in data base
                let task = await Task.findById(taskId[x]);
                
                // if the task u want to add doesn't exist fu*k off
                if(task==null)
                continue;
                 //check if user has auth over the task
                if(await Task.find({user:userId})==null)
                continue;
                //add task to project  and save 
                await project.tasks.push(taskId[x]); 
                await project.save();
         
            };
            let project= await Project.findById(id);   
            res.status(200).json(project);    
            
            
        }catch(e){
            next({ message: e.message, status: 500 });
        }
    },

    addUsersToProject: async (req,res,next)=>
    {
            const id = req.params.id;
            const {usersId} = req.body;       
        try {
            const project = await Project.findById(id); 
                    if(project==null)
                    return next({
                        message: "You don't have authorization!!! get out",
                        status: 401,
                    }); 
                    for ( var x=0;x<usersId.length;x++) {                    found=false;
                    //check if user is already in project
                    for (var i=0;i<project.users.length;i++)
                    {    
                        if(usersId[x]==project.users[i])
                        {
                            found=true;
                            break;
                        }
                    }
                     // if user is in project then go to next user
                        if(found)
                        continue;
                        //check if user exists in data base
                        let user = await User.findById(usersId[x]);
                        // if the user u want to add doesn't exist fu*k off
                        if(user==null)
                        continue;
                        await project.users.push(usersId[x]); 
                    await project.save();
                };  
            res.status(200).json(project);    
        }catch (e) {
            next({ message: e.message, status: 500 });
        }
    },

    //! complete  delete tasks from prpject  
    //! also we should delete tasks of the user when user deleted and in order to do that ==> DONE MF
    //? show tasks by index sorting using sort function and queries if we want to

    showProjects: async(req, res, next)=>
    {
        try {

            const projects = await Project.find({users:req.user._id});
            res.status(200).json(projects);

        } catch (e) {
            
            next({ message: e.message, status: 500 });
        }    
    },
    deleteTaskFromProject:async(req, res, next)=>{
        const id = req.body.tasks,
            projectID= req.params.id;
        try {
            if(typeof id=="undefined")
              res.json({ Error: "no tasks given" });
            let project= await Project.findById(projectID);
                
            if(project == null)
            {
                res.json({ Error: "Project can't be found" });
            }
          
            for(var i = 0; i < id.length; i++)
            {
                console.log(id[i]);
                for(var j=0; j<project.tasks.length; j++){
                    if (project.tasks[j] == id[i])
                    {
                        console.log("equal");
                        await project.tasks.splice(j,1);
                        j--;
                        await project.save();
                    }
                }
            }
            res.json({ deleted: "successfully" });
        } catch (e) {
            next({ message: e.message, status: 500 });
        }
    },
    deleteUserFromProject:async(req,res, next)=>
    {
        let id = req.body.users;
        let projectId=req.params.id;
        try 
        {
            if(typeof id=="undefined")
            res.json({ Error: "no tasks given" });
         const project =  await Project.findById(projectId); 
         
         if(project==null)
         {
            res.json({ Error: "project can't be found" });
         }
        
         for(var i = 0; i < id.length; i++)
            {
                console.log(id[i]);
                for(var j=0; j<project.users.length; j++)
                {
                    if (project.users[j] == id[i]){
                        console.log("equal");
                       await project.users.splice(j,1);
                        j--;
                        await project.save();
                    }
                }
            }

          res.status(200).json("Users removed");
        } catch (e){
            next({ message: e.message, status: 500 });
           
        }
    },

    

    isInProject:async(req,res,next)=>{
        const id = req.params.id; 
        try{
        let project= await Project.findById(id);
        if(project==null)
        res.status(404).json("project Not Found");
        let user= await Project.find({users:req.user._id});
        if(user==null)      
         res.status(404).json("User Not Found in project");
        return next();
        
    }catch(e)
    {
        next({ message: e.message, status: 500 });
    }
        
    },

};