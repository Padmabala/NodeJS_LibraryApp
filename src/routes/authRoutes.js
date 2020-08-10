const express=require('express');
const {MongoClient}=require('mongodb');
const passport=require('passport');
const authRouter=express.Router();

const authController=require("../controllers/authController");

const router=(nav)=>{
    const {signUpUser,signInUser}=authController(nav)
    authRouter.route("/signUp")
        .get((req,res)=>{
            res.render("index",{
                title:"Library",
                formTitle:"SignUp",
                name:"signUpForm",
                navigateUrl:"/auth/signUp"

            });
        })

        .post(signUpUser);

    authRouter.route('/profile')
        .all((req,res,next)=>{
            if(req.user){
                next();
            }
            else{
                res.redirect("/");
            }
        })
        .get((req,res)=>{
            res.json(req.user);
        })

    authRouter.route('/signIn')
        .get((req,res)=>{
            res.render(
                "index",{
                    title:"Library",
                    formTitle:"SignIn",
                    name:"signInForm",
                    navigateUrl:"/auth/signIn",
                });
        })

        .post(signInUser);

    authRouter.route('/logout')
            .get((req,res)=>{
                req.logout();
                res.redirect('/');
            })
    
    return authRouter;
}

module.exports=router;