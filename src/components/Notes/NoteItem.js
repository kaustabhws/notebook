import React, { useContext, useState } from 'react'
import './Notes.css'
import NoteContext from '../../context/notes/NoteContext'

const NoteItem = (props) => {

    const context = useContext(NoteContext)
    const { deleteNote } = context

    const { note, updateNote } = props

    const [del, setDel] = useState(false)

    const delCheck = () => {
        setDel(true);
        setTimeout(() => {
            setDel(false);
        }, 1000);
        return;
    }

    if (del) {
        return (
            <div className='col-md-4 col-6 my-2 alert-div'>
                <div className="alert alert-success">Deleted Successfully</div>
            </div>
        );
    }

    return (
        <div className='col-md-4 col-6 my-2'>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="editicons">
                        <i className="fa-regular fa-pen-to-square" onClick={() => { updateNote(note) }}></i>
                        <i className="fa-regular fa-trash-can" onClick={() => { deleteNote(note._id); delCheck() }}></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem