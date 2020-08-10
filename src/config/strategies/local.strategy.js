const passport=require('passport');
const {Strategy}=require('passport-local');
const {MongoClient}=require('mongodb');
const localStrategy=()=>{
    passport.use(new Strategy(
        {
            usernameField:'username',
            passwordField:'password'
        },
        (username,password,done)=>{
            const url='mongodb://localhost:27017';
            const dbName='libraryApp';
            const mongo=(async()=>{
                let client;
                try{
                    client=await MongoClient.connect(url,{useUnifiedTopology:true});
                    const db=client.db(dbName);
                    const coll=db.collection('users');
                    const user=await coll.findOne({username});                    
                   if(user){
                    if(user.password===password){
                        done(null,user)
                    }
                    else{
                        done(null,false)
                    }
                   }
                   else{
                    done(null,false);
                   }
                }
                catch(err){
                    console.log(err);
                }
            })();
        }));
};

module.exports=localStrategy;