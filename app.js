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
     "added": new Date(),
     "id": Math.random().toString(36).substring(2)
    },
     {
     "user":"Faateh2" , 
     "text":"Be honest with yourself2",
     "added": new Date(),
     
     "id": Math.random().toString(36).substring(2)
    },
     {
     "user":"Faateh3" , 
     "text":"Be honest with yourself3",
     "added": new Date(),
     
     "id": Math.random().toString(36).substring(2)
    },
     {
     "user":"Faateh4" , 
     "text":"Be honest with yourself4",
     "added": new Date(),

     "id": Math.random().toString(36).substring(2)
    }

]
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , "Public")));
app.use(express.urlencoded({extented:false}));

app.get('/' , (req,res)=>{
    res.render('index' ,{messages:messages})
})
app.get('/new',(req,res)=>{
    res.render('new');
})
 app.post('/new' , (req,res)=>{
    const user = req.body.user;
    const text = req.body.text;
    const added= new Date();
    const id =  Math.random().toString(36).substring(2)
    messages.push({user , text, added , id})
    res.redirect('/')
 })
app.get('/messages/:id', (req, res) => {
  const id = req.params.id;
  const msg = messages.find((msg)=>msg.id===id);
  if (!msg) {
    return res.status(404).send('Message not found');
  }
  res.render('singleMsg', { message: msg });
});
app.get('/messages/:id/edit' , (req,res)=>{
    const id = req.params.id ; 
    const msg = messages.find((msg)=>msg.id===id);
    if(!msg){
        res.status(404).send('Message not Found');
    }
    res.render('edit' , {message:msg})
})

app.post('/messages/:id/edit' , (req,res)=>{
    const id = req.params.id;
    const msg = messages.find((msg)=>msg.id===id);
    console.log(msg);
      if(!msg){
       return res.status(404).send('Message not Found');
    }
    msg.user = req.body.user;
    msg.text = req.body.text;
    msg.added = new Date();
    res.redirect('/')
})
app.listen(PORT, (req,res)=>{
    console.log(`server running on port ${PORT}`)
})