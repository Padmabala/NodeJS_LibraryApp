const axios=require('axios');
const xml2js=require('xml2js');

const parser=xml2js.Parser({explicitArray:false});
const goodReadsService=()=>{
    const getBookById=(bookId)=>{
        return new Promise((resolve,reject)=>{
            axios.get(`https://www.goodreads.com/book/show/${bookId}.xml?key=xrcs77ug8en5p86zo0ypjw`)
            .then((response)=>{
                parser.parseString(response.data,(err,result)=>{
                    if(err){
                        console.log(err)
                        reject(err);
                    }
                    else{
                        resolve(result.GoodreadsResponse.book);
                        
                    }
                })
            })
            .catch(err=>{
                reject(err);
                console.log(err)})
        })
    }



    return {getBookById}
}

module.exports=goodReadsService()