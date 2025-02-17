
import { Link } from 'react-router-dom'
import { BugPreview } from './BugPreview'
import { useState } from 'react'
import { userService } from '../services/user.service.js'

export function BugList({ bugs, onRemoveBug, onEditBug }) {
  const [loggedinUser, setLoggedinUser] = useState(userService.getLoggedinUser())
  



  return (
    <ul className="bug-list">
      {bugs.map((bug) => (
        <li className="bug-preview" key={bug._id}>
          <BugPreview bug={bug} />
          {loggedinUser && (loggedinUser._id===bug.creator._id || loggedinUser.isAdmin) &&
          <div>
            <button
              onClick={() => {
                onRemoveBug(bug._id)
              }}
            >
              x
            </button>
            <button
              onClick={() => {
                onEditBug(bug)
              }}
            >
              Edit
            </button>
          </div>}
          <Link to={`/bug/${bug._id}`}>Details</Link>
        </li>
      ))}
    </ul>
  )
}
