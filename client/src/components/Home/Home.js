import React from 'react'
import {FiInstagram,FiGithub } from 'react-icons/fi'
import {FaLinkedinIn} from 'react-icons/fa'
import '../CSS/Home.css';
import Creator from './Creator';
import Bloghome from '../images/bloghome.png'
import todohome from '../images/todohome.png'
import {Row,Col,Button} from 'react-bootstrap';
import {useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom';
import homeimage from '../images/3d2.png';
import homeimage2 from '../images/wave2.png';
function Home() {
  
  // const navigate =     useNavigate();
  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <div className='container-fluid Home'>
      
     <Row>
     <Col xs={12} lg ={6}>
     <div  className='text-light fs-6 '>
     
     <h1  style={{fontSize:'8vw'}} className='m-5'><span className='stroke-text erafont'style={{}} >E</span>XOTIC</h1>
     <h1  style={{fontSize:'8vw'}} className='m-5'><span className='stroke-text erafont'>R</span>OBUST</h1>
     <h1  style={{fontSize:'8vw'}} className='m-5'><span className='stroke-text erafont'>A</span>DAPTABLE</h1>
     <img src={homeimage2} alt=""  className='w-100 ' style={{height:'20rem'}}/>
     </div>
     </Col>
     <Col xs={12} lg={6}> <img src={homeimage} alt=""  className='w-100'/></Col>
     </Row>  
     
     
      
<div className="blog-intro m-4">
<h1 className='stroke-text text-center fs-1'>BLOGS!</h1>
<hr className=' w-50 m-auto mb-5 font-weight-bold' style={{color : 'orange'}} />
<Row> 
<Col xs={12} md={6}> <img src={Bloghome} className='mx-auto d-block' alt="" /></Col>
<Col xs={12} md={3}>
<h3 className='text-white text-center font-weight-bold fs-2'>FEATURES</h3>
 <hr className='w-75 m-auto text-white ' />
 <div className='text-center m-3 text-light font-italic fs-5'> 
 <p>VIEW BLOGS</p>
  <p>ADD BLOGS</p>
  <p>UPDATE BLOGS</p>
  <p>DELETE BLOGS</p>
  {!isLoggedIn && <Button href='login' variant='outline-warning' size='lg' className='m-3 w-50 mx-auto d-block'>BLOGS</Button>}
  {isLoggedIn && <Button href='blogs' variant='outline-warning' size='lg' className='m-3 w-50 mx-auto d-block'>BLOGS</Button>}
 </div>
  
 <Col md={3}> </Col>
  
</Col>

</Row>



</div>
      
 
<div className="todo-intro m-4">
<h1 className='stroke-text text-center fs-1'>TODOs!</h1>
<hr className=' w-50 m-auto mb-5' style={{color : 'orange'}} />
<Row>
<Col md={3}> </Col>
<Col xs={12} md={3} >
 <h3 className='text-center display-6 text-light'>CATCHES UP IN THE NEXT UPDATE!</h3> 
 {!isLoggedIn && <Button href='login' variant='outline-warning' size='lg' className='m-3 w-50 mx-auto d-block'>TODOS</Button>}
 {isLoggedIn && <Button href='login' variant='outline-warning' size='lg' className='m-3 w-50 mx-auto d-block' disabled>TODOS</Button>}
</Col>
<Col xs={12} md={6}> <img src={todohome} className='mx-auto d-block' style={{height :'15rem'}} alt="" /></Col>
</Row>
<hr />
</div>
     

      
    
      
      <Creator/>

      
      <hr className='text-light mt-5' style={{height :'10px'}}/>
      <div className='text-center '>
        
        <Row>
          <Col xs={12} md={4}><div className='footer-blur-1'></div></Col>
          <Col xs={12} md={4}>
          <a href="https://www.instagram.com/tejeswar_68/" className='text-white' ><FiInstagram className='m-4 display-6 icons'/></a>  
    <a href="https://github.com/tejeswar68" className='text-white '> <FiGithub className='m-4 display-6 icons'/></a>  
    <a href="https://www.linkedin.com/in/tejeswara-murthy-palwadi-83b718204/" className='text-white '> <FaLinkedinIn className='m-4 display-6 icons'/></a>  
    </Col>
          <Col xs={12} md={4}><div className='footer-blur-2'></div></Col>
        </Row>
      
     
 
      </div>
    
   

    </div>
  )
}

export default Home