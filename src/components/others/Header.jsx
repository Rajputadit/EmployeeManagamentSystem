const Header = ({ changeUser, name }) => {

  return (
    <div className='flex items-end justify-between'>
      <h1 className=' text-2xl font-medium'> Hello <br/> <span className='text-3xl font-semibold'>{name}👋</span></h1>
      <button onClick={changeUser} className='bg-red-500 text-white font-medium px-5 py-2 rounded-xl'>Log Out</button>
    </div>
  )
}

export default Header
