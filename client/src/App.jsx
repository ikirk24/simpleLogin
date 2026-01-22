import React, {useEffect, useState} from 'react';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/', {
            method: "GET",
            credentials: "include"
        })
        .then((response) => {
            if (!response.ok) throw new Error("not authorized")
            return response.json()
        }) 
        .then((data) => setData(data))
        .catch((error) => console.error(error))
    }, [])


  return (
    <div>
        <h1>Frontend</h1>
        
        {data ? data.users.map(user => 

            <p>{user.email}</p>
        )
        : <p>Loading ...</p>}
    </div>
  )
}

export default App