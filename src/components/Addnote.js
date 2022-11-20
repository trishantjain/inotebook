import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
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
        <div className='p-5'>
            <div className='container my-5'>
                <h1>Add a Note</h1>

                <form>
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                    </div>

                    {/* Description Input */}
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                    </div>

                    {/* Tag Input */}
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Description</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
                <br /><br /><br />
            </div>
        </div>
    )
}

export default Addnote
