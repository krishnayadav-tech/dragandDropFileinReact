let express = require('express');
let app = express();
let cors = require('cors');
var multer  = require('multer');
const fs = require('fs');
let testFolder = __dirname + '/uploads/';
let storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function ( req, file, cb ) {
            cb( null, file.originalname+ ".csv");
        }
    }
);

let upload = multer({
    storage : storage, 
    dest: 'uploads/',
    limits: { fileSize: 20971520 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "text/csv") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only csv format allowed!'));
        }
    }
})
app.use(cors());
app.use(express.json());

app.post('/uploadfiles',upload.array('avatar',10), function (req, res, next) {
    try{
        console.log("saved")
        res.status(200).json({status : "uploaded"});
    }catch(error){
        res.status(504).json({status:"Some problem"});
    }
})

app.get('/files',(req,res)=>{
    fs.readdir(testFolder,(err,files)=>{
        if(err){
            return res.status(404).json({status : "not found"});
        }
        return res.status(200).json({
            files : files
        });
    });
})
app.use('/',express.static('uploads'));
app.listen(3001,()=>{
    console.log("Running at port 3001");
})