import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../../context/notes/NoteContext'
import NoteItem from './NoteItem'
import './Notes.css'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = () => {

    const context = useContext(NoteContext)
    const { notes, allNotes, editNote } = context

    const history = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')) {
            allNotes()
        } else {
            history('/welcome')
        } // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
        })
    }

    const [note, setNote] = useState({etitle: "", edescription: ""})

    const handleSubmit = (e) => {
        editNote(note.id, note.etitle, note.edescription)
        e.preventDefault()
        refClose.current.click()
    }

    const onChange = (e) => {
        setNote({
            ...note,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-4'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} value={note.etitle} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input className="form-control" id="edescription" name='edescription' rows="3" onChange={onChange} value={note.edescription} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button onClick={handleSubmit} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h3 className='myNotes'>Your notes</h3>
                {notes.map((context) => {
                    return <NoteItem key={context._id} updateNote={updateNote} note={context} />
                })}
            </div>
        </>
    )
}

export default Notes