import React from 'react'
// import { useContext }  from 'react'
// import Addnote from './Addnote';
// import Alert from './Alert';
import Notes from './Notes';

const Home = (props) => {
    const {showAlert} = props
    return (

        <div>
            <Notes showAlert={showAlert}  mode={props.mode} />
        </div>

    )
}

export default Home
