import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, Loader2 } from 'lucide-react'
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
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from 'react-router-dom'


const SignUpPage = () => {

  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
  }
  
  const handleCheck = () =>{
    setIsChecked(!isChecked);
    console.log(isChecked);
  }

  async function handleSubmit (){
    event.preventDefault();
  
   if(formData.email === '' || formData.password === '' || formData.confirmPassword === ''){ 
    toast({
      description: 'Please fill all details in the form',
      status: 'error'
    })
  }else if(formData.password !== formData.confirmPassword){
      toast({
        description: "The passwords you entered do not match. Please ensure your password and confirmation password are the same.",
        status: 'error'
      })
      }else if(!isChecked){
        toast({
          title: "Please accept the terms of service and privacy policy.",
        })
      }else{
        try {
        setIsLoading(true);
          const { data, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          });
    
          if (error) {
            setIsLoading(false);
            toast({
              title: "There was an error during sign up.",
              description: error.message,
              status: "error",
              variant: "destructive",
              duration: 5000,
              isClosable: true,
            });
          } else {
            setIsLoading(false);
            navigate('/home');
          }
          
        } catch (error) {
          toast({
            title: "Something went wrong.",
            description: error,
            status: "error",
            variant: "destructive",
            duration: 5000,
            isClosable: true,
          });
        }
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
           <Checkbox id="terms" checked={isChecked} onCheckedChange={handleCheck}/>
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the Terms of Service and Privacy Policy. 
              </label>
          </div>
          {!isLoading && <Button className='mt-8'>Create Account</Button>}
          {isLoading && <Button disabled className='rounded-xl mt-8 font-semibold'>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Your Account
        </Button>}
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