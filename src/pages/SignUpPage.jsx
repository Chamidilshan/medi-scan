import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import { supabase } from '../../src/client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"


const SignUpPage = async() => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  async function handleSubmit (){
    try {
      // const { data, error } = await supabase.auth.signUp({
      //   email: formData.email,
      //   password: formData.password,
      // });

      console.log('success');
      
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
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="" />
            </div>
            <div className="flex flex-col items-start  space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="password" placeholder="" />
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="framework">Confirm Password</Label>
              <Input id="password" placeholder="" />
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