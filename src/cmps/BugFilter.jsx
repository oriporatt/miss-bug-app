import { useEffect, useState } from "react"


export function BugFilter({ filterBy, onSetFilterBy }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    // useEffect(() => {
    //     onSetFilterBy(filterByToEdit)
    // }, [filterByToEdit])

    useEffect(() => {
        setFilterByToEdit(filterBy);
      }, [filterBy]); 

    function onSubmitFilter(event){
        event.preventDefault(); 
        onSetFilterBy(filterByToEdit)
        
    }

    function handleChange({ target }) {
        let { name: field, value, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }
    const { title, minSeverity } = filterByToEdit
    
    return (
        <form className="bug-filter" onSubmit={(event) => {onSubmitFilter(event)}}>
            <section>
                <label htmlFor="title">Title</label>
                <input value={title} name="title" id="title" onChange={handleChange} />
            </section>
            <section>
                <label htmlFor="minSeverity">Min. Severity</label>
                <input value={minSeverity} onChange={handleChange} name="minSeverity" id="minSeverity" />
            </section>
            <section>
                <button>Submit</button>
            </section>
        </form>
    )
}   