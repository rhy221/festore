'use client'
 
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
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>
      <div className='absolute inset-0 flex justify-center p-10'>{children}</div>
      </div>
  )
}