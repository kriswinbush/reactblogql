let express = require('express');
let express_graphql = require('express-graphql');
let mongoose = require('mongoose');
let schema = require('./schema/schema');
var cors = require('cors');
let jwtMiddleware = require('express-jwt');
let bodyParser = require('body-parser');
var multer = require('multer');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

let app = express();
app.use(express.static('public'));
const root = require('./resolvers/rootResolver.js');
const storage = require('multer-gridfs-storage')({
    url: 'mongodb://127.0.0.1:27017/local',
    file: (req, file) => {
        console.log(file)
        let mimeTypes = ["image/jpg", "image/jpeg", "image/bmp", "image/gif","image/png"];
        if (mimeTypes.includes(file.mimetype)) {
          return {
            bucketName: 'blogphotos',
            filename: file.originalname.split('.')[0]
          };
        } else {
          return null;
        }
      }
 });

const upload = multer({ storage: storage });

app.use(cors({origin:'*'}))
app.use(bodyParser.json());
app.use(jwtMiddleware({secret:'secret', credentialsRequired: false, getToken: (req) => {
    let { authorization } = req.headers;
    if(authorization && authorization.split(' ')[0] === 'Bearer') {
        //console.log('inside authorization',`${authorization.split(' ')[1]}`)
        return `${authorization.split(' ')[1]}`;
    }
}}));

app.post('/upload',upload.single('postImage'),(req,res) => {
    res.json(req.file);
});

app.get('/image/:fileId', async (req, res) => {
    var gfs = Grid(conn.db);
    let fileDoc = await gfs.collection('blogphotos').find({_id: mongoose.Types.ObjectId(req.params.fileId)});
    let fileArray = await fileDoc.toArray();
    let readStream = await gfs.createReadStream({_id: fileArray[0]._id})
    readStream.pipe(res)
})

app.use((err,req,res,next) => {
    if(err.name === 'UnauthorizedError') {
        console.log(err)
    }
    next();
});

app.use("/graphql", express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
mongoose.connect('mongodb://localhost:27017/local');
let conn = mongoose.connection;
conn.on('error', () => console.log('Failed to connect to Mongo db'));
conn.once('open', () => console.log('connection to mongodb established'));

app.listen(4040, () => console.log('graphql is running on port 4040'));
