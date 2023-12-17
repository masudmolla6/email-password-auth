import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className='flex justify-center mt-4'>
            <Link className='mr-12 text-xl text-white hover:bg-emerald-500 bg-orange-500 px-10 py-2 rounded-full' to="/">Home</Link>
            <Link className='mr-12 text-xl text-white hover:bg-emerald-500 bg-orange-500 px-10 py-2 rounded-full' to='/register'>Register</Link>
            <Link className='mr-12 text-xl text-white hover:bg-emerald-500 bg-orange-500 px-10 py-2 rounded-full' to='/login'>LogIn</Link>
        </div>
    );
};

export default Header;