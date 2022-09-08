import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import { authActions } from '../store';
import './Header.css';
function Header() {
    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    const dispatch = useDispatch();
  return (
    <div >  
        <Navbar expand="lg" className='color-nav' variant='dark'>
      <Container fluid>
        <Navbar.Brand href="/">ERA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           { isLoggedIn && <NavDropdown title="BLOGSHUB" style={{color:'#3c3f45'}} >
              <NavDropdown.Item  className='text-light' href="/blogs" style={{backgroundColor:'#3c3f45'}}>ALL BLOGS</NavDropdown.Item>
              <NavDropdown.Item className='text-light' href="/myblogs" style={{backgroundColor:'#3c3f45'}}>MY BLOGS</NavDropdown.Item>
              <NavDropdown.Item className='text-light' href="/addblogs" style={{backgroundColor:'#3c3f45'}}>ADD BLOGS</NavDropdown.Item>
            </NavDropdown>}
           {isLoggedIn && <Nav.Link disabled href='todos' >TODOS</Nav.Link>}
  
            </Nav>
            <Nav>
            {!isLoggedIn && <Nav.Link href="login" >LOGIN</Nav.Link>}
            {isLoggedIn && <Nav.Link onClick={()=>dispatch(authActions.logout())} href = "/">LOGOUT</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <hr  className='text-white'/>

  </div>
  )
}

export default Header