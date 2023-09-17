import AppNavbar from "../components/React/Navbar"
import { ListGroup } from "react-bootstrap"


function AppContact (){
    return( 
        <div>
        <h1>Pawsitive Adoptions</h1>          
  <AppNavbar />
       <h2>Contact</h2>
       <h3>Developer's GitHubs</h3>
       <ListGroup>
      <ListGroup.Item action href="https://github.com/LeeAmick">
        Lee Amick
      </ListGroup.Item>
      <ListGroup.Item action href="https://github.com/ayandele">
        Dele Ayansola
      </ListGroup.Item>
      <ListGroup.Item action href="https://github.com/kaikim1996">
        Kaitlyn Kim
      </ListGroup.Item>
      <ListGroup.Item action href="https://github.com/noahsalmon98">
        Noah Salmon
      </ListGroup.Item>
      <ListGroup.Item action href="https://github.com/susansprague">
        Susan Sprague
      </ListGroup.Item>


    </ListGroup>
       </div>
    )
}

export default AppContact