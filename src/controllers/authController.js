const {MongoClient}=require("mongodb");
const passport=require('passport');

const authController=(nav)=>{
    const signUpUser=(req,res)=>{
        const {username,password}=req.body;
        const url='mongodb://localhost:27017';
        const dbName='libraryApp';
        const addUser=(async()=>{
            let client;
            try{
                client=await MongoClient.connect(url,{useUnifiedTopology:true});
                const db=client.db(dbName)
                const coll=db.collection('users');
                const user={username,password};
                const results=await coll.insertOne(user);
                req.login(results.ops[0],()=>{
                    res.redirect('/auth/profile')
                })
            }
            catch(err){
                console.log(err);
            }
            client.close();
        })()
    }

    const signInUser=
        passport.authenticate('local',{
            successRedirect:'/books',
            failureRedirect:"/"
        })
    return {signUpUser,signInUser}
}
module.exports=authController;