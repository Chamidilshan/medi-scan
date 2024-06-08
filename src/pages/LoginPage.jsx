import React from 'react'
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
import { Link } from 'react-router-dom'
import { Mail } from "lucide-react"


const LoginPage = () => {
  return (
    <div> 
        <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
      <CardContent>
      <form>
          <div className="grid w-[350px] items-center mt-4 gap-4">
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="john@abcd.com" />
            </div>
            <div className="flex flex-col items-start mt-2 mb-4 space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="password" placeholder="Enter your password" />
            </div>
            <Button>
              Log in
              </Button>
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