import React from 'react';

const About = (props) => {

    return (

        <div className={`container my-4 text-${props.mode === 'light' ? 'dark' : 'light'} `} >
            <h2>
                Welcome to About section love to see you.
            </h2>
        </div>

    )
}

export default About
