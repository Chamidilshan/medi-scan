import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, } from "lucide-react"
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '../../client'
import { useDispatch } from 'react-redux';
import { updateUserDetails } from './Slices/UserSlice';

const LoginPage = () => {

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => { 
        if (event === 'SIGNED_IN') {
          console.log('User has signed in');
          console.log('session', session);
          console.log('uid is', session.user.id)
          console.log('uid is', session.user)
          const profileImageUrl = session.user.user_metadata.avatar_url;
          dispatch(updateUserDetails({
            userName: session.user.user_metadata.full_name,
            userId: session.user.id, 
            userProfilePhoto: session.user.user_metadata.avatar_url,
            userToken: session.access_token
          }));
         console.log('Profile Image URL:', profileImageUrl);
          navigate('/home'); 
        } else if (event === 'SIGNED_OUT') {
          console.log('User has signed out');
        }
      }
    ); 
    return () => {
      authListener.subscription.unsubscribe();
      // authListener.unsubscribe();
    };
  }, []);


  function handleChange(event) {
    console.log('event', event.target.value);
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.id]: event.target.value
      }
    })
  }

  async function handleGoogleSignIn(){

    event.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }

    });
    console.log('data', data); 
    if (data) {
      console.log('User has signed in'); 
  } else if (error) {
      console.log('An error occurred:', error.message);
  } 
   
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
            <Button className='bg-secondary'  onClick={handleGoogleSignIn}>
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
