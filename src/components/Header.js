import React, { useEffect, useState } from 'react'
// import logo from '../assets/logo.png'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
// import userIcon from '../assets/user-icon.png'
import { IoSearchOutline } from 'react-icons/io5';
import { navigation } from '../contacts/navigation';

const Header = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const removeSpace = location?.search?.slice(3)?.split('%20').join(" ");
    const [searchInput, setSearchInput] = useState(removeSpace);

    useEffect(() => {
        if (searchInput) {
            navigate(`/search?query=${searchInput}`)
        }
    }, [searchInput])

    const handleSubmit = (e) => {
        e.preventDefault();
        }
        
    // const logo = 'https://raw.githubusercontent.com/AbdullahAlFaruk/moviehub/main/src/assets/logo.png';

  return (
    <header className ='fixed top-0 w-full h-16 bg-black bg-opacity-50 z-40'>
        <div className = "container mx-auto px-3 flex items-center h-full">
            <Link to = {'/'}>
                <img 
                    src = {logo}
                    alt = "logo"
                    width = {120}
                />
            </Link>

            <nav className='hidden lg:flex items-center gap-1 ml-5'>
                {
                    navigation.map((nav, index) => {
                        return (
                            <div>
                                <NavLink 
                                    key = {nav.label+"header"+index}
                                    to = {nav.href}
                                    className = {({ isActive }) => `px-2 hover:text-neutral-100 ${isActive && 'text-neutral-100'}`}>
                                        {nav.label}
                                    </NavLink>
                            </div>
                        )
                    })
                }
            </nav>

            <div className='ml-auto flex items-center gap-5'>
                <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                    <input
                        type = "text"
                        placeholder = "Search movies, tv shows, people..."
                        className = "bg-transparent px-4 py-1 outline-none hidden lg:block"
                        onChange = {(e) => setSearchInput(e. target.value)}
                        value = {searchInput}
                    />

                    <button type='submit' className='text-white'>
                        <IoSearchOutline/>
                    </button>
                </form>

                <div className='w-8 h-8 rounded-full overflow-hidden cursor-pointer active:scale-50 transition-all duration-300'>
                    <img
                        src = {userIcon}
                        alt = "user icon"
                        width = 'w-full h-full object-cover'
                    />
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
