import express from 'express';
import {createUser, getOneUser} from './db.js'
import bcrypt from 'bcrypt';
const app = express(); 

const port = 8080;

//Middleware to parse bodies 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Login Route 
app.get('/', (req, res) => {
    res.json({
        "Hello": "There"
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
        return res.status(201).json({message: "User created ", user});

    } catch(err) {
        console.error(err)

        return res.status(500).json({message: "Sign up failed"})
    }



    
})



app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`)
})