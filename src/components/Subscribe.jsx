import React, { useState } from 'react'
import subscriptionData from '../data/subscription.json'

const Subscribe = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    // Check if user already subscribed in this browser
    const subscribedEmail = localStorage.getItem('subscribed_email')
    if (subscribedEmail === email) {
      setError('You have already subscribed with this email address.')
      return
    }

    setIsSubmitting(true)
    setError('')

    // Check if Google Forms is configured
    const { googleFormActionUrl, entryName, entryEmail, fvv, pageHistory, fbzx } = subscriptionData

    if (googleFormActionUrl && entryName && entryEmail) {
      try {
        const formData = new FormData()
        formData.append(entryName, name)
        formData.append(entryEmail, email)

        // Add hidden fields required by some Google Forms
        if (fvv) formData.append('fvv', fvv)
        if (pageHistory) formData.append('pageHistory', pageHistory)
        if (fbzx) formData.append('fbzx', fbzx)

        await fetch(googleFormActionUrl, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        })

        // Since mode is no-cors, we can't really know if it failed, so we assume success
        localStorage.setItem('subscribed_email', email)
        setSubmitted(true)
      } catch (err) {
        console.error('Subscription error:', err)
        setError('Something went wrong. Please try again later.')
      } finally {
        setIsSubmitting(false)
      }
    } else {
      // Fallback for demo / unconfigured state
      console.warn('Google Forms not configured in src/data/subscription.json')

      // Simulate network delay
      setTimeout(() => {
        localStorage.setItem('subscribed_email', email)
        setSubmitted(true)
        setIsSubmitting(false)
      }, 1000)
    }
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
          {subscriptionData.successMessage || "You have successfully subscribed to the newsletter."}
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
              {subscriptionData.heading || "Subscribe to my Newsletter"}
            </h2>
            <p className="text-gray-700 dark:text-red-400 text-lg font-sans">
              {subscriptionData.description || "Get the latest blog posts, research updates, and insights delivered directly to your inbox."}
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-blue-900 dark:focus:ring-red-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
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
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white focus:ring-2 focus:ring-blue-900 dark:focus:ring-red-500 focus:border-transparent transition-all duration-300 disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-900 dark:bg-red-600 hover:bg-blue-800 dark:hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
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
