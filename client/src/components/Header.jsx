import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bars, Logout } from '../icons/index';
import { useAuth, useGlobal } from '../contexts/index';
import { useClickOutside } from '../hooks/index';
import Avatar from './Avatar';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useClickOutside('profile', profileRef, setIsProfileOpen);

  const { user } = useAuth();
  const { setIsSidebarOpen, handleLogoutAndClear } = useGlobal();

  return (
    <header className='w-full flex items-start justify-between'>

      <div className='flex items-start gap-x-4'>

        <button type='button' onClick={() => setIsSidebarOpen(true)} className='w-fit text-white p-2 -my-1 -mx-2 rounded-full cursor-pointer select-none sm:hidden hover:bg-light-gray'><Bars /></button>

        <div className='flex flex-col gap-y-2'>

          <h1 className='text-white text-lg'>Gemini</h1>

          <span className='bg-light-gray text-white text-xs px-2 py-1 rounded-full'>2.0 Flash</span>

        </div>

      </div>

      { user ? (

        <div className='relative'>

          <Avatar username={user.username} handleClick={() => setIsProfileOpen((prev) => !prev)} />

          <div ref={profileRef} className={`bg-dark-gray w-[150px] p-4 rounded-md ${isProfileOpen ? 'flex' : 'hidden'} flex-col gap-y-3 absolute top-9 right-0`}>

            <span className='text-gray-200 text-sm'>@{user.username}</span>

            <button type='button' onClick={handleLogoutAndClear} className='bg-light-gray text-white text-sm w-fit py-1 px-2 ml-auto rounded-full flex items-center gap-x-2 cursor-pointer select-none hover:opacity-80'><Logout /> Logout</button>

          </div>

        </div>

      ) : (

        <Link to='/login' className='btn-main mx-0'>Login</Link>

      )}

    </header>
  );
};

export default Header;