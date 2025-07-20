import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
const PORT=process.env.PORT||3001
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const messages = [
    {
     "user":"Faateh" , 
     "text":"Be honest with yourself",
     "added": new Date()
    },
     {
     "user":"Faateh2" , 
     "text":"Be honest with yourself2",
     "added": new Date()
    },
     {
     "user":"Faateh3" , 
     "text":"Be honest with yourself3",
     "added": new Date()
    },
     {
     "user":"Faateh4" , 
     "text":"Be honest with yourself4",
     "added": new Date()
    }

]
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , "Public")));
app.use(express.urlencoded({extented:false}));
app.use((req,res,next)=>{
    app.locals.username = "FAATEH029";
    next();
})
app.get('/' , (req,res)=>{
    res.render('index' ,{messages:messages})
})

app.listen(PORT, (req,res)=>{
    console.log(`server running on port ${PORT}`)
})