require('dotenv').config();
const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');
const passport=require('passport');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({secret:"library"}));
require("./src/config/passport.js")(app);
app.use(express.static(path.join(__dirname,'/public/')))
app.set("views",path.join(__dirname,"/src/views"))
app.set("view engine","ejs")

const nav=[
    {
        title:'Books',
        link:'/books'
    },
    {
        title:'Authors',
        link:'/authors'
    },
    {
        title:'Admin',
        link:'/admin'
    },
    {
        title:'Profile',
        link:'/auth/profile'
    },
    {
        title:'Logout',
        link:'/auth/logout'
    }
]
const bookRouter=require("./src/routes/bookRoutes")(nav)
const adminRouter=require("./src/routes/adminRoutes")(nav)
const authRouter=require("./src/routes/authRoutes")(nav)
app.use("/books",bookRouter);
app.use("/admin",adminRouter);
app.use("/auth",authRouter);
// app.use("/",bookRouter);

app.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname,'views/index.html'))
    res.render(
        "index",
        {
            title:"Library",
            formTitle:"SignIn",
            name:"signInForm",
            navigateUrl:"/auth/signIn"
        });
})


+
app.listen(process.env.PORT|3000,()=>{
    console.log("Server is up and It's running");
})