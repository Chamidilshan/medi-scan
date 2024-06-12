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
import { supabase } from '../../src/client'

function Header() {

  const navigation = useNavigate();

  const handleLogOut = ()=>{
    console.log('Logging out');
    supabase.auth.signOut().then(() => {
      console.log('User has signed out');
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
      <Link to="/" className="pr-5">
        Settings
      </Link>
      <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Image
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
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
    </div>
    
    </header>
  );
}

export default Header

