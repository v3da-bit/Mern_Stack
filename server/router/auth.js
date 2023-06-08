const express = require('express')
const router = express.Router()
const User = require('../model/userSchema')
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


        }
        const user = new User({ name, email, phone, work, password, cpassword })
        await user.save().then(() => {
            res.status(201).json({ message: "user registered" })
        })

    } catch (err) {
        console.log(err)
    }


})
router.post("/signin", async (req, res) => {
    try{
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "please fill it" })
    }

    const userSignIn = await User.findOne({ email: email })
    if (userSignIn) {
        
        console.log(userSignIn)
        return res.json({ message: "user SignedIn Succesfully" })
    }else{
        return res.status(404).json({error:"user not found"})
    }

    }catch(err){
        console.log(err)

    }



})

module.exports = router
