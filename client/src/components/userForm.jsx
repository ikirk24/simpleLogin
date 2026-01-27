import React, {useState} from 'react';
import '../app/routes/app.css'
import { Link, useNavigate} from 'react-router-dom';

export default function UserForm ({
    mode = "login", 
    onSuccess, 
    baseUrl = "http://localhost:8080"
    }) 

    {
    const isSignUp = mode === "signup"

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Signup only inputs 
    const [phone_number, setPhoneNumber] = useState("");
    const [age, setAge] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const navigate = useNavigate();
    async function handleSubmit(e) {
        e.preventDefault(e);
        setLoading(true);


        try {
            const endpoint = isSignUp ? "/signup" : "/login";
            const url = `${baseUrl}${endpoint}`

            const body = isSignUp ? {email, password, phone_number, age: Number(age)} : {email, password};

            if(!email || !password ) throw new Error("Both email and password are required");
            if (isSignUp && (!phone_number || !age )) throw new Error("Fill out all boxes")

            const res = await fetch(url, {
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(body)
            })

            let data = null;
            try {
                data = await res.json();
            } catch {
                data = null
            }

            if (!res.ok) { 
                throw new Error (data?.message || "Request failed")
            }

            onSuccess?.(data);
            !isSignUp ? navigate('/profile') : navigate('/')
        } catch(err) {
            setError(err.message || "Something went wrong") 
        } finally {
            setLoading(false)
        }

    }
    
    return (
        <div className="container">
            <h1> {isSignUp ? "Sign up" : "Log in"}</h1>
            <br />
            <form onSubmit={handleSubmit}>
                 <input 
                    className="email"
                    type="email" 
                    placeholder = "Email"
                    value={email} 
                    onChange = {(e) => setEmail(e.target.value)}/>
                
                <br />
                 {isSignUp ? 
                <>
                        <input
                        className = "phoneNumber"
                        type="tel"
                        placeholder = "Phone Number"
                        value ={phone_number}
                        onChange = {(e) => setPhoneNumber(e.target.value)}
                        />
                    <br />
                        <input
                        className = "age"
                        type="number"
                        placeholder = "Age"
                        value ={age}
                        onChange = {(e) => setAge(e.target.value)}
                        />
                        <br />
                </>
                
                : null } 
                    <input 
                    className="password"
                    type="password" 
                    placeholder = "Password"
                    value={password} 
                    onChange = {(e) => setPassword(e.target.value)}
                    />

                    <br />
                <button className="submitBtn" type="submit" disabled={loading}>
                    {loading ? "Please wait..." : isSignUp ? "Create Account" : "Log In" }
                </button>

                {isSignUp ? <p> Already have an account? <Link to="/">Sign in</Link></p>:
                 <p> Don't have an account yet? <Link to="/signup">Sign Up</Link></p>}
                {error && <p>{error}</p>}
                                     
            </form>
        </div>
    )
}