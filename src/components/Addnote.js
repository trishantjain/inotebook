import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    // Function to add a note and passing it to "Addnote" component.
    const handleClick = (e) => { 
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }

    // Changing state of "Title" and "description" field in input field.
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
            <div className={`container my-4 text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`}>
                <h1>Add a Note</h1>

                <form>
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                    </div>

                    {/* Description Input */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="description" name='description' onChange={onChange} />
                    </div>

                    {/* Tag Input */}
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                <br /><br /><br />
            </div>
    )
}

export default Addnote
