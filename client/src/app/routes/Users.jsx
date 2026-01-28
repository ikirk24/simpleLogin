import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

export default function Users () {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
            fetch('http://localhost:8080/', {
            method: 'GET',
            credentials: 'include'
        }).then((response) => {
            if (!response.ok) throw new Error("not authorized")
                return response.json()
        }).then(data => 
            setData(data)
        ).catch(error => setError(error.message))
    }, [])
    console.log(data?.users)
    return (
        <div className='usersContainer'>
            {error && <h1>{error}</h1>}
            
            {!error && 
            <>
            <h1 className='userTitle'>All Users</h1>
            <div className="userDiv">
            <p>ID</p>
            <p>Email</p>
            <p>Phone Number</p>
            <p>Age</p>
            </div>
            </>}
            {data &&
            data.users.map((user) => (
                <>
                <div className='userDiv' key={user.id}>
                <p>{user.id}</p>
                <p>{user.email}</p>
                <p>{user.phone_number}</p>
                <p>{user.age}</p>
                
                </div>
                </>
            ))}

            <button className='profileBtn'><Link to={'/profile'} style={{color: "rgb(245, 219, 185)"}}>Profile Page</Link></button>
        </div>
    )
}