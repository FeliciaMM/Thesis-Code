import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import {AuthContext} from "./helpers/AuthContext";
import { useState, useEffect } from 'react';
import axios from 'axios';



function App() {
  const [authState, setAuthState] = useState({
    username:"", 
    id:0, 
    status: false,
  });

  useEffect(()=>{
    axios.get('http://localhost:3001/authentification/auth',{headers:{
      accessToken: localStorage.getItem('accessToken'),
    },
  }).then((response)=>{
      if(response.data.error){ setAuthState({...authState, status: false});
      }else{
        setAuthState({
          username:response.data.username, 
          id:response.data.id, 
          status: true,
        });
    }
    });
     
    
  },[]);

  const logout = ()=>{
    localStorage.removeItem("accesToken");
    setAuthState({
      username:"", 
      id:0, 
      status: false,
    });
  };

  return (
    <div className='App'>
      <AuthContext.Provider value={{authState,setAuthState}}>
      <Router>
        <div className='navbar'>
        <h1 className='usernameDisplay'>{authState.username}</h1>
        <Link to="/">Home Page</Link>
        <Link to="/createpost"> Create a Post</Link>
        {!authState.status ? (
          <>
        <Link to="/login">Login</Link>
        <Link to="/registration">Registration</Link>
        
        </>
      ):(
        <button onClick={logout}>Logout</button>
      )}
      
        </div>
        <Routes>
          <Route path ="/"element ={<Home/>}/>
          <Route path ="/createpost"element ={<CreatePost/>}/>
          <Route path ="/post/:id"element ={<Post/>}/>
          <Route path ="/registration"element ={<Registration/>}/>
          <Route path ="/login"element ={<Login/>}/>
        </Routes>
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;