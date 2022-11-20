import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import Addnote from './Addnote';
import Noteitem from './Noteitem';


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context;

    return (
        <>
            <Addnote />
            <div className='p-5 row my-5'>
                <h1> Your Notes </h1>

                {/* To fetch Notes from the database */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} />;
                })}

            </div>
        </>
    )
}

export default Notes
