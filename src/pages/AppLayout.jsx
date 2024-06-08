import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
import Header from './Header';

function AppLayout(){
    const navigation = useNavigation();
    const isLoading = navigation.state === 'loading';

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
        {isLoading  && <Loader/>}

        <Header/>

        <div className='overflow-scroll'>
            <main className='mx-auto max-w-3xl'>
                <Outlet/>
            </main>
        </div>

    </div>
  );
}

export default AppLayout