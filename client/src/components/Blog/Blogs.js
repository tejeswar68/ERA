import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Blog from './Blog';
import {Row,Col,Button} from 'react-bootstrap'
import '../CSS/Blogs.css';

function Blogs() {

  const [blogs, setBlogs] = useState();
  const [flag, setFlag] = useState(false);
  const sendRequest = async () => {
    const res = await axios.get("http://localhost:5005/api/blog")
      .catch(err => console.log(err));
    const data = res.data;
    console.log(data);
    return data;
  }
  const reloadStories = (flag) => {
    setFlag(flag);
  }
  


  useEffect(() => {
    sendRequest().then(data => setBlogs(data.blogs));
  }, [flag])
  return (
    <div className='container-fluid'>
      
      {blogs && blogs.map((blog, index) =>
        (
        <Row>
          <Col  md={2}><div className='blog-blur'></div></Col>
          <Col xs={12} md={8}><Blog id={blog._id} isUser={localStorage.getItem("userId") === blog.user._id} key={index} title={blog.title} description={blog.description} image={blog.image} userName={blog.user.name} reloadStories={reloadStories}  className='mb-5'/></Col>
          <Col  md={2}><div className='blog-blur'></div></Col>
        </Row>
        
        )
      )}
     { blogs && blogs.length===0 && 
      <Row>
      <Col md={3}/>
      <Col xs={12} md={6} classname='m-auto'>
      <div className='container-fluid text-white mt-5 mb-5 text-center'>
       <h1>Ummm...</h1>
      <hr className='w-50 d-block mx-auto'/>
      <h2>Looks Like You Have Added Nothing In The Blogs</h2>
      <Button href='addblogs' variant='outline-warning' size='lg' className='m-3 w-50 mx-auto d-block'>ADD A BLOG</Button>
 </div>
      </Col>
      <Col md={3}/>
    </Row>
    
     }
     

    </div>
  )
}

export default Blogs;