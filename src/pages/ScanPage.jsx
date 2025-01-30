import React, { useState } from 'react'
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileInput, Label } from "flowbite-react";
import { useNavigate } from 'react-router-dom';
import { useGenereateResultMutation } from './Slices/GeminiSlice';
import { storeResults, storeSelectedImage } from './Slices/ResultsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from './Slices/UserSlice';

export default function ScanPage() {
    const[isLoading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ generateResult , { isSuccess, isError, error }] = useGenereateResultMutation();
    const user = useSelector(getUserDetails);

    console.log('user details', user);

    const handleOnScan = async() => {
      if(!selectedImage)
        return;
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userId', user.userId )
      try {
        const response = await generateResult(formData).unwrap();
        console.log('Upload Response:', response);  
        dispatch(storeResults(response));
        dispatch(storeSelectedImage(selectedFile));
        navigate('/result'); 
        setIsLoading(false);
      } catch (err) {
        console.error('Error:', err); 
      }
      setIsLoading(false);
    }

    function handleImageSelect(e) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
    
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    
      if (file) {
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
      }
    } 

  return (
    <div>
        <h2 className="scroll-m-20 mt-6 text-3xl font-semibold tracking-tight transition-colors">
            Scan and explain your medical documents 
        </h2> 
        <p className="leading-7 [&:not(:first-child)]:mt-2">
            Drag and drop your medical documents here , or click to select files from your device.
        </p>
        <div>

        <div className="flex w-full mt-8 tems-center justify-center">
      
      {!selectedImage && (
        <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
      </Label>
      )}

      {selectedImage && (
        <img src={selectedImage} alt="Selected" className="mt-4" />
      )}
    </div>
     
    <FileInput id="dropzone-file" className="unhidden mt-2 ml-20 mr-20"  onChange={handleImageSelect} />
    {!isLoading && <Button onClick={handleOnScan} className='rounded-xl mt-6 font-semibold'>
      Start Scanning
    </Button>}

    {isLoading && <Button disabled className='rounded-xl mt-6 font-semibold'>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>}
    </div>
    </div>
  )
}
