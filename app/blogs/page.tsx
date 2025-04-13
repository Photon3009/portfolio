"use client"

import Image from "next/image"

export default function MuseumPage() {
  return (
    <main className="min-h-screen bg-[#101010] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-12 text-center">Museum</h1>
        
        <div className="flex flex-col items-center gap-8">
          {/* Center image container with proper dimensions */}
          <div className="w-full max-w-3xl h-[400px] relative mb-8">
            <Image 
              src="/human.gif" 
              alt="museum"
              fill
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          
          {/* Space for future content */}
          <div className="w-full max-w-3xl">
            <p className="text-white/90 text-center text-lg">
              will be writing stuff here...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}