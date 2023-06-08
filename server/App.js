console.log("hi")
const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config({path:'./config.env'})
require('./db/conn')
const port=require('./db/conn')
const user=require('./model/userSchema')
app.use(express.json())
app.use(require('./router/auth'))

const middleware=(req,res,next)=>{
    console.log("hello i'm middleware");
    next()
}
app.get('/',(req,res)=>{
    res.send('Hello home from ghost')
})
app.get('/about',middleware,(req,res)=>{
    res.send('Hello about from ghost')
})
app.get('/contact',(req,res)=>{
    res.send('Hello contact from ghost')
})
app.get('/login',(req,res)=>{
    res.send('Hello login from ghost')
})
app.get('/register',(req,res)=>{
    res.send('Hello register from ghost')
})

app.listen(port,()=>{
    console.log(`server is listening ${port}`);
})