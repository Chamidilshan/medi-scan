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
import { Image } from 'lucide-react';
import { supabase } from '../../client'
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, logoutUser } from './Slices/UserSlice';

function Header() {

  const navigation = useNavigate();

  const userDetails = useSelector(getUserDetails);
  const dispatch = useDispatch();

  console.log('user details', userDetails);

  const handleLogOut = ()=>{
    console.log('Logging out');
    supabase.auth.signOut().then(() => {
      console.log('User has signed out');
      dispatch(logoutUser());
      navigation('/');
    });
  }

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-2 mb-5 uppercase sm:px-6">
      <Link cla to="/home" className="pr-5">
        MediScan
      </Link>
    <div>
    <Link to="/scan" className="pr-5">
        Upload Document
      </Link>
      <Link to="/history" className="pr-5">
        Document History
      </Link>
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

                <img src={userDetails.userProfilePhoto}
                alt="Avatar" 
                className="overflow-hidden rounded-full" 
                />
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
      
    </div>
    
    </header>
  );
}

export default Header

