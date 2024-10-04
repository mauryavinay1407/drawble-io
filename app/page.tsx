'use client'
import { Cover } from "@/components/ui/cover";
import {useRouter} from "next/navigation";

export default function Home() {
   const router=useRouter();
  return (
    <div  className="flex flex-col items-center justify-center">
    <div className="mt-52  flex flex-col items-center justify-center">
    <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
    Craft your masterpiece <br /> in <Cover>no time </Cover>
    </h1>
    <button className="relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white focus:ring-1 focus:outline-none "
    onClick={()=>router.push('/draw')}
    >
  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 text-white rounded-md group-hover:bg-opacity-0">
    Get Started
  </span>
</button>

  </div>
    </div>
  )
}
