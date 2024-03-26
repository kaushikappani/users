import logo from './logo.svg';
import './App.css';
import Axios from "axios"
import { useEffect, useState } from "react";



function App() {

  const [users, setUsers] = useState([]); 
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const loadData = async () => {
    const response = await Axios.get('http://localhost:3003/users');
    console.log(response.data);
    setUsers(response.data)
  }

  const AddUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3003/users', {
      id, name
    }).then(() => {
      setId(""); setName("");
    }).catch((err) => {
      console.log(err);
    })
    setTimeout(() => {
      loadData();
    }, 500)
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="App">

      <input placeholder='Enter ID ..' value={id} onChange={e => setId(e.target.value)} />
      <input placeholder='Enter Name ..' value={name} onChange={e => setName(e.target.value)} />
      <button onClick={AddUser}>Add</button>

      {
        users.map(e => (
          <div>
            {e.id} {e.name}
          </div>
        ))
      }
    </div>
  );
}

export default App;
