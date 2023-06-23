const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../model/userSchema')
const jwt=require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')
router.get('/', (req, res) => {
    res.send('Hello from router 22')
})
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "please fill it" })
    }
    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {

            return res.status(422).json({ error: "user exists" })


        } else if (password != cpassword) {
            return res.status(422).json({ error: "password and confirm password must be same" })
        } else {
            const user = new User({ name, email, phone, work, password, cpassword })
            await user.save().then(() => {
                res.status(201).json({ message: "user registered" })
            })
        }

    } catch (err) {
        console.log(err)
    }


})
// const createToken=async ()=>{
//     const token=await jwt.sign({_id:"fbhuebyusbasiubiansnundsunsus122"},"mynameisvedantlkhamar975@gmail.comdbhyhsyuhusbuis")
//     console.log(token)
//     const verify=await jwt.verify(token,"mynameisvedantlkhamar975@gmail.comdbhyhsyuhusbuis")
//     console.log(verify);
// }
// createToken()
router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.headers.name)
        if (!email || !password) {
            return res.status(422).json({ error: "please fill it" })
        }

        const userSignIn = await User.findOne({ email: email })
        if (userSignIn) {
            const isMatch = await bcrypt.compare(password, userSignIn.password)
            const token = await userSignIn.generateToken()
            console.log('usersignincalled')
            res.cookie("userData", token, {
                expires: new Date(Date.now() + 999999999),
                httpOnly: true
            })
            console.log(req.cookies)
            // console.log(token)
            if (!isMatch) {
                return res.status(404).json({ error: "Invalid Credentials pass" })
            } else {
                bcrypt.compare(password, userSignIn.password).then(() => {

                    console.log("promise completed")
                }).catch(err => {
                    console.log(err)
                })
                return res.status(200).json({ message: "user SignedIn Succesfully", token: token })

            }


        } else {
            return res.status(404).json({ error: "Invalid Credentials" })
        }

    } catch (err) {
        console.log(err)

    }



})
router.get('/about', authenticate, (req, res) => {
    // console.log(req.headers)
    console.log('about us called')
    console.log(req)
    const data = req.rootUser
    res.send(req.rootUser)
})
router.get('/logout', (req, res) => {
    // console.log(req.headers)
    console.log('logout')
    console.log(req.headers.token)
    const token=req.headers.token
    res.clearCookie(token,{path:'/'})
    res.status(200).send('user logged out')
})
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body
        console.log(req.body)
        if (!name || !email || !phone || !subject || !message) {
            return res.status(422).json({ error: "please fill it" })
        }
        const userQuery = await User.findOne({ email: email })
        if (userQuery) {
            const contact=await userQuery.contactUs( name, email, phone, subject, message )
            
                res.status(200).json({message:"your query has been submitted"})
                
        } else {
            res.status(404).json({ error: "user not found" })
        }
    } catch (err) {
        console.log(err)
    }
})


module.exports = router
