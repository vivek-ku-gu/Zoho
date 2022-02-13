const { response } = require("express");
const express = require("express");

const { Socket } = require("socket.io");
const path = require("path");
const app = express()
const template_path = path.join(__dirname,"/public/views");
app.set("view engine","hbs");
app.set("views",template_path);

function apendToDom(data)
{
let ltag = document.createElement('li')
ltag.classList.add('comment','mb-3')

let markup = ` <div class="card border-light mb-3">
<div class="card-body">
    <h3>${data.username}</h3>
    <p>${data.comment}</p>
    
</div>
</div>`
ltag.innerHTML = markup;
commentbox.prepend(ltag);
}

app.use(express.json());
app.use(express.urlencoded({extended:true}))
const dbConnect = require('./dbconn')
dbConnect()
const Comment = require('./models/comment')
const Login = require('./models/login')
const port = process.env.PORT || 3000 ;
app.use(express.static('public'));

//routes
app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/secret',(req,res)=>{
    res.render('secret')
})

app.post("/secret", async (req,res)=>{
    try{
    const emailid= req.body.email;
    const  secret=req.body.secret;
    email = emailid
      const emailvalid = await Login.findOne({email:emailid});
      if(emailvalid.secret === secret)
   res.status(200).render("comment");
   else
   {
       console.log("wrong password");
   }
    }
   
    catch(error){
 res.status(404).send(error);
    }
     })

     app.post("/index", async (req,res)=>{
        try{
        const emailid= req.body.email;
        const  password=req.body.password;
        email = emailid
          const emailvalid = await Login.findOne({email:emailid});
          if(emailvalid.password === password)
       res.status(200).render("comment");
       else
      console.log("wrong password")
        }
       
        catch(error){
     res.status(404).send(error);
        }
         })
// app.post('/signup',(req,res)=>{
//     const comments= new Comment({
//         username :req.body.username,
//         comment : req.body.comment
//     })
 let email='';
    app.post("/signup", async (req,res)=>{
        try{
       const login = new Login({
           email: req.body.email,
           password: req.body.password,
           secret: req.body.secret
       })
       email = req.body.email
       const logined = await login.save();
       res.status(200).render("comment");
        }
        catch(error){
     res.status(404).send(error);
        }
         })

app.post('/comment',async(req,res)=>{
    try{
const comments= new Comment({
    username :email,
    comment : req.body.comment
})
// comments.save().then(response=>{
//     res.send(response)
// })
const commenting = await comments.save();

res.status(200).redirect("comment");
 }
 catch(error){
res.status(404).send(error);
 }
})
app.get('/comment/api', async (req,res)=>{
    try{
        const comments = await Comment.find()
     res.send(comments)
         }
        
         catch(error){
      res.status(404).send(error);
         }
})
app.get('/comment/filter', async (req,res)=>{
    try{
        const comments = await Comment.find({email:email})
     res.send(comments)
         }
        
         catch(error){
      res.status(404).send(error);
         }
})
app.get('/comment',  (req,res)=>{
 
       
        res.render('comment')
   
})



 app.listen(port,() =>{
    console.log(`listening at port number :${port}`);
});
// let io = require("socket.io")(server)

// io.on('connection',(socket)=>{
//     console.log(`connection id : ${socket.id}`)
//     //recieve event
//     socket.on('comment',(data)=>{
//         console.log(data)
//         socket.broadcast.emit('comment', data)
//     })
// })