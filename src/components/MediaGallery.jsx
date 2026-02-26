import React, { useState, useEffect } from 'react'
import { getGoogleDriveUrl } from '../utils/googleDrive'

const MediaGallery = ({ mediaItems, mediaLoading, heading }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Initialize random slide when media is loaded
  useEffect(() => {
    if (mediaItems && mediaItems.length > 0) {
      setCurrentSlide(Math.floor(Math.random() * mediaItems.length))
    }
  }, [mediaItems])

  // Carousel navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  if (mediaLoading) {
    return (
      <section id="media" className="mb-24 animate-slide-up animate-delay-600 scroll-mt-20">
        <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-blue-300">
          {heading}
        </h2>
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 dark:border-blue-300"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading media from Google Drive...</p>
        </div>
      </section>
    )
  }

  if (!mediaItems || mediaItems.length === 0) {
    return (
      <section id="media" className="mb-24 animate-slide-up animate-delay-600 scroll-mt-20">
        <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-blue-300">
          {heading}
        </h2>
        <div className="text-center py-12 text-gray-500">
          <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="font-sans text-lg">No images available</p>
        </div>
      </section>
    )
  }

  return (
    <section id="media" className="mb-24 animate-slide-up animate-delay-600 scroll-mt-20">
      <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-blue-300">
        {heading}
      </h2>

      <div className="relative max-w-6xl mx-auto">
        <div className="relative bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <div className="relative aspect-video bg-gray-900">
            {mediaItems.map((item, index) => {
              const mediaUrl = getGoogleDriveUrl(item.googleDriveId, item.type)

              return (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {mediaUrl ? (
                    item.type === 'image' ? (
                      <img
                        src={mediaUrl}
                        alt={item.title}
                        className="w-full h-full object-contain bg-gray-900"
                      />
                    ) : item.type === 'video' ? (
                      <iframe
                        src={mediaUrl}
                        className="w-full h-full"
                        allow="autoplay"
                        title={item.title}
                      />
                    ) : null
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <svg className="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-lg">No media available</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {mediaItems.length > 1 && (
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Previous slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {mediaItems.length > 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Next slide"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-mono z-10">
              {currentSlide + 1} / {mediaItems.length}
            </div>
          </div>

          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-white w-8'
                      : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {mediaItems[currentSlide] && (
            <div className="bg-gradient-to-r from-blue-50 to-white dark:from-slate-800 dark:to-slate-900 p-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-serif font-bold text-xl text-blue-900 dark:text-red-500">
                {mediaItems[currentSlide].title}
              </h3>
              {mediaItems[currentSlide].description && (
                <p className="text-gray-600 dark:text-red-300 text-sm mt-1">
                  {mediaItems[currentSlide].description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default MediaGallery
