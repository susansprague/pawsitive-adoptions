import AppNavbar from "../components/React/Navbar"
import AppLogIn from "../components/auth/signIn"



function AppSignIn (){
    return( 
        <div>
        <h1>Pawsitive Adoptions</h1>          
  <AppNavbar />
       <h2>Sign-In</h2>
   <AppLogIn />
       </div>
    )
}

export default AppSignIn