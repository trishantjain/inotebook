import React, {useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
    const a = useContext(noteContext)

    return (

        <div className='m-5 p-5' >
            Welcome to About section
        </div>

    )
}

export default About
