const express = require("express"),
    app = express(),
    mongoose = require("mongoose")
    port = 3000;

// authRouter= require("./routers/auth");
// userRouter = require("./routers/user");
// taskRouter = require("./routers/task");

// app.use("/",authRouter);
// app.use("/user",userRouter);
// app.use("/task",taskRouter);

app.use(express.json());

app.get('*', (req, res) => 
{   //?404 PAGE
    res.status(404).send({error :"ERROR NOT FOUND"});

});



mongoose.set("debug", true); // in devolpment process
mongoose
    .connect( 'mongodb+srv://Admin:bvF3Y2JGlv3oqANc@cluster0.jipf0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority' 
				,{		
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: "",
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