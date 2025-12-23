'use client'
 
import { Button } from '@workspace/ui/components/button'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
 
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()
 
  return (
    // <>
    //   <button
    //     onClick={() => {
    //       router.back()
    //     }}
    //   >
    //     Close modal
    //   </button>
    //   <div>{children}</div>
    // </>
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center ">
      <button 
        onClick={() => {
          router.back()
        }}
        className="absolute w-8 aspect-square h-auto top-8 right-8 text-white/70 hover:text-white  transition-colors z-10"
      >
        <X className=' w-8 aspect-square' />
      </button>
      <div className='absolute inset-0 flex justify-center p-10 overflow-auto'>{children}</div>
      </div>
  )
}