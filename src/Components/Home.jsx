import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import { enhancedImageAPI } from '../utils/enhanceImageApi';


const Home = () => {

  const [uploadImage, setUploadImage] = useState(null);
  const [enhancedImages, setEnhancedImages] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const UploadImageHandler = async(file)=>{
    
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);
    try {
      // code which may produce error
      const enhancedURL = await enhancedImageAPI(file);
      setEnhancedImages(enhancedURL.image);
      setLoading(false);
      
    } catch (error) {
      // code to handle the error and show message   
      console.log(error)
      alert("Error while enhancing the image, Please try again later")
      
    }
  }
  return (
    <>
       <ImageUpload UploadImageHandler={UploadImageHandler} />
       <ImagePreview  loading={loading} uploaded={uploadImage} enhanced={enhancedImages}/>
    </>
  )
}

export default Home