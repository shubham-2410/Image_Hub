import {toast} from 'react-hot-toast';
import { pushOneImgArr, setImgArr } from '../../redux/slices/imageSlice';
const {apiConnector} = require('../apiconnector');
const {imageEndPoints} = require('../apis')


const {
    UPLOADIMAGE_API,
    GETALL_API,
    UPDATECOUNT_API
} = imageEndPoints;

export function uploadImage(formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");

        try {
            const response = await apiConnector("POST", UPLOADIMAGE_API, formData);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            await dispatch(pushOneImgArr(response.data.data));

            const storedArrayString = localStorage.getItem('imgArr');
            const existingArray = storedArrayString ? JSON.parse(storedArrayString) : [];
            existingArray.push(response.data.data);
            localStorage.setItem('imgArr', JSON.stringify(existingArray)); // Convert to JSON string

            toast.success("Image Added to Gallery");
        } catch (error) {
            console.log("Error in uploading img  ", error);
            toast.error(error.response.data.message);
        } finally {
            toast.dismiss(toastId);
        }
    };
}



export function viewGallery( navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("loading");

        try {
            const response = await apiConnector("GET" , GETALL_API );
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log(response)
            await dispatch(setImgArr(response.data.data));

            localStorage.setItem("imgArr", JSON.stringify(response.data.data));

            toast.success("Images fetched into gallery");
            navigate('/my-gallery');
        } 
        catch (error) {
            console.log("Error while viewing gallery" , error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export function updateCount(imageId , count ,index , navigate){
    return async (dispatch)=>{
        const toastId = toast.loading("loading");

        try {
            const response = await apiConnector("PUT" , UPDATECOUNT_API , {imageId , count} );
            
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            console.log(response)
            toast.success("Images fetched from gallery");
            navigate(`/my-gallery/details/${index}`);
        } 
        catch (error) {
            console.log("Error while viewing gallery" , error);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}