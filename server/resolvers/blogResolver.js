let DbBlogData = require('../model/blogData');
let DbCommentData = require('../model/commentData');
let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/local');
var Grid = require('gridfs-stream');
var fs = require("fs");
Grid.mongo = mongoose.mongo;
var toBlob = require('stream-to-blob')
var btoa = require('btoa')
module.exports = {
    getAllBlogPost: (args, req) => {
        console.log(req.files)
        /* if(!req.user) {
            throw new Error('users token is expired')
        } */
        return DbBlogData.find();
    },
    getBlogPost: async (args, req) => {
        console.log(args.photoUrl)
        var gfs = Grid(conn.db)
        //console.log(gfs)
        //var result = []
        
        let fileDoc = await gfs.collection('blogphotos').find({filename : "dashboard-screen"})
       
        let fileArray = await fileDoc.toArray()
        console.log(fileArray);
                
                let readStream = await gfs.createReadStream({_id: fileArray[0]._id})
                
                let readStreamDone = new Promise((resolve, reject) => {
                    var result = []
                    var buffer = ''
                    readStream.on('data', function(chunk){
                        //buffer += chunk;
                        result.push(chunk)
                    });

                    readStream.on('end',() => {
                        console.log('1 end of read chunk')
                        //console.log(buffer)
                        //console.log(result);
                        //let n = new Blob([new Uint8Array(result)])
                        
                        resolve(result)
                    });

                    readStream.on('close',()=> {
                        console.log('2 done reading')
                        //let response = DbBlogData.find({_id: args._id})
                         //console.log(args)
                    });

                    readStream.on('error',()=> {
                        console.log('error found')
                        reject()
                    });
                })    
                    
            let streamResult = await readStreamDone;
            let b = Buffer.concat(streamResult);
                        let ab = Uint8Array.from(b);
                        console.log(ab)

            //let c = Buffer.concat(streamResult);
            const base64Img = btoa(ab) /* .toString('base64') */;
            //console.log(base64Img);
            let doc = await DbBlogData.findOne({_id: args._id});
            
            doc.comments = base64Img
            return doc;
    },
    createBlogPost: (args, req) => {
        /* if(!req.user) {
            // {req.user.role:admin} 
            throw new Error('users token is expired')
        } */
        let posts = {
            title: args.title,
            photoUrl: args.photoUrl || "",
            timestamp: args.timestamp || Date.now(),
            author: args.author,
            content: args.content, 
            comments: args.comments || []
            };
            return new DbBlogData(posts).save(); 
    },
    createBlogComment: (args, req) => {
        const {content, author, postId, rating} = args;
        let comment = {
            content,
            author,
            postId,
            rating
        };
        return new DbCommentData(comment).save();
    }
}