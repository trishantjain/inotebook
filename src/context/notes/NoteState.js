import { useState } from "react"
import NoteContext from "./noteContext"


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesinitial = []

    const [notes, setNotes] = useState(notesinitial)

    // Get all note 
    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                'Content-Type': 'applicaton/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MjZkNDU0NTVmMDY5N2M5OTVkZTIyIn0sImlhdCI6MTY2ODQ0NTE3MX0.kbCwCOFCnjdgFOB9iCt4TlCVexqmwW7lx0B-55c1mcQ",
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                'Content-Type': 'applicaton/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MjZkNDU0NTVmMDY5N2M5OTVkZTIyIn0sImlhdCI6MTY2ODQ0NTE3MX0.kbCwCOFCnjdgFOB9iCt4TlCVexqmwW7lx0B-55c1mcQ",
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = response.json();

        // Code for frontend        
        const note = {
            "_id": "63779c6d455c1625386068a20e",
            "user": "63726d45455f0697c995de22",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-11-18T14:53:33.195Z",
            "__v": 0
        };
        setNotes(notes.concat(note)) // Pushing note in notesinitial array by setState function
    }

    // Delete a note
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes) // Pushing note in notesinitial array by setState function
    }

    // Edit a note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'applicaton/json',
                'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3MjZkNDU0NTVmMDY5N2M5OTVkZTIyIn0sImlhdCI6MTY2ODQ0NTE3MX0.kbCwCOFCnjdgFOB9iCt4TlCVexqmwW7lx0B-55c1mcQ",
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = response.json();

        // Code for frontend
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }

    }

    return (

        // This is used so that we can access this component anywhere in the application.
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;