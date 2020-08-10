const pg=require('pg');

const config={
    user: 'lgljkbit',
    host: 'ruby.db.elephantsql.com',
    database: 'lgljkbit',
    password: 'b8pq7MfGwIP0WNeihjJOAYI1Ee3MWa4r',
    port: 5432,
  }
  

const pool=new pg.Pool(config);

const myClients=()=>{return new Promise((resolve,reject)=>{
    pool.connect((err,client,done)=>{
        if(err){
            console.log(err);
            reject(err)
        }
        else{
        resolve(client)}
    })
})}


module.exports=myClients;
