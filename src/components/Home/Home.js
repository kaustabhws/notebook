import React from 'react'
import './Home.css'
import Notes from '../Notes/Notes'

const Home = (props) => {

  return (
    <div className='container'>
      <Notes mode={props.mode} toggleMode={props.toggleMode} myStat={props.myStat} />
    </div>
  )
}

export default Home