import { useState, useEffect, useCallback } from "react"

export default function ImageCarousel ({ title, images }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToIndex = (index) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    let interval
    if (images.length > 1) {
      interval = setInterval(goToNext, 4000)
    }
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [goToNext, images.length])

  if (images.length === 0) {
    return null
  }

  return (
    <div className="relative w-full mt-[140.8px] sm:mt-[144px] md:mt-[158.3px] lg:mt-[178.3px] xl:mt-[188.5px]" style={{ height: "calc(100vh - 188.5px)" }}>
      {images.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={`Slide ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      {/* <!-- gradient --> */}
      <div className="absolute z-30 bottom-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-transparent">
      </div>
        {/* <!-- Texto --> */}
      <div className="absolute z-40 max-md:left-1/2 max-md:-translate-x-1/2 [@media(max-height:700px)]:bottom-16 bottom-28 md:right-28 p-4 max-md:w-full">
        <h1 className="text-5xl sm:text-6xl text-center md:text-7xl 2xl:text-8xl text-white md:text-right animate-flip-up" dangerouslySetInnerHTML={{ __html: title }}>
        </h1>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute z-30 top-1/2 left-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none p-2 rounded-full cursor-pointer"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute z-30 top-1/2 right-4 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white focus:outline-none p-2 rounded-full cursor-pointer"
            aria-label="Next image"
          >
            <svg className="w-6 h-6 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </button>
          <div className="absolute z-30 bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer w-3 h-3 ${
                  index === currentIndex ? "bg-white" : " bg-white opacity-50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}