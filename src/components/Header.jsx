import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5"
import { FaUser } from "react-icons/fa";
import { navigation } from '../constans/index';





function Header() {

    const location = useLocation()
    const readableLocatoin = location?.search?.slice(3)?.split('%20')?.join(' ')
    
    const [searchInp, setSearchInp] = useState(readableLocatoin)
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
    }
    

    useEffect(() => {
        if(searchInp) {
            navigate(`/search?q=${searchInp}`)
        }
    }, [])


    return (
        <header className='fixed top-0 w-full h-16 lg:px-6 bg-black opacity-75 z-40'>
            <div className='container mx-auto px-3 flex items-center h-full'>

                {/* logo */}
                <Link to='/'>
                    <img src={logo} alt="logo" width={120} />
                </Link>

                {/* nav */}
                <nav className='hidden lg:flex items-center gap-1 ml-5'>
                    {
                        navigation.map(nav => (
                            <div key={nav.label}>
                                <NavLink to={nav.href} key={nav.label} className={({ isActive }) => `px-2 hover:text-white ${isActive && 'text-white'}`}>
                                    {nav.label}
                                </NavLink>
                            </div>
                        ))
                    }
                </nav>

                <div className='ml-auto flex items-center gap-5'>
                    <form action="" className='flex items-center gap-2' onSubmit={handleSubmit}>

                        <input type="text" name="" placeholder='Search here...'
                            onChange={(e) => e.target.value ? navigate(`/search?q=${e.target.value}`) : navigate(`/`) }
                            className='hidden lg:block placeholder:text-neutral-300 bg-transparent px-4 py-1 outline-none border-none'
                        />

                        {/* search icon */}
                        <button className='active:scale-90 transition-all'>
                            <IoSearchOutline className='h-8 w-8 text-white' />
                        </button>

                    </form>


                    {/* user icon */}
                    <div className='cursor-pointer active:scale-90 transition-all'>
                        {/* <img src={userIcon} alt="user" className='w-full h-full'/> */}
                        <FaUser className='w-8 h-7 text-white' />
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Header