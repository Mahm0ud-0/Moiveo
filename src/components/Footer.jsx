import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 pt-2'>
      <div className='flex items-center justify-between gap-4 mb-3 w-2/3 md:w-1/2 mx-auto'>
        <Link to='/'>
          <img src={logo} alt="MOIVEO" className='h-6' />
        </Link>
        <div className='flex gap-3'>
          <Link to='/' className='hover:text-white'>About</Link>
          <Link to='/' className='hover:text-white'>Contact</Link>
        </div>
      </div>
      <p className='bg-black/15 p-2 text-xs'>MOIVEO All Rights Reserved | © 2024</p>
    </footer>
  )
}

export default Footer