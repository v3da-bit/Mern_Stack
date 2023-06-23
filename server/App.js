console.log("hi")
const express=require('express')
const app=express()
const dotenv=require('dotenv')
const cors=require('cors')
const cookieParser=require('cookie-parser')
app.use(cookieParser())
dotenv.config({path:'./config.env'})

require('./db/conn')
const port=require('./db/conn')
const user=require('./model/userSchema')
app.use(express.json())
app.use(cors({
    origin:'*',
    methods:['Get','Post','Put']
}))
app.use(require('./router/auth'))

const middleware=(req,res,next)=>{
    console.log("hello i'm middleware");
    next()
}
app.get('/',(req,res)=>{
    res.send('Hello home from ghost')
})

// app.get('/contact',(req,res)=>{
//     res.send('Hello contact from ghost')
// })
app.get('/login',(req,res)=>{
    res.cookie('token', "hello world", {httpOnly: false});
    res.send('Hello login from ghost')
})
app.get('/register',(req,res)=>{
    res.send('Hello register from ghost')
})

app.listen(port,()=>{
    console.log(`server is listening ${port}`);
})