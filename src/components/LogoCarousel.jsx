"use client"

import { useState, useEffect } from "react"
import clientsData from "@/data/clients.json"

const LogoCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const clients = clientsData.clients
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clients.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + clients.length) % clients.length)
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center justify-center h-full">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
          aria-label="Previous logo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-tertiary" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M30 36L18 24l12-12z"/></svg>
        </button>
        <div className="flex items-center justify-center">
          {[0, 1].map((offset) => {
            const index = (currentIndex + offset) % clients.length
            const client = clients[index]
            return (
              <div
                key={index}
                className={`w-1/2 px-10 transition-opacity duration-500 ${offset === 1 ? "hidden md:block" : ""}`}
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  className="object-contain w-full h-56"
                  style={{aspectRatio: client.width / client.height}}
                />
              </div>
            )
          })}
        </div>
        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-2 bg-white bg-opacity-50 rounded-full"
          aria-label="Next logo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-tertiary rotate-180" viewBox="0 0 48 48"><path fill="currentColor" stroke="currentColor" strokeLinejoin="round" strokeWidth="4" d="M30 36L18 24l12-12z"/></svg>
        </button>
      </div>
    </div>
  )
}

export default LogoCarousel
