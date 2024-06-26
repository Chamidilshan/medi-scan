import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';
import { Toaster } from "@/components/ui/toaster"

function AppLayout(){
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
        {isLoading  && <Loader/>}

        <Header/>
            <main className='mx-auto max-w-3xl'>
                <Outlet/>
            </main>
            <Toaster />

    </div>
  );
}

export default AppLayout