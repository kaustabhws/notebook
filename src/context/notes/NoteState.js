import React, { useState } from 'react'
import NoteContext from './NoteContext'

const NoteState = (props) => {

    const host = "https://notebook-backend-19jg.onrender.com"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Fetch all notes
    const allNotes = async () => {

        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json)
    }

    // Add a note
    const addNote = async (title, description, tag) => {

        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });
        const json = await response.json();

        // const note = {
        //     "_id": "64d8711faa6bebrg05duuj1c",
        //     "user": "64cf6e3446e81fa48a4f123e",
        //     "title": title,
        //     "description": description,
        //     "tag": "personal",
        //     "date": "2023-08-13T05:58:55.398Z",
        //     "__v": 0
        // }
        setNotes(notes.concat(json))
    }

    // Edit a note
    const editNote = async (id, title, description) => {

        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description }),
        });
        await response.json();
        
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                break;
            }
        }
        setNotes(newNotes)
    }

    // Delete a note
    const deleteNote = async (id) => {

        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        await response.json();
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, allNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
