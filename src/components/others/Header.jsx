import React from 'react'

const Header = () => {

  const logOutUser=(props)=>{
    localStorage.setItem('loggedInUser','')
    props.changeUser('');
  }

  return (
    <div className='flex items-end justify-between'>
      <h1 className=' text-2xl font-medium'> Hello <br/> <spam className='text-3xl font-semibold'>firstName👋</spam></h1>
      <button onClick={logOutUser} className='bg-red-500 text-white font-medium px-5 py-2 rounded-xl'>Log Out</button>
    </div>
  )
}

export default Header
