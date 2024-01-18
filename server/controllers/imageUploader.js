
const coludinary = require("cloudinary").v2;

exports.uploadImageToClodinary= async (file , folder )=>{

    const options={folder};

    // options.resource_type = "auto";

    // console.log("inside upload img" , file , folder)

    return await coludinary.uploader.upload(file.tempFilePath , options);
}

