
import { useState } from 'react'
import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()
    const [spamUserText, setSpamUserText] = useState(null)

    useEffect(() => {
        loadBug()
    }, [])

    async function loadBug() {
        try {
            const bug = await bugService.getById(bugId)
            setBug(bug)
        } catch(err) {
                if (err.message==="You're being rate-limited. Please wait before trying again.") {
                    setSpamUserText(err.message)
                }else{
                    showErrorMsg('Cannot load bug')
                }

        }
    }
    if (spamUserText) return <h1>{spamUserText}</h1>
    if (!bug) return <h1>loadings....</h1>
    return <div className="bug-details main-layout">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>Severity: <span>{bug.severity}</span></p>
        <Link to="/bug">Back to List</Link>
    </div>

}

