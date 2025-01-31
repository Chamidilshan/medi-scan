import { Button } from '@/components/ui/button'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails } from './Slices/UserSlice'
import { toast } from '@/components/ui/use-toast';

export default function HomePage() {

  const userDetails = useSelector(getUserDetails);
  
  return (
    <div>
        <h1 className="scroll-m-20 text-4xl mt-4 font-extrabold tracking-tight lg:text-5xl">
            Scan your medical documents with MediScan
        </h1>
        
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            Using state of the art AI technology, MediScan will help you scan and undertnand your medical documents.
        view the history of scanned documents, and adjust your earnings.
        </p>
        <div className='flex flex-row mt-5 items-center justify-center gap-10'>
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD1mcqIyOxbl3PXfPZc1db2MfvjT6O4iD1ZQ&s"} alt="Image" className="rounded-md object-cover" />
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_zTQUhWozXJe1WJ_XquwadzUFMf9zZqjWA&s"} alt="Image" className="rounded-md object-cover" />
        <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8fMKCqLjqFKL_zaAVlqRzFbWlCGFQNqHN5w&s"} alt="Image" className="rounded-md object-cover" />
        </div>
        {userDetails.userToken ? ( <Button asChild className='rounded-xl mt-6 font-semibold'>
                <Link to={'/scan'}>Start Scanning</Link>
        </Button> ): (<Button asChild className='rounded-xl mt-6 font-semibold'>
                <Link to={'/'} onClick={()=>  toast({
      description: 'Please login first to continue',
      status: 'error'
    })}>Start Scanning</Link>
        </Button>  ) }
        
        
        <p className='text-gray-500 text-xs mt-2'>
            Version 1.0.0
        </p>

    </div>
  )
}
