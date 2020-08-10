const express=require('express');
const bookRouter=express.Router();
const myClients=require("../config/db");
const { resolveInclude } = require('ejs');
const router=(nav)=>{
    //const books = [
        // {
        //     title: 'War and Peace',
        //     genre: 'Historical Fiction',
        //     author: 'Lev Nikolayevich Tolstoy',
        //     read: false
        // },
        // {
        //     title: 'India 2020',
        //     genre: 'Philosophy',
        //     author: 'Abdul Kalam',
        //     read: true
        // },
        // {
        //     title: 'Wings of Fire',
        //     genre: 'Philosophy',
        //     author: 'Abdul Kalam',
        //     read: false
        // },
        // {
        //     title: 'Patanjali',
        //     genre: 'Health',
        //     author: 'Jawaharlal Nehru',
        //     read: false
        // },
        // {
        //     title: 'Harry Potter',
        //     genre: 'Fiction',
        //     author: 'J.K.Rowling',
        //     read: false
        // },
    //]
    let books;
    // (async function getBooks(str){
    //     console.log(str);
    //     await myClients()
    //         .then(async(client)=>{
    //             await client.query("select * from books")
    //                 .then(result=>{
    //                     books=result.rows
    //                 })
    //                 .catch(err=>console.log(err));
    //         })
    //         .catch(err=>console.log("The error is",err))
    // })("hey");
    let client=null
    if(client===null){
        const connectDB=(async param=>{
            await myClients()
                .then(async(res)=>{
                    client=res;                        
                })
                .catch(err=>console.log("The error that occured is",err))
        })("hey");
    }
    
    
    bookRouter.route("/")
        .get(async(req,res)=>{
            const result=await client.query("select * from books")
            books=result.rows;
            res.render(
                "bookListView",
                {
                    title:"Library",
                    nav,
                    books
                });
        });
    bookRouter.route("/:id")
        .all(async(req,res,next)=>{
            const {id}=req.params;
            await client.query("select * from books where id=$1",[id])
                .then(({rows})=>{
                    [req.book]=rows;
                    next();
                })
                .catch(err=>console.log(err));
        })
        .get(async(req,res)=>{
            res.render(
                "bookView",
                {
                    title:"Library",
                    nav,
                    book:req.book
                });
            
        })
        return bookRouter;
}

module.exports=router;