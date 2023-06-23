const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
 
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now()
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            },
            subject:{
                type:String,
                required:true
            },
            message:{
                type:String,
                required:true
            } 
            
        }
    ]
})
userSchema.pre('save',async function(next){
    console.log("pre func called")
    if (this.isModified('password')) {
        this.password=await bcrypt.hash(this.password,12)
        this.cpassword=await bcrypt.hash(this.cpassword,12)
        
    }
    next();
})
userSchema.methods.generateToken=async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }catch(err){
        console.log(err);
    }
}
userSchema.methods.contactUs=async function(name, email, phone, subject, message ){
    try{
        console.log(name, email, phone, subject, message )
        this.date=this.date
        this.messages=this.messages.concat({
            name,
            email,
            phone,
            subject,
            message

        })
        await this.save()
    }catch(err){
        console.log(err)
    }
}
const User=mongoose.model('MERN',userSchema)
module.exports=User