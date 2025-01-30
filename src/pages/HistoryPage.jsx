import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Image } from 'lucide-react'
import { useSelector } from 'react-redux'
import { getUserDetails } from './Slices/UserSlice'
import { supabase } from '../../client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

export default function HistoryPage() {
  const user = useSelector(getUserDetails);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('scanned_results')
          .select('*')
          .eq('userId', user.userId);

        if (error) console.error('Error:', error);
        setData(data || []);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchData();
  }, [user.userId]);

  const BUCKET_URL = "https://cqkcsavfgvfvpdbaiwzb.supabase.co/storage/v1/object/public/scanned-images/";

  const getImageUrl = (imagePath) => `${BUCKET_URL}${imagePath}`;

  const deleteDocument = async()=>{
    if(!selectedId) return;
    const newData = data.filter((document)=> document.id !== selectedId);
    setData(newData);

    try{
      const { error } = await supabase.from('scanned_results').delete().eq('id', selectedId);
      if(error){
        console.error('Error deleting record:', error);
        setData(data);
      }
    }catch(e){
      console.error('Unexpected error:', e);
    setData(data);
    }finally{
      setIsDialogOpen(false);
      setSelectedId(null);
    }
  }

  return (
    <div className='flex flex-col items-start justify-start'>

      <CardHeader>
        <CardTitle className='text-start'>Document History</CardTitle>
        <CardDescription>
          Manage your documents and view their summary.
        </CardDescription>
      </CardHeader>

      <CardContent className="w-full">
        <div className="w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead className="hidden md:table-cell">
                  Scanned Date (Uploaded)
                </TableHead>
                <TableHead className="hidden md:table-cell">Symptoms</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="hidden sm:table-cell">
                      <img alt="Product image" src={getImageUrl(item.imageUrl)} />
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.result["Patient Information"].Name}
                    </TableCell>
                    <TableCell>{item.scannedAt}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {item.result.Symptoms}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-500 cursor-pointer"
                            onClick={() => {
                              setSelectedId(item.id);
                              setIsDialogOpen(true);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Alert Dialog for Delete Confirmation */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this record.
          </AlertDialogDescription>
          <div className="flex justify-end gap-4">
            <AlertDialogCancel asChild>
              <Button variant="outline">Cancel</Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={deleteDocument}>Yes, delete</Button>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
