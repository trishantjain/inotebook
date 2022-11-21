import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    }, [])


    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

    // Updating Note in database
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
    }

    // Changing state of "Title" and "description" field in input field.
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Addnote mode={props.mode} />

            {/* Modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className={`modal-content text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className={`modal-body `}>
                            <form>
                                {/* Title Input */}
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                                    <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="etitle" value={note.etitle} name='etitle' aria-describedby="emailHelp" onChange={onChange} />
                                </div>

                                {/* Description Input */}
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                                    <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="edescription" value={note.edescription} name='edescription' onChange={onChange} />
                                </div>

                                {/* Tag Input */}
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label fw-bold">Tag</label>
                                    <input type="text" className={`form-control text-${props.mode === 'light' ? 'dark' : 'light'} bg-${props.mode === 'light' ? 'light' : 'dark'}`} id="etag" value={note.etag} name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Your Notes Section */}
            <div className={`container row m-5 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h1> Your Notes </h1>
                <div className="">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {/* To fetch Notes from the database */}
                {notes.map((note) => {
                    return <Noteitem mode={props.mode} key={note._id} updateNote={updateNote} note={note} />;
                })}

            </div>
        </>
    )
}

export default Notes
