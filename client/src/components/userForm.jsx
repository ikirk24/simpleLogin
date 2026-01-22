import React, {useState} from 'react';
import { Link } from 'react-router-dom';

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

    async function handleSubmit(e) {
        e.preventDefault(e);
        setLoading(true);


        try {
            const endpoint = isSignUp ? "/signup" : "/login";
            const url = `${baseUrl}${endpoint}`

            const body = isSignUp ? {email, password, phone_number, age: Number(age)} : {email, password};

            if(!email || !password ) throw new Error("Both email and password are required");
            if (isSignup && (!phone_number || !age )) throw new Error("Fill out all boxes")

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
        } catch(err) {
            setError(err.message || "Something went wrong") 
        } finally {
            setLoading(false)
        }

    }
    
    return (
        <div className="container">
            <h1> {isSignUp ? "Sign up" : "Log in"}</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input 
                    className="email"
                    type="email" 
                    placeholder = "Type in your email..."
                    value={email} 
                    onChange = {(e) => setEmail(e.target.value)}/>
                </label>


                 {isSignUp ? 
                <>
                    <label>
                        Phone Number
                        <input
                        className = "phoneNumber"
                        type="tel"
                        placeholder = "Type in your phone number"
                        value ={phone_number}
                        onChange = {(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        Age
                        <input
                        className = "age"
                        type="number"
                        placeholder = "Type in your age"
                        value ={age}
                        onChange = {(e) => setAge(e.target.value)}
                        />
                    </label>
                </>

                : null } 

                <label>
                    Password
                    <input 
                    className="password"
                    type="password" 
                    placeholder = "*********"
                    value={password} 
                    onChange = {(e) => setPassword(e.target.value)}
                    />
                </label>


                <button type="submit" disabled={loading}>
                    {loading ? "Please wait..." : isSignUp ? "Create Account" : "Log In" }
                </button>

                {isSignUp ? <button> <Link to="/">Log in</Link></button> : <button> <Link to="/signup">Sign Up</Link></button>}
                {error && <p>{error}</p>}
                                     
            </form>
        </div>
    )
}