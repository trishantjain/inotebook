import React from 'react'
// import { useContext }  from 'react'
// import Addnote from './Addnote';
// import Alert from './Alert';
import Notes from './Notes';

const Home = (props) => {

    return (

        <div>
            <Notes mode={props.mode} />
        </div>

    )
}

export default Home
