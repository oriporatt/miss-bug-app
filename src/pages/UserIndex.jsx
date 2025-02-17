import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserList } from '../cmps/UserList.jsx'
import { useState } from 'react'
import { useEffect } from 'react'


export function UserIndex() {
  const [users, setUsers] = useState([])
  const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())

  useEffect(() => {
    loadUsers()
  }, [])


  async function loadUsers() {
    const users = await userService.query()
    setUsers(users)
  }

  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId)
      console.log('Deleted Succesfully!')
      setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId))
      showSuccessMsg('User removed')
    } catch (err) {
      console.log('Error from onRemoveUser ->', err)
      showErrorMsg('Cannot remove user')
    }
  }

  async function onAddUser() {
    const user = {
      username: prompt('Username?'),
      fullname: prompt('Full name?'),
      password: prompt('Password?'),
      score: +prompt('score?'),

    }
    try {
      const savedUser = await userService.save(user)
      console.log('Added User', savedUser)
      setUsers(prevUsers => [...prevUsers, savedUser])
      showSuccessMsg('User added')
    } catch (err) {
      console.log('Error from onAddUser ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditUser(user){
    const score = +prompt('New score?')
    const userToSave = { ...user, score }
    try {

      const savedUser = await userService.save(userToSave)
      console.log('Updated User:', savedUser)
      setUsers(preUsers => preUsers.map((currUser) =>
        currUser._id === savedUser._id ? savedUser : currUser
      ))
      showSuccessMsg('User updated')
    } catch (err) {
      console.log('Error from onEditUser ->', err)
      showErrorMsg('Cannot update user')
    }
  }
  function refreshCookie(){
    setLoggedinUser(userService.getLoggedinUser())

  }

  if (!loggedinUser||!loggedinUser.isAdmin )  {
    return (
      <>
          <h1>Admin Page Only</h1>
          <button onClick={refreshCookie}>Refresh User</button>
      </>
    )
  }

  return (
    <main className="main-layout">
      <button onClick={refreshCookie}>Refresh User </button>
      
      <h3>Users </h3>
      <main>
        <button onClick={onAddUser}>Add User</button>
        <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
      </main>
    </main>
  )
}
