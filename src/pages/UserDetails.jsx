
import { useState } from 'react'
import { userService } from '../services/user.service.js'
import { bugService } from '../services/bug.service.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BugList } from '../cmps/BugList.jsx'

export function UserDetails() {

    const [user, setUser] = useState(null)
    const { userId } = useParams()
    const [userBugs, setUserBugs] = useState([])

    
    useEffect(() => {
        loadUser()
        if (userId) {
            loadBugsForUser(userId)
        }

    }, [userId])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        } catch(err) {
                    showErrorMsg('Cannot load user')
                }
    }
    
    async function loadBugsForUser(userId) {
        try {
            const newUserBugs = await bugService.getBugsForUser(userId)
            setUserBugs(newUserBugs)
        } catch(err) {
            showErrorMsg('Cannot load user')
        }
    }

    function onRemoveBug(){
        console.log("no remove from user page")
    }

    function onEditBug(){
        console.log("no edit from user page")
    }
    if (!user) return <h1>loadings....</h1>
    return <div className="user-details main-layout">
        <h3>User Details </h3>
        <h4>Username: {user.username}</h4>
        <h4>Id: {user._id}</h4>
        <h4>Full Name: {user.fullname}</h4>
        <Link to="/">Back to home</Link>
        {userBugs&&
            <BugList bugs={userBugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        }
       
    </div>

}

