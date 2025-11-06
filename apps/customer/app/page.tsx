import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";



export default function Home() {
  return (
    <div className="flex flex-col relative bg-background">
      {/* Navbar */}
      <div className="sticky w-full top-0 z-50">
        <NavBar />
      </div>

      {/* HERO SECTION */}
      <div
        className="
        relative w-full aspect-[16/9] md:h-[700px]          bg-[url('/home_bg3.png')] bg-no-repeat bg-cover bg-center

          
        "
      >
        {/* LEFT MAIN TITLE */}
        <div
          className="
            absolute flex flex-col 
            left-6 top-10
            sm:left-10 sm:top-20
            md:left-16 md:top-24 
            lg:left-20 lg:top-20
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
            font-bruno-ace 
            z-10
          "
        >
          <span className="self-start">EFFORTLESS.</span>
          <span className="self-center">TIMELESS.</span>
          <span className="self-end italic">DIGITAL.</span>
        </div>

        {/* EXPLORE BUTTON */}
        <Link href="/search">
          <div
            className="
              absolute left-6 bottom-10
              sm:left-10 sm:bottom-20
              md:left-16
              lg:left-20
              z-10
            "
          >
            <Button
              className="
                text-lg sm:text-xl md:text-2xl 
                px-10 sm:px-14 md:px-20 
                py-2 font-montserrat
              "
            >
              EXPLORE
            </Button>
          </div>
        </Link>

        {/* MAIN CHARACTER IMAGE */}
        <div
          className="
            absolute right-[0%] bottom-[-80px] 
             md:w-[800px]
             min-w-[300px]
             min-h-[400px]
             w-auto
             md:h-[700px]
             overflow-hidden
            z-0
          "
        >
          <Image
            src="/home_bg1.png"
            alt="bg"
            width={800}
            height={800}
            className="
                 
            
            "
          />
        </div>
      </div>

      {/* RIGHT DESCRIPTION TEXT */}
      {/* <div
        className="
          absolute 
          w-[260px] sm:w-[300px] md:w-[350px]
          right-4 sm:right-10 md:right-20 lg:right-64 
          top-32 sm:top-40 md:top-48 
          font-montserrat  
          text-sm sm:text-base md:text-lg
          z-20
        "
      >
        <p>
          <span className="font-bold">Step into a new realm of fashion</span> 
          {" "}with our collection of digital clothes, where imagination meets technology
        </p>
      </div> */}

      {/* FOOTER */}
      <div className="w-full mt-20 ">
        <Footer />
      </div>
    </div>
  );
}
// type Modal = {
//   id: string;
//   name: string;
//   thumbUrl: string;
// }

// let modals: Modal[] = 
// [
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
//   {id: "f", name: "duckkkk", thumbUrl: "/clothes_ex1.jpg"},
// ]


// function Modal({name, thumbUrl}: Modal) {
//   return (
//       <Card className="overflow-hidden py-0 ">
//         <div className="flex flex-col">
//           <div className="relative w-full h-40">
//             <Image src={thumbUrl} alt="Thumb" fill/>
//           </div>
//           <div className="px-4 py-2">
//             <h3>{name}</h3>
//           </div>
//         </div>
//       </Card>    
//   )
// }

// function ModalListing({modals}: {modals:Modal[]})
// {
//   return (
//     <div className="grid grid-cols-4 grid-flow-row gap-4 w-full">
//       {modals.map((m, index) => (
//         <Modal key={index} {...m}/>
//       ))}
//     </div>
//   )
// }
