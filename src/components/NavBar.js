import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { logout } from '../services/operaions/authAPI';
import { RxHamburgerMenu } from "react-icons/rx";

import NavMenu from './NavMenu';

const NavBar = () => {
    const { user } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = useState(false);
    const handelMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <div className='relative border-b-[1px] border-slate-700 h-20 flex items-center justify-evenly font-semibold text-cyan-50 text-xl'>
            <div >
                <Link to={'/'}>
                    <img src={logo} alt='' width={100} loading='lazy' />
                </Link>
            </div>

            <div className='gap-x-5 md:flex hidden '>
                <Link to={'/'}>
                    <div>Home</div>
                </Link>

                <Link to={'/'}>
                    <div>About Us</div>
                </Link>

                <Link to={'/'}>
                    <div>Contact Us</div>
                </Link>
            </div>

            <div className='gap-x-5 items-center md:flex hidden '>
                {(!user && token == null) ? (
                    <>
                        <Link to={'/login'}>
                            <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'>
                                Login
                            </button>
                        </Link>

                        <Link to={'/signup'}>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                                signup
                            </button>
                        </Link>
                    </>

                ) : (
                    <>
                        <Link to={'/dashboard'}>
                            <div className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' >Dashboard</div>
                        </Link>

                        <Link to={'/'}>
                            <button onClick={() => {
                                dispatch(logout(navigate));
                            }}
                                className='border px-[12px] py-[8px] rounded'>
                                Logout
                            </button>
                        </Link>
                    </>
                )}
            </div>

            <div className='md:hidden'>
                <button onClick={handelMenu} className='text-white focus:outline-none'>
                    <RxHamburgerMenu size={40}  />
                </button>
            </div>
                {openMenu && <NavMenu setOpenMenu={setOpenMenu} className='absolute'></NavMenu>}



        </div>
    );
};

export default NavBar;
