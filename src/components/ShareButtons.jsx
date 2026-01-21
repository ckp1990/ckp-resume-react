import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaLink, FaCheck } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const ShareButtons = ({ title, slug }) => {
  const [copiedButton, setCopiedButton] = useState(null)

  // Construct the full URL for the blog post
  // Use window.location.origin and append the hash fragment
  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/#blog/${slug}`
    }
    return ''
  }

  const handleCopyLink = async (e, buttonId) => {
    e.preventDefault()
    e.stopPropagation() // Prevent triggering parent click events (like opening the blog post)
    const url = getShareUrl()

    try {
      await navigator.clipboard.writeText(url)
      setCopiedButton(buttonId)
      setTimeout(() => setCopiedButton(null), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const handleShare = (platform, e) => {
    e.stopPropagation() // Prevent triggering parent click events
    const url = encodeURIComponent(getShareUrl())
    const text = encodeURIComponent(title)

    let shareLink = ''

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        break
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
        break
      default:
        return
    }

    window.open(shareLink, '_blank', 'width=600,height=400')
  }

  const iconClass = "w-5 h-5 transition-transform group-hover:scale-110"
  const buttonClass = "w-[48px] h-[48px] rounded-full transition-all duration-300 hover:shadow-md flex items-center justify-center border border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:outline-none"

  return (
    <div className="flex items-center gap-2 mt-4 flex-wrap" onClick={(e) => e.stopPropagation()}>
      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 mr-2">Share:</span>

      {/* Instagram (Copy Link behavior as fallback) */}
      <button
        onClick={(e) => handleCopyLink(e, 'instagram')}
        className={`${buttonClass} text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/20 group relative`}
        title="Copy link for Instagram"
        aria-label="Share on Instagram"
      >
        <FaInstagram className={iconClass} />
        {copiedButton === 'instagram' && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      {/* Facebook */}
      <button
        onClick={(e) => handleShare('facebook', e)}
        className={`${buttonClass} text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 group`}
        title="Share on Facebook"
        aria-label="Share on Facebook"
      >
        <FaFacebook className={iconClass} />
      </button>

      {/* Twitter/X */}
      <button
        onClick={(e) => handleShare('twitter', e)}
        className={`${buttonClass} text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group`}
        title="Share on X (Twitter)"
        aria-label="Share on X"
      >
        <FaXTwitter className={iconClass} />
      </button>

      {/* General Copy Link */}
      <button
        onClick={(e) => handleCopyLink(e, 'general')}
        className={`${buttonClass} text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 group relative`}
        title="Copy Link"
        aria-label="Copy Link"
      >
        {copiedButton === 'general' ? <FaCheck className="w-4 h-4 text-green-500" /> : <FaLink className={iconClass} />}
        {copiedButton === 'general' && (
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>
    </div>
  )
}

export default ShareButtons
