import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from '@/components/ui/button'

export default function ResultPage() {
  return (
    <div className='flex flex-col items-start space-x-0.5'>
      <Label htmlFor="message-2" className='mt-8' >Your Document</Label>
      <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8fMKCqLjqFKL_zaAVlqRzFbWlCGFQNqHN5w&s"} alt="Image" className="rounded-md object-cover" />
      <Label htmlFor="message-2" className='mt-8' >Extracted Details</Label>
      <Textarea className='mt-2' />
      <Label htmlFor="message-2" className='mt-8' >Translate To</Label>
      <ToggleGroup type="single" className='mt-5'>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Button className='bg-secondary hover:bg-secondary'>
              English
          </Button> 
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
      <Button className='bg-secondary hover:bg-secondary'>
               Sinhala
              </Button>
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
      <Button className='bg-secondary hover:bg-secondary'>
              Tamil
            </Button>
      </ToggleGroupItem>
    </ToggleGroup>

    <div className='w-full mt-8'>
    <Button className='w-full'>
              Translate
              </Button>
    </div>
    <Label htmlFor="message-2" className='mt-8' >Translated Details</Label>
      <Textarea className='mt-2' />
    </div>
  )
}
