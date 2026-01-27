import express from 'express';
import {createUser, getOneUser, getUserByEmail, getUsers} from './db.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';





dotenv.config();

const app = express(); 
const port = 8080;

//Middleware to parse bodies 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())
app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true
}))

//Login Route 
app.get('/', async (req, res) => {
    const users = await getUsers(); 
    return res.json({message: "Connected to frontend", users});
})

app.post('/login', async (req, res) => {
   const {email, password} = req.body; 

   if(!email || !password) {
    return res.status(400).json({message: "Email or password is missing"})
   }

   const user = await getUserByEmail(email);

   if(!user) {
    return res.status(400).json({message: "Email or password is incorrect"})
   }
   const isMatch = await bcrypt.compare(password, user.password_hashed);
   
   if(!isMatch) {
    return res.status(400).json({message: "Email or password is incorrect"})
   }

   const accessToken = jwt.sign(
       { sub: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '24h'})

   res.cookie("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax", 
            maxAge: 1000 * 60 * 60 * 24
        }) 

   return res.status(200).json({ 
    message:"Successfully logged in!",
    user: user.email
   })

})

//Hashing password function
async function hashedPassword(password) {
    const hashed = await bcrypt.hash(password, 12);
    return hashed;
}

//Sign up route 

app.post('/signup', async (req,res) => {
    const {email, phone_number, age, password} = req.body; 

    if (!email || !phone_number || !age || !password) {
        return res.status(400).json({
            message: "Fill out all requirements"
        })
    }
    
    try {
        const password_hashed = await hashedPassword(password);
        const ageNum = Number(age)
        const user = await createUser(email, phone_number, ageNum, password_hashed);
        return res.status(200).json({message: "User created ", user});

    } catch(err) {
        console.error(err)
        return res.status(500).json({message: "Sign up failed"})
    }

})

async function reqAuth (req, res, next) {
    const cookieToken = req.cookies?.accessToken; 

    const token = cookieToken 
    if (!token) return res.sendStatus(401); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            console.log("JWT VERIFY ERROR: ", err.message);
            return res.sendStatus(403);
        }
        req.user = user
        next()
    })
}

app.get('/profile', reqAuth, async (req, res) => {
    const user = await getOneUser(req.user.id)
    res.status(200).json({
        id: user.id,
        email: user.email,
        phoneNumber: user.phone_number, 
        age: user.age
    })
})



app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`)
})