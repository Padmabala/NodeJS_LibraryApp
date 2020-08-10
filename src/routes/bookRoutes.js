const express=require('express');
const bookRouter=express.Router();
const bookService=require("../services/goodReadsService");

const bookController=require("../controllers/bookController");

const router=(nav)=>{    
    const {getIndex,getById,middleware}=bookController(bookService,nav);
    bookRouter.use(middleware);
    bookRouter.route("/")
        .get(getIndex);
    
    bookRouter.route("/:id")
        .get(getById)
    return bookRouter;
}

module.exports=router;
