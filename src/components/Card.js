import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { incrementCount } from '../redux/slices/imageSlice';
import { updateCount } from '../services/operaions/imageAPI';
import { useNavigate } from 'react-router-dom';

const Card = ({ data, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelOnView = async (data, index) => {
    try {
      dispatch(updateCount(data._id, data.count, index, navigate));
      dispatch(incrementCount(index));

      const storedArrayString = JSON.parse(localStorage.getItem('imgArr'));
      storedArrayString[index].count++;
      localStorage.setItem('imgArr', JSON.stringify(storedArrayString));
    } catch (error) {
      console.log('error while fetching image from gallery', error);
      toast.error('Error to fetch image from gallery');
    }
  };

  const { title, image } = data;

  return (
    <div className="max-w-xs mx-auto overflow-hidden shadow-lg relative rounded-xl">
      {/* Blur effect */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-lg"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      {/* View button */}
      <button
        onClick={() => handelOnView(data, index)}
        className="absolute inset-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-80 text-white font-bold text-lg uppercase hover:bg-opacity-90 z-30"
      >
        View
      </button>

      {/* Actual image with fixed size */}
      <img
        src={image}
        alt={title}
        className="h-52 md:h-60 object-cover z-10 relative"
      />
    </div>
  );
};

export default Card;
