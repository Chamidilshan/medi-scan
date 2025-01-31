import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { Image, Menu, X } from 'lucide-react';
import { supabase } from '../../client'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logoutUser } from './Slices/UserSlice';
import { useState } from 'react';

function Header() {

  const navigation = useNavigate();
  const [isOpen, setIsOpen] = useState(false); 
  const userDetails = useSelector(getUserDetails);
  const dispatch = useDispatch();

  console.log('user details', userDetails);

  const handleLogOut = ()=>{
    console.log('Logging out');
    supabase.auth.signOut().then(() => {
      console.log('User has signed out');
      dispatch(logoutUser());
      navigation('/');
      // const googleLogoutURL = "https://accounts.google.com/logout";
      // const newWindow = window.open(googleLogoutURL, "_blank", "width=500,height=500");
  
      // setTimeout(() => {
      //     if (newWindow) {
      //         newWindow.close();
      //     }
      //     dispatch(logoutUser()); 
      //     navigation('/');
      // }, 1500); // Give time for Google logout before redirecting
    });
  }

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-2 mb-5 uppercase sm:px-6">
      <Link cla to="/home" className="pr-5">
        MediScan
      </Link>
    <div>
    <button
        className="sm:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    <nav className={`${
          isOpen ? 'block' : 'hidden'
        } sm:flex sm:items-center sm:space-x-6 absolute sm:static top-14 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none px-4 sm:px-0 py-3 sm:py-0`}>
    {userDetails.userToken ? (<Link to="/scan" className="pr-5" onClick={()=>setIsOpen(false)}>
        Upload Document
      </Link>
   ) : (
    <Link to="/" className="pr-5" onClick={()=>setIsOpen(false)}>
    Upload Document
  </Link>
   )}
      {userDetails.userToken && (
        <Link to="/history" className="pr-5" onClick={()=>setIsOpen(false)}>
        Document History
      </Link> 
      )}
      {/* <Link to="/" className="pr-5">
        Settings
      </Link> */}
      {userDetails.userProfilePhoto != '' &&  
      <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >

               {userDetails.userProfilePhoto ? (
                 <img src={userDetails.userProfilePhoto}
                 alt="Avatar" 
                 className="overflow-hidden rounded-full" 
                 />
               ) : (
                <img 
                  src="https://cdn.pixabay.com/photo/2017/11/10/05/48/user-2935527_1280.png" 
                  alt="Default Avatar" 
                  className="w-full h-full object-cover rounded-full" 
                />
               )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        } 
    </nav>
    </div>
    
    </header>
  );
}

export default Header

