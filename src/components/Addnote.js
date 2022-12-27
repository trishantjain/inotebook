import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    // Function to add a note and passing it to "Addnote" component.
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Note created Successfully", "success")

    }

    // Changing state of "Title" and "description" field in input field.
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className={`container text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`}>
                <h1>Add a Note</h1>

                <form>
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="title" className="fw-bold form-label">Title</label>
                        <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                    </div>

                    {/* Description Input */}
                    <div className="mb-3">
                        <label htmlFor="description" className="fw-bold form-label">Description</label>
                        <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="description" name='description' value={note.description} onChange={onChange} minLength={5} required />
                        <pre className="">* atleast 5 characters</pre>
                    </div>

                    {/* Tag Input */}
                    <div className="mb-3">
                        <label htmlFor="tag" className="fw-bold form-label">Tag</label>
                        <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="tag" name='tag' value={note.tag} onChange={onChange} maxLength={12} />
                        <pre className="">* must be in capital letter</pre>
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
                <br /><br /><br />
            </div>
        </>
    )
}

export default Addnote
