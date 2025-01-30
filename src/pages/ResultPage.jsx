import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from '@/components/ui/button'
import * as Accordion from "@radix-ui/react-accordion";
import { useGenereateResultMutation } from './Slices/GeminiSlice'
import { useSelector } from 'react-redux'

export default function ResultPage() {

  const resultData = useSelector((state) => state.result.results);
  const selectedImage = useSelector((state) => state.result.selectedImage);

  console.log('Result Data:', resultData); 

  // if (isLoading) {
  //   return <div>Loading result...</div>;
  // } 

  // if (error) {
  //   return <div>Error fetching result. Please try again.</div>;
  // }
 
  if (!resultData) { 
    return <div>No result found. Please upload a file first.</div>;
  }


  return (
   
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
       <div className='flex flex-col items-center space-x-0.5'>
       <h1 className="text-3xl font-bold text-gray-800 text-center pb-5">Your Document</h1>
       <img src={URL.createObjectURL(selectedImage)} alt="Image" className="rounded-md object-cover" />
     
                {/* <Label htmlFor="message-2" className='mt-8' >Translate To</Label>
                <ToggleGroup type="single" className='mt-5'>
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                    <Button className='bg-secondary hover:bg-secondary'>
                        English
                    </Button> 
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                <Button className='bg-secondary hover:bg-secondary'>
                        Sinhala
                        </Button>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Toggle underline">
                <Button className='bg-secondary hover:bg-secondary'>
                        Tamil
                      </Button>
                </ToggleGroupItem>
                </ToggleGroup> */}

                {/* <div className='w-full mt-8'>
                <Button className='w-full'>
                          Translate
                          </Button>
                </div> */} 
    </div>

      {/* Patient Information */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Patient Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Name:</span>
            <span className="text-gray-800"> {resultData.text['Patient Information'].Name} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Age:</span>
            <span className="text-gray-800"> {resultData.text['Patient Information'].Age} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Gender:</span>
            <span className="text-gray-800"> {resultData.text['Patient Information'].Gender} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Height:</span>
            <span className="text-gray-800"> {resultData.text['Patient Information'].Height} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Weight:</span>
            <span className="text-gray-800"> {resultData.text['Patient Information'].Weight} </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">BMI:</span>
            <span className="text-gray-800"> {resultData.text['Patient Information'].BMI} </span>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Symptoms</h2>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          {Array.isArray(resultData.text.Symptoms) ? (
            resultData.text.Symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))
          ) : (
            <li>{resultData.text.Symptoms}</li>
          )}
      
        </ul>
      </div>

      {/* Diagnosis */}
      <div className="p-6 bg-red-50 shadow-md rounded-lg border-l-4 border-red-600">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Diagnosis</h2>
        {Array.isArray(resultData.text.Diagnosis) ? (
        resultData.text.Diagnosis.map((diagnosis, index) => (
            <li key={index}>{diagnosis}</li>
        ))
    ) : typeof resultData.text.Diagnosis === 'object' ? (
        Object.keys(resultData.text.Diagnosis).map((key, index) => (
            <li key={index}>{`${key}: ${resultData.text.Diagnosis[key]}`}</li>
        ))
    ) : (
        <p>{resultData.text.Diagnosis}</p>
    )}
        
      </div>

      {/* Accordion Section */}
      <Accordion.Root
        type="multiple"
        className="p-6 bg-white shadow-md rounded-lg space-y-4"
      >
        {/* Treatment Plan */}
        <Accordion.Item value="treatment-plan" className="border-b">
          <Accordion.Header>
            <Accordion.Trigger className="flex justify-between items-center w-full py-2 font-semibold text-gray-700 hover:text-gray-900">
              Treatment Plan
              <span className="text-gray-500">&gt;</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="py-2 text-gray-800">
            {resultData.text['Treatment Plan']} 
          </Accordion.Content>
        </Accordion.Item>

        {/* Additional Notes */}
        <Accordion.Item value="additional-notes" className="border-b">
          <Accordion.Header>
            <Accordion.Trigger className="flex justify-between items-center w-full py-2 font-semibold text-gray-700 hover:text-gray-900">
              Additional Notes
              <span className="text-gray-500">&gt;</span>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="py-2 space-y-4 text-gray-800">
            <div>
             <p>
             {resultData.text['Additional Notes']}
             </p>
            </div>
            {/* <div>
              <h3 className="font-medium text-gray-600">Pulse:</h3>
              <p>
                The patient's pulse was as high as 129 bpm. The report shows the
                possible causes for a high pulse.
              </p>
            </div> */}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  )
}
