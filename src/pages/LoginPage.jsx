import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import LinkButton from './LinkButton'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Mail } from "lucide-react"
import { createClient } from '@supabase/supabase-js'
  import { Auth } from '@supabase/auth-ui-react'
  import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../../src/client'

const LoginPage = () => {

  const { toast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false);


  function handleChange(event) {
    console.log('event', event.target.value);
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.id]: event.target.value
      }
    })
  }

  async function handleSubmit (){
    event.preventDefault();
   
    console.log('form data email', formData.email);
    console.log('form data password', formData.password); 

   if(formData.email === '' || formData.password === ''){ 
    toast({
      description: 'Please fill all details',
      status: 'error'
    })
  }else{
    try {
      setIsLoading(true);
      const {  data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })
      if(error){
        throw error;
      }
      console.log('data', data);
      navigate('/home');
    } catch (error) {
      console.log('error', error);
      toast({
        description: error.message,
        status: 'error'
      })
    }finally{
      setIsLoading(false);
  }
}
  }
  return (
    <div> 
        <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit}>
          <div className="grid w-[350px] items-center mt-4 gap-4">
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input type='email' id="email" placeholder="john@abcd.com" onChange={handleChange}  />
            </div>
            <div className="flex flex-col items-start mt-2 mb-4 space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input type='password' id="password" placeholder="Enter your password" onChange={handleChange} />
            </div>
            {!isLoading && <Button>
              Log in
              </Button>
              }
             {isLoading && <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in
              </Button>
              } 
              <FontAwesomeIcon icon="fa-brands fa-google" />
            <p>or</p>
            <Button className='bg-secondary'>
            <FontAwesomeIcon icon={faGoogle} className="mr-4 h-4 w-4" />Sign in with Google
            </Button>
            <p>Don't have an account?</p>
              <Button asChild className='bg-secondary'>
                <Link to={'/signUp'}>Sign up</Link>
                </Button>  
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

export default LoginPage