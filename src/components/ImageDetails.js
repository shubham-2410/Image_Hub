import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ImageDetails = () => {
    const { imgArr } = useSelector((state) => state.gallery);
    const { id } = useParams();

    const navigate = useNavigate();
    return (
        <div className='absolute flex flex-col items-center justify-centerbg-gradient-to-b from-slate-900 to-blue-900  text-white  w-full'>

            <button onClick={() => navigate('/my-gallery')}
                className='absolute left-5 top-5 bg-green-500 p-3 px-5 sm:p-4 sm:px-6 rounded-xl font-bold hover:text-black hover:bg-green-800 '
            >Back</button>
            <div className='flex flex-wrap border-2 border-green-600 rounded-2xl mt-28 mb-8 justify-center items-center'>

                {/* Left side - Image */}
                <div className='p-6'>
                    <img
                        src={imgArr[id].image}
                        alt={imgArr[id].title}
                        className='rounded-md'
                        width={500}
                    />
                </div>

                {/* Right side - Title, Description, Count */}
                <div className='p-6 flex flex-col justify-center  gap-5'>

                    <div className='  '>
                        <p className=' font-mono text-3xl text-white '>Title: </p>
                        <h1 className='  text-4xl font-bold text-blue-500'>
                            {imgArr[id].title}
                        </h1>
                    </div>
                    <div className='  '>
                        <p className=' font-mono text-3xl text-white '>Description: </p>
                        <h1 className='  text-3xl font-bold text-blue-500'>
                            {imgArr[id].description}
                        </h1>
                    </div>

                    <p className='text-3xl bg-green-400  text-black p-3 text-center rounded-xl'>Count: <span className=' '>{imgArr[id].count}</span></p>
                </div>

            </div>
        </div>
    );
};

export default ImageDetails;
