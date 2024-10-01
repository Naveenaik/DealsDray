import React from 'react'
import Navbar from './Navbar'

const Home = ({admin}) => {
  return (
    <div>
        <div>
            <Navbar admin={admin}/>

        </div>
        <div className='mt-20 flex justify-center text-[#000] text-2xl font-bold'>
            Welcome to Admin panel
        </div>
    </div>
  )
}

export default Home