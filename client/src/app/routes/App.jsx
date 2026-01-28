import React, {useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';

function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleLogout ()  {
        try {
            const res = await fetch('http://localhost:8080/logout', {
                method:"POST",
                credentials: "include"
            })
            if (!res.ok) throw new Error("logout failed")
            setData(null)
            setError(null)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }
    //Get The User 
    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            method: "GET",
            credentials: "include"
        })
        .then((response) => {
            if (!response.ok) throw new Error("not authorized")
            return response.json()
        }) 
        .then((data) => {
            setData(data)
            console.log("PROFILE RESPONSE:", data);
        })
        .catch((error) => setError(error.message))
    }, [])


  return (
    <div className='profileWrapper'>

        {error && <h1>{error}</h1>}


        {!error && !data && <h1>Loading...</h1>}

         { data &&
         <div className='profileContainer'>
            
          <h1>Welcome {data.email} </h1> 
            <button><Link to={'/updateprofile'}>Update Profile</Link></button>
            <button className='userBtn'> <Link to={'/users'} style={{color: "rgb(245, 219, 185)"}}>Show All Users</Link></button>
            <br />
            <button onClick={handleLogout}>Logout</button>
          </div>}
    </div>
 )} 

export default App