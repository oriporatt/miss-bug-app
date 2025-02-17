
import { useEffect,useState } from 'react'
import {UserMsg} from './UserMsg'
import { NavLink } from 'react-router-dom'
import { LoginSignup } from "./LoginSignup.jsx"
import { userService } from "../services/user.service.js"



export function AppHeader() {

  const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())


  async function onLogin(credentials) {
    console.log(credentials)
    try {
        const user = await userService.login(credentials)
        setLoggedinUser(user)
    } catch (err) {
        console.log('Cannot login :', err)
        showErrorMsg(`Cannot login`)
    }
  }

  async function onSignup(credentials) {
      console.log(credentials)
      try {
          const user = await userService.signup(credentials)
          setLoggedinUser(user)
          showSuccessMsg(`Welcome ${user.fullname}`)
      } catch (err) {
          console.log('Cannot signup :', err)
          showErrorMsg(`Cannot signup`)
      }
      // add signup
  }

  async function onLogout() {
      try {
          await userService.logout()
          setLoggedinUser(null)
      } catch (err) {
          console.log('can not logout');
      }
      // add logout
  }

  return (
    <header className='app-header '>
      <div className='header-container'>

      <section className="login-signup-container">
                    {!loggedinUser && <LoginSignup onLogin={onLogin} onSignup={onSignup} />}

                    {loggedinUser && <div className="user-preview">
                        <h3>Hello {loggedinUser.fullname}</h3>
                        <button onClick={onLogout}>Logout</button>
                    </div>}
      </section>

      <UserMsg />
      <nav className='app-nav'>
        <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
        <NavLink to="/user">Users</NavLink> | <NavLink to="/about">About</NavLink> |
      </nav>
      <h1>Bugs are Forever</h1>
      </div>
    </header>
  )
}
