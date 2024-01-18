import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='bg-gradient-to-b from-slate-900 to-blue-800 min-h-screen flex flex-col justify-center items-center text-white font-sans pb-10'>
      {/* Hero Section */}
      <div className='bg-cover bg-center h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4'>Your Image Hub</h1>
          <p className='text-lg md:text-xl mb-8'>
            Explore, Share, and Enjoy Beautiful Images.
          </p>
          <Link
            to='/dashboard'
            className='bg-green-500 hover:bg-green-700 text-white py-3 px-8 rounded-full transition-all duration-300 font-semibold'
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Key Features Section */}
      <div className='bg-gray-900 text-center py-12'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold mb-8'>Key Features</h2>
          <div className='flex flex-wrap justify-center'>
            {/* Feature Card 1 */}
            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h3 className='text-xl font-semibold mb-4'>Effortless Upload</h3>
                <p className='text-gray-700'>
                  Upload your images seamlessly with just a few clicks.
                </p>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h3 className='text-xl font-semibold mb-4'>Organized Gallery</h3>
                <p className='text-gray-700'>
                  Enjoy a beautifully organized gallery for your images.
                </p>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h3 className='text-xl font-semibold mb-4'>Responsive Design</h3>
                <p className='text-gray-700'>
                  Experience a responsive design that looks great on any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
