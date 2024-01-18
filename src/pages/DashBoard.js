import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { uploadImage, viewGallery } from '../services/operaions/imageAPI';
import { useNavigate } from 'react-router-dom';
import { session } from '../services/operaions/authAPI';

const DashBoard = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const [selectedImageUrl, setSelectedImageUrl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        title: '',
        description: '',
        photo: ""
      });

    }
  }, [reset, isSubmitSuccessful]);


  const onSubmitImage = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('photo', data.photo);

      dispatch(uploadImage(formData));
      setSelectedImageUrl(null);
      reset();
    } catch (error) {
      toast.error("Failed to upload img")
      console.error('Error uploading image:', error);
    }
  };

  const handelViewGallery = async () => {
    try {
      if (localStorage.getItem("imgArr") === null) {
        dispatch(viewGallery(navigate));
      } else {
        navigate('/my-gallery')
      }
    }
    catch (error) {
      console.error('Error view gallery:', error);
      toast.error("Failed to view gallery");
    }
  }

  return (
    <div className=' relative flex flex-col items-center justify-center text-white font-extrabold bg-gradient-to-b from-slate-900 to-blue-800 gap-5 overflow-hidden overflow-x-hidden '>
      <button onClick={() => handelViewGallery()}
        className='absolute right-5 top-5 bg-green-500  p-3 px-5 sm:p-4 sm:px-6  rounded-xl font-bold hover:text-black hover:bg-green-800 '
      >View Gallery</button>

      <div className='border-2 border-green-700 p-10 rounded-2xl my-28 mx-2 flex flex-wrap gap-5 justify-center items-cente'>
        <form onSubmit={handleSubmit(onSubmitImage)} className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Image Upload</h2>

          <div className="mb-2">
            <label htmlFor="title" className="text-gray-600 block">Title:</label>
            <input {...register('title', {
              required: "Please enter Title"
            })}
              id="title" className="border-2 text-black font-normal border-gray-300 p-2 rounded-md w-full" />
            {errors.title && (
              <span className='text-red-500'>{errors.title.message}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="description" className="text-gray-600 block">Description:</label>
            <textarea
              {...register('description', {
                required: "Please Enter Description for image"
              })}
              id="description"
              className="text-black font-normal border-2 border-gray-300 p-2 rounded-md w-full"
            />
            {errors.description && (
              <span className='text-red-500'>{errors.description.message}</span>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="photo" className="text-gray-600 block">Image:</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setValue('photo', e.target.files[0]);
                setSelectedImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
              id="photo"

              className="text-white font-normal border-2 border-gray-300 p-2 rounded-md"
            />

          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded-md">
            Upload Image
          </button>
        </form>
        {selectedImageUrl && (
          <div className="mb-2">
            <label className="text-gray-600 block">Selected Image:</label>
            <img
              src={selectedImageUrl}
              alt="Selected"
              width={275}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
