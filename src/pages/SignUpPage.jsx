import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon } from 'lucide-react'
import { AlertCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { supabase } from '../../src/client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AuthApiError } from '@supabase/supabase-js'


const SignUpPage = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  function handleChange(event) {
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }

  async function handleSubmit (){
    event.preventDefault();
    console.log(formData.confirmPassword);
    console.log(formData.password);
   if(formData.password !== formData.confirmPassword){
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Your session has expired. Please log in again.
        </AlertDescription>
      </Alert>
    )
    }
    try {
      console.log(formData.email, formData.password, formData.confirmPassword); 
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log('data:', data);

      console.log(data);
      console.log(error); 

      if (error) {
        console.error('Error signing up:', error);
        if(error instanceof AuthApiError){
          console.log('Error status:', error.status)
          console.log('Error message:', error.message)
          console.log('Response:', error.response)
        }
       
      } else {
        console.log('Success signing up:', data);
      }
      
    } catch (error) {
      console.log(error);
    }
  } 

  return (
    <div>
        <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit}> 
          <div className="grid w-[350px] items-center gap-4">
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type='email' name="email" placeholder="" onChange={handleChange} />
            </div>
            <div className="flex flex-col items-start  space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input type='password' name="password" placeholder="" onChange={handleChange}/>
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="framework">Confirm Password</Label>
              <Input type='password' name="confirmPassword" placeholder="" onChange={handleChange} />
            </div>
            <div className="flex items-center mt-5 space-x-2">
           <Checkbox id="terms"/>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the Terms of Service and Privacy Policy. 
              </label>
          </div>
          <Button className='mt-8'>Create Account</Button>
          </div>
         </form>
      </CardContent>
        <CardFooter>
          <p></p>
        </CardFooter>    
        </Card>
    </div>
  )
}

export default SignUpPage