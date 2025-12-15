import React, { useState } from 'react'

const Subscribe = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Mock submission
    console.log('Subscribing:', { name, email })
    setSubmitted(true)
    setError('')
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="font-serif font-bold text-3xl mb-4 text-blue-900 dark:text-red-500">Thank You!</h2>
        <p className="text-gray-700 dark:text-red-400 mb-8 font-sans text-lg">
          You have successfully subscribed to the newsletter. Stay tuned for updates!
        </p>
        <a
          href="#home"
          className="inline-block px-6 py-3 bg-blue-900 dark:bg-red-600 hover:bg-blue-800 dark:hover:bg-red-700 text-white rounded transition-colors duration-300 font-sans font-semibold"
        >
          Return to Home
        </a>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="font-serif font-bold text-4xl mb-4 text-blue-900 dark:text-red-500">
              Subscribe to my Newsletter
            </h2>
            <p className="text-gray-700 dark:text-red-400 text-lg font-sans">
              Get the latest blog posts, research updates, and insights delivered directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-red-400 mb-2 font-sans">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-blue-900 dark:focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-red-400 mb-2 font-sans">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-blue-900 dark:focus:ring-red-500 focus:border-transparent transition-all duration-300"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-900 dark:bg-red-600 hover:bg-blue-800 dark:hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md"
            >
              Subscribe
            </button>
          </form>

          <div className="mt-6 text-center">
             <a href="#home" className="text-gray-500 dark:text-red-400 hover:text-blue-900 dark:hover:text-red-300 text-sm font-sans transition-colors">
               Cancel and go back
             </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Subscribe
