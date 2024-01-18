import React from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { ImCross } from "react-icons/im";
import { logout } from '../services/operaions/authAPI';
// import { useDispatch } from 'react-redux';

export default function NavMenu({ setOpenMenu }) {

  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLinks = () => {
    setOpenMenu(false)
  };

  const navigate = useNavigate()

  return (
    <div className='fixed  min-h-screen top-0 w-full flex justify-center items-center transition ease-in-out duration-[3s] text-white z-50 bg-slate-900 ' >

      <div className='border-2 border-black font-mono flex flex-col gap-10 text-2xl p-10 rounded-xl w-[90%] md:w-1/2 md:h-1/2 bg-slate-800'>
        
      <div onClick={()=>handleLinks()}>
        <ImCross/>
      </div>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <Link onClick={()=>handleLinks()} to={'/'}>
          <div>Home</div>
        </Link>

        <Link onClick={()=>handleLinks()} to={'/'}>
          <div>About Us</div>
        </Link>

        <Link onClick={()=>handleLinks()} to={'/'}>
          <div>Contact Us</div>
        </Link>
      </div>

      <div className='items-center  border-t-2 border-white flex flex-col gap-5 pt-5' >
        {(!user && token == null) ? (
          <>
            <Link onClick={()=>handleLinks()} to={'/login'}>
              <button className='bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded'>
                Login
              </button>
            </Link>

            <Link onClick={()=>handleLinks()} to={'/signup'}>
              <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded'>
                signup
              </button>
            </Link>
          </>

        ) : (
          <>
            <Link onClick={()=>handleLinks()} to={'/dashboard'}>
              <div className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' >Dashboard</div>
            </Link>

            <Link onClick={()=>handleLinks()} to={'/'}>
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

      </div>

    </div>
  );
}