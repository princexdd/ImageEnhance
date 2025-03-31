import axios from "axios";

const API_KEY = "wx9c5nq6erejx0h5j";
const BASE_URL = "https://techhk.aoscdn.com";


export const enhancedImageAPI = async (file) => {
  
try {
    const taskId = await uploadImage(file);
    console.log("Image Uploaded Successfully, Task ID:", taskId )

    const enhancedImageData = await PollForEnhancedimage(taskId);
    console.log("Enhanced Image Data:", enhancedImageData)
    
    
    return enhancedImageData; 
} catch (error) {
    console.log("Error enhancing image:", error.message)
}



    
}


const uploadImage = async(file)=>{

    const formData = new FormData();
    formData.append("image_file", file);

    const {data} = await axios.post(`${BASE_URL}/api/tasks/visual/scale`, formData, {
        headers:{
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        }
    })

    if(!data?.data?.task_id){
        throw new Error("Failed to upload image! Task ID not found.");
        
    }
  
return data.data.task_id;
};

const fetchEnhancedImage = async(taskId)=>{
    const {data} = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`,{
        headers:{
            "Content-Type": "multipart/form-data",
            "X-API-KEY": API_KEY,
        }
    })
    if (!data?.data) {
        throw new Error("Failed to fetch enhanced image! image not found");
        
    }
  return data.data;
};

const PollForEnhancedimage = async(taskId, retries = 0)=>{
    const result = await fetchEnhancedImage(taskId);
    if (result.state === 4) 
        {
            console.log("Processing...")


            if(retries>=20){
                throw new Error("Max retries reached. Please try again later.");
                
            }

            //wait for 2 second
    await new Promise((resolve)=> setTimeout(resolve, 2000));

    return PollForEnhancedimage(taskId, retries+1);
        
    } 
    console.log("Enhanced Image URL:", result)
    return result;
   

    
}




// data: {task_id: 'e21f9a81-e935-48ba-b1ae-45f717f43778'}