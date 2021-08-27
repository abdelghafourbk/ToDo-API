const express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    port = 3000;
    app.use(express.json());
authRouter= require("./routers/auth");
userRouter = require("./routers/user");
taskRouter = require("./routers/task");
projectRouter = require("./routers/project");

app.use("/auth",authRouter);
app.use("/user",userRouter);
app.use("/task",taskRouter);
app.use("/project",projectRouter);



app.get('*', (req, res) => 
{   //?404 PAGE
    res.status(404).send({error :"ERROR NOT FOUND"});

});
        //? Errors handler function
        app.use(function (err, req, res, next) {
            console.error(err);
            res.status(err.status).json({ error: err.message });
        });


mongoose.set("debug", true); // in devolpment process
mongoose
    .connect( 'mongodb+srv://Admin:bvF3Y2JGlv3oqANc@cluster0.jipf0.mongodb.net/ToDo-API?retryWrites=true&w=majority' 
				,{		
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "ToDo-API",
    })
    .then((con) => {
        console.log("Database is connected");
        app.listen(port, () => {
            console.log(`Server started on ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });