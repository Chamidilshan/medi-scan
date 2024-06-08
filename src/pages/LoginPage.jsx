import React from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const LoginPage = () => {
  return (
    <div> 
        <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
        </CardHeader>
      <CardContent>
      <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password</Label>
              <Input id="password" placeholder="" />
            </div>
            <Button>Log in</Button>
            <p>or</p>
            <Button>Sign in with Google</Button>
            <p>Don't have an account?</p>
            <Button>Sign up</Button>
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