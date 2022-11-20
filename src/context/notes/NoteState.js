import { useState } from "react"
import NoteContext from "./noteContext"


const NoteState = (props) => {
    const notesinitial = [
        {
            "_id": "63779c4e4c1625386068a20b",
            "user": "63726d45455f0697c995de22",
            "title": "mytitle",
            "description": "This is my first note",
            "tag": "Personnal",
            "date": "2022-11-18T14:53:02.695Z",
            "__v": 0
        },
        {
            "_id": "63779c6d4c1625386068a20e",
            "user": "63726d45455f0697c995de22",
            "title": "mytitle 2",
            "description": "This is my second note",
            "tag": "Additional",
            "date": "2022-11-18T14:53:33.195Z",
            "__v": 0
        }
    ]



    const [notes, setNotes] = useState(notesinitial)

    // Add a note 
    const addNote = (title, description, tag) => {
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

    }

    // Edit a note
    const editNote = () => {

    }

    return (

        // This is used so that we can access this component anywhere in the application.
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;