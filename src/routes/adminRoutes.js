const express=require('express');
const {MongoClient}=require('mongodb');

const adminRouter=express.Router();
 const books = [
        {
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            bookId:656,
            read: false
        },
        {
            title: 'India 2020',
            genre: 'Philosophy',
            author: 'Abdul Kalam',
            bookId:1702312,
            read: true
        },
        {
            title: 'Wings of Fire',
            genre: 'Philosophy',
            author: 'Abdul Kalam',
            bookId:634583,
            read: false
        },
        {
            title: 'Patanjali',
            genre: 'Health',
            author: 'Jawaharlal Nehru',
            bookId:139352,
            read: false
        },
        {
            title: 'Harry Potter',
            genre: 'Fiction',
            author: 'J.K.Rowling',
            bookId:3,
            read: false
        },
    ]
const router=(nav)=>{
    adminRouter.route('/')
        .get((req,res)=>{
            const url='mongodb://localhost:27017';
            const dbName='libraryApp';
            const mongo=(async()=>{
                let client;
                try{
                    client=await MongoClient.connect(url);
                    const db=client.db(dbName);
                    const response=await db.collection('books').insertMany(books);
                    res.json(response);
                }
                catch(err){
                    console.log(err);
                }
                client.close();
            })();
            
        })
    return adminRouter
}

module.exports=router;