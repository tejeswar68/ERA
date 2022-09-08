import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Blog from './Blog';
import {Row,Col,Button} from 'react-bootstrap'

function UserBlogs() {
  const [user, setUser] = useState();
  const [flag, setFlag] = useState(false);

  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios.get(`http://localhost:5005/api/blog/user/${id}`).catch(err => console.log(err));
    const data = res.data;
    return data;
  }

  const reloadStories = (flag) => {
    setFlag(flag);
  }

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [flag])

  console.log(user);
 
  
  return (
    <div className='container-fluid'>{user && user.blogs && user.blogs.map((blog, index) =>
     
      <Row>
          <Col  md={2}><div className='blog-blur'></div></Col>
          <Col xs={12} md={8}> <Blog key={index} id={blog._id} title={blog.title} description={blog.description} image={blog.image} userName={user.name} isUser={true} flag={flag} reloadStories={reloadStories} /></Col>
          <Col  md={2}><div className='blog-blur'></div></Col>
        </Row>
      
     
      
      
    )}
     { user && user.blogs.length===0 && 
      <Row>
      <Col md={3}/>
      <Col xs={12} md={6} classname='m-auto'>
      <h1 className='m-5'>.</h1>
      <h1 className='m-2'>.</h1>
      <div className='container-fluid text-white mt-5 mb-5 text-center'>
      
       <h1>Ummm...</h1>
      <hr className='w-50 d-block mx-auto'/>
      <h2>Looks Like You Have Added Nothing In The Blogs</h2>
      <Button href='addblogs' variant='outline-secondary' size='lg' className='m-3 w-50 mx-auto d-block'>ADD A BLOG</Button>
 </div>
      </Col>
      <Col md={3}/>
    </Row>
    
     }
    </div>
    
    
  )
}

export default UserBlogs


// dwqbjqdw