import { useState } from "react"
import NoteContext from "./noteContext"


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesinitial = []

    const [notes, setNotes] = useState(notesinitial)

    //Function: - Get all note 
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'applicaton/json',
                'auth-token': localStorage.getItem('token') ,
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // Function: - For adding Note
    const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') ,
            },
            body: JSON.stringify({ title, description, tag })
        });

        // Updating note in frontend        
        const note = await response.json();
        setNotes(notes.concat(note))
    }

    // Function: - Delete a note
    const deleteNote = async (id) => {

        // API Call 
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') ,
            },
        });
        // const json = response.json();


        // Filtering note by its ID
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    //Function: - Edit a note
    const editNote = async (id, title, description, tag) => {

        // API Call 
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') ,
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = response.json();

        let newNote = JSON.parse(JSON.stringify(notes))
        // For frontend
        for (let i = 0; i < newNote.length; i++) {
            const element = newNote[i];
            if (element._id === id) {
                newNote[i].title = title;
                newNote[i].description = description;
                newNote[i].tag = tag;
                break;
            }
        }
        setNotes(newNote)
    }

    return (

        // This is used so that we can access this component anywhere in the application.
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;