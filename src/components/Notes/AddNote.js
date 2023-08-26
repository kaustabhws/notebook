import React, { useContext, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext'

const AddNote = () => {

    const context = useContext(NoteContext)
    const { addNote } = context

    const [note, setNote] = useState({title: "", description: "", tag: "Default"})

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        setNote({title: "", description: "", tag: "Default"})
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <h3 className='myNotes'>Add a note</h3>
            <form className='my-4'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" value={note.title} minLength={5} className="form-control" id="title" name='title' aria-describedby="emailHelp"  onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" value={note.description} minLength={5} id="description" name='description' rows="3" onChange={onChange}></textarea>
                </div>
                <button disabled={note.title.length<5 || note.title.description<5} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote