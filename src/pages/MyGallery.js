import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';

const MyGallery = () => {

  const { imgArr } = useSelector((state) => state.gallery)

  // console.log("imgArr" , imgArr , typeof(imgArr));
  const navigate = useNavigate();

  return (
    <div className='relative flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-blue-900  text-white font-extrabold '>
      <button onClick={() => navigate('/dashboard')}
        className='absolute left-5 top-5 bg-green-500 p-3 px-5 sm:p-4 sm:px-6 rounded-xl font-bold hover:text-black hover:bg-green-800 '
      >Back</button>
      <h1 className='m-20 text-4xl text-purple-600 font-sans'>MyGallery</h1>
      <div className='flex gap-5 flex-wrap w-[80%]'>
        {Array.isArray(imgArr) && imgArr.length >0 ?
          imgArr.map((data, index) => (
            <Card key={index} data={data} index={index} />
          ))
          :
          <div className=' font-normal text-2xl text-center'>No Image in Gallery , Please upload the image !!</div>
        }
      </div>

    </div>
  )
}

export default MyGallery