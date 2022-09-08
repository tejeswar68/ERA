import React, { useEffect } from "react";
import {Routes,Route} from 'react-router-dom'
import Blogs from "./components/Blog/Blogs.js";
import BlogDetail from "./components/Blog/BlogDetail.js";
import AddBlog from "./components/Blog/AddBlog.js";
import UserBlogs from "./components/Blog/UserBlogs.js";
import Header from "./components/Header.js";
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/index.js";
import Home from "./components/Home/Home.js";
import Todos from "./components/Todos.js";

 import './App.css';
function App() {

  
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
 

  return (
    <div  className="App " >
      <Header/>
      <Routes>
        {!isLoggedIn?(<>
          <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        </>):(
          <>
          <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/myblogs' element={<UserBlogs/>}/>
        <Route path='/myblogs/:id' element={<BlogDetail/>}/>
        <Route path='/addblogs' element={<AddBlog/>}/>
        <Route path="/todos" element={<Todos/>}/>
        <Route path='/' element={<Home/>}/>
          </>
        )}
       
        
      </Routes>
      
    </div>
  );
}

export default App;
