import React, {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() =>{
    axios.get(
      'http://127.0.0.1:8000/api/items'
    ).then(
      response => {
        setItems(response.data)
      }).catch(
      error =>{
        console.log("There is an error in fetching data from Django ::", error)
    })
  }, []);

  return (
    <div>
      <h1>List Items</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
