const {MongoClient,ObjectID}=require("mongodb");

const bookController=(bookService,nav)=>{
    const getIndex=(req,res)=>{
        const url="mongodb://localhost:27017";
        const dbName="libraryApp";
        const mongo=(async ()=>{
            let client;
            try{
                client=await MongoClient.connect(url,{useUnifiedTopology:true});
                const db=client.db(dbName);

                const coll=await db.collection('books');

                const books=await coll.find().toArray()

                res.render(
                    "bookListView",
                    {
                        title:"Library",
                        nav,
                        books
                    });
            }
            catch(err){
                console.log(err);
            }
            client.close();
        })()          
    }
    const getById=(req,res)=>{
        const {id}=req.params;
        const url="mongodb://localhost:27017";
        const dbName="libraryApp";
        let book;
        const mongo=(async()=>{
            let client;
            try{
                client=await MongoClient.connect(url,{useUnifiedTopology:true});
                const db=client.db(dbName);

                const coll=db.collection("books");
                book=await coll.findOne({_id:new ObjectID(id)})
                book.details=await bookService.getBookById(book.bookId)
                
                res.render(
                    "bookView",
                    {
                        title:"Library",
                        nav,
                        book
                    });
            }
            catch(err){
                console.log(err);
            }
            client.close();
        })()
    }
    const middleware=(req,res,next)=>{
        if(req.user){
            next();
        }
        else{
            res.redirect('/auth/signIn');
        }
    }
    return {
        getIndex,getById,middleware
    };
}
module.exports=bookController;