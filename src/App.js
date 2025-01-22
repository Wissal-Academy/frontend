import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [query, setQuery] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
        {
          username,
          email,
          password
        })
        console.log("Register with success", response.data)
    }catch {
      console.log("Register failed")
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/login/',
        {
          username, 
          password
        });
        setToken(response.data.access_token)
        setLoggedIn(true)
    }catch {
      console.log("Login Error")
    }
  }


  const fetchItems = async (query_params = '') => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/items/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: query_params
        }
      });
      setItems(response.data);
    } catch (error) {
      console.log('Failed to fetch items', error.response ? error.response.data : error.message);
    }
  }

  const handleSearch= (e) =>{
    e.preventDefault();
    fetchItems(query)
  }

  return (
   <>
      <h1>{loggedIn ? "Welcome!" : "Please login or register"}</h1>
      {!loggedIn ? (
        <>
          <h2>
            Register
          </h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button type='submit'>Register</button>
          </form>
          <hr />
          <h2>
            Login
          </h2>
          <form onSubmit={handleLogin}>
          <input
              type="text"
              placeholder='Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Login</button>
          </form>
        </>
      ):(
        <>
          <h3>List of Items</h3>
          <form onSubmit={handleSearch}>
            <input 
              type='text'
              placeholder='Search item ...'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type='submit'>Search</button>
          </form>
          <button onClick={() => fetchItems()}>Fetch Items</button>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong>: {item.description}
              </li>
            ))}
          </ul>
        </>
      )
    }
   </>
  );
}
export default App;
