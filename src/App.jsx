import React, { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope, FaTrophy, FaAward, FaMedal, FaStar, FaCertificate, FaGraduationCap, FaExternalLinkAlt, FaLeaf, FaMoon, FaSun } from 'react-icons/fa'
import { SiOrcid, SiResearchgate, SiGooglescholar, SiKaggle } from 'react-icons/si'
import { HiLocationMarker } from 'react-icons/hi'
import ReactMarkdown from 'react-markdown'
import personalData from './data/personal.json'
import aboutData from './data/about.json'
import experienceData from './data/experience.json'
import educationData from './data/education.json'
import skillsData from './data/skills.json'
import honorsData from './data/honors.json'
import blogData from './data/blog.json'
import mediaData from './data/media.json'
import affiliationsData from './data/affiliations.json'
import teachingData from './data/teaching.json'
import { fetchGoogleDriveMedia, getGoogleDriveUrl } from './utils/googleDrive'
import Subscribe from './components/Subscribe'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [currentView, setCurrentView] = useState('home')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [mediaItems, setMediaItems] = useState(mediaData.items)
  const [mediaLoading, setMediaLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  // Handle URL hash changes for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#subscribe') {
        setCurrentView('subscribe')
        window.scrollTo(0, 0)
      } else if (hash.startsWith('#blog/')) {
        // Handle blog deep linking
        const slug = hash.replace('#blog/', '')
        const post = blogData.posts.find(p => p.slug === slug)

        if (post) {
          setCurrentView('home')
          setSelectedPost(post)
          // Wait for render and scroll to blog section
          setTimeout(() => {
            const blogSection = document.getElementById('blog')
            if (blogSection) {
              blogSection.scrollIntoView({ behavior: 'smooth' })
            }
          }, 100)
        }
      } else {
        // If we are coming from subscribe page to home, ensure we switch view
        if (currentView === 'subscribe') {
          setCurrentView('home')
          // Wait for render to complete before scrolling
          setTimeout(() => {
            // Handle standard anchors
            const element = document.getElementById(hash.replace('#', ''))
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            } else {
              window.scrollTo(0, 0)
            }
          }, 100)
        } else if (hash && hash !== '#subscribe') {
          // Normal hash navigation within home view
          setCurrentView('home')
        } else if (!hash) {
          setCurrentView('home')
        }
      }
    }

    // Initial check
    handleHashChange()

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [currentView])

  // Initialize dark mode from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    } else {
      setDarkMode(false)
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setDarkMode(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setDarkMode(true)
    }
  }

  // Icon mapping for awards
  const iconMap = {
    'FaTrophy': FaTrophy,
    'FaAward': FaAward,
    'FaMedal': FaMedal,
    'FaStar': FaStar,
    'FaCertificate': FaCertificate
  }

  // Helper function to get icon component by name
  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName] || FaTrophy
    return IconComponent
  }

  // Fetch media from Google Drive on component mount
  useEffect(() => {
    const loadMedia = async () => {
      setMediaLoading(true)
      const driveMedia = await fetchGoogleDriveMedia()

      if (driveMedia && driveMedia.length > 0) {
        // Successfully fetched from Google Drive API
        setMediaItems(driveMedia)
        // Set random initial slide
        setCurrentSlide(Math.floor(Math.random() * driveMedia.length))
        console.log('Media loaded from Google Drive API')
      } else {
        // Fallback to media.json
        setMediaItems(mediaData.items)
        // Set random initial slide
        if (mediaData.items.length > 0) {
          setCurrentSlide(Math.floor(Math.random() * mediaData.items.length))
        }
        console.log('Using fallback media from media.json')
      }

      setMediaLoading(false)
    }

    loadMedia()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (mediaItems.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mediaItems.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [mediaItems.length])

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

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextMedia = () => {
    setLightboxIndex((prev) => (prev + 1) % mediaItems.length)
  }

  const prevMedia = () => {
    setLightboxIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
  }

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return

      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowRight') {
        nextMedia()
      } else if (e.key === 'ArrowLeft') {
        prevMedia()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  // Helper function to parse HTML tags in text
  const parseText = (text) => {
    if (!text) return null

    // Replace <strong> tags
    let parts = text.split(/(<strong>.*?<\/strong>)/g)
    parts = parts.flatMap(part => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        const content = part.replace(/<\/?strong>/g, '')
        return <span key={Math.random()} className="font-semibold dark:text-red-500">{content}</span>
      }
      // Replace <em> tags
      if (part.includes('<em>') || part.includes('</em>')) {
        return part.split(/(<em>.*?<\/em>)/g).map((emPart, i) => {
          if (emPart.startsWith('<em>') && emPart.endsWith('</em>')) {
            const content = emPart.replace(/<\/?em>/g, '')
            return <span key={i} className="text-gray-700 italic dark:text-red-400">{content}</span>
          }
          return emPart
        })
      }
      // Replace <code> tags
      if (part.includes('<code>') || part.includes('</code>')) {
        return part.split(/(<code>.*?<\/code>)/g).map((codePart, i) => {
          if (codePart.startsWith('<code>') && codePart.endsWith('</code>')) {
            const content = codePart.replace(/<\/?code>/g, '')
            return <span key={i} className="font-mono font-semibold dark:text-red-500">{content}</span>
          }
          return codePart
        })
      }
      return part
    })

    return parts
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-black transition-colors duration-300">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-300 dark:border-gray-800 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif font-bold text-xl text-blue-900 dark:text-red-500">
              <a href="#home" className="hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                {personalData.name}
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8 font-sans text-sm">
              <a href="#about" className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">About</a>
              <a href="#education" className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Education</a>
              <a href="#skills" className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Skills</a>
              <a href="#publications" className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Publications</a>
              <a href="#blog" className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors">Blog</a>
              <a href="#subscribe" className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors font-semibold">Subscribe</a>

              {/* Dark Mode Toggle (Desktop) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center gap-4 md:hidden">
              {/* Dark Mode Toggle (Mobile) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-fade-in">
              <div className="flex flex-col space-y-3 font-sans text-sm">
                <a
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-800"
                >
                  About
                </a>
                <a
                  href="#education"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-800"
                >
                  Education
                </a>
                <a
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-800"
                >
                  Skills
                </a>
                <a
                  href="#publications"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-800"
                >
                  Publications
                </a>
                <a
                  href="#blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors py-2 border-b border-gray-200 dark:border-gray-800"
                >
                  Blog
                </a>
                <a
                  href="#subscribe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 dark:text-red-500 hover:text-blue-900 dark:hover:text-blue-400 transition-colors py-2 font-semibold"
                >
                  Subscribe
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {currentView === 'subscribe' ? (
          <Subscribe />
        ) : (
          <>
        {/* Hero Section */}
        <header id="home" className="mb-24 animate-fade-in">
          {/* Profile Image Placeholder */}
          {personalData.profileImage ? (
            <div className="flex justify-center mb-8">
              <img
                alt={personalData.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-900 dark:border-blue-500 shadow-lg"
                src={personalData.profileImage}
              />
            </div>
          ) : (
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-slate-800 dark:to-slate-700 border-4 border-blue-900 dark:border-blue-500 shadow-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-blue-900 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          <div className="mb-6 text-center">
            <h1 className="font-serif font-black text-7xl md:text-8xl lg:text-9xl mb-4 text-black dark:text-red-500 leading-none">
              {personalData.name}
            </h1>
            <div className="font-sans text-2xl md:text-3xl text-gray-700 dark:text-red-400 font-light tracking-wide">
              {personalData.title} <span className="text-gray-400 dark:text-red-300">{personalData.separator}</span> {personalData.subtitle}
            </div>
          </div>

          {/* Contact and Social Links */}
          <div className="flex flex-col items-center gap-6 mt-8">
            {/* Email and Location */}
            <div className="flex flex-wrap justify-center gap-4 font-mono text-sm">
              <a href={`mailto:${personalData.email}`}
                 className="px-4 py-2 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-blue-900 dark:hover:border-blue-500 rounded transition-all duration-300 text-black dark:text-red-500 flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                {personalData.email}
              </a>
              <div className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded text-black dark:text-red-500 flex items-center gap-2">
                <HiLocationMarker className="w-4 h-4" />
                {personalData.location}
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4">
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-slate-900 hover:bg-blue-900 dark:hover:bg-blue-700 border border-gray-300 dark:border-gray-700 hover:border-blue-900 dark:hover:border-blue-700 rounded-full transition-all duration-300 text-gray-700 dark:text-red-500 hover:text-white dark:hover:text-white group"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-slate-900 hover:bg-gray-900 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-gray-700 rounded-full transition-all duration-300 text-gray-700 dark:text-red-500 hover:text-white dark:hover:text-white group"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href={personalData.orcid}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-slate-900 hover:bg-green-600 dark:hover:bg-green-500 border border-gray-300 dark:border-gray-700 hover:border-green-600 dark:hover:border-green-500 rounded-full transition-all duration-300 text-gray-700 dark:text-red-500 hover:text-white dark:hover:text-white group"
                aria-label="ORCID"
              >
                <SiOrcid className="w-6 h-6" />
              </a>
              <a
                href={personalData.researchgate}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-slate-900 hover:bg-cyan-600 dark:hover:bg-cyan-500 border border-gray-300 dark:border-gray-700 hover:border-cyan-600 dark:hover:border-cyan-500 rounded-full transition-all duration-300 text-gray-700 dark:text-red-500 hover:text-white dark:hover:text-white group"
                aria-label="ResearchGate"
              >
                <SiResearchgate className="w-6 h-6" />
              </a>
              <a
                href={personalData.inaturalist}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-slate-900 hover:bg-green-700 dark:hover:bg-green-600 border border-gray-300 dark:border-gray-700 hover:border-green-700 dark:hover:border-green-600 rounded-full transition-all duration-300 text-gray-700 dark:text-red-500 hover:text-white dark:hover:text-white group"
                aria-label="iNaturalist"
              >
                <FaLeaf className="w-6 h-6" />
              </a>
              <a
                href={personalData.kaggle}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-slate-900 hover:bg-blue-500 dark:hover:bg-blue-400 border border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 rounded-full transition-all duration-300 text-gray-700 dark:text-red-500 hover:text-white dark:hover:text-white group"
                aria-label="Kaggle"
              >
                <SiKaggle className="w-6 h-6" />
              </a>
            </div>
          </div>
        </header>

        {/* Summary Section */}
        <section id="about" className="mb-24 animate-slide-up animate-delay-100 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-8 text-blue-900 dark:text-red-500">
            {aboutData.heading}
          </h2>
          <div className="font-sans text-lg md:text-xl leading-relaxed text-black dark:text-red-500 space-y-4 max-w-4xl">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{parseText(paragraph)}</p>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-24 animate-slide-up animate-delay-300 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {educationData.heading}
          </h2>

          <div className="space-y-8">
            {educationData.degrees.map((degree) => (
              <div key={degree.id} className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-colors duration-300">
                <h3 className="font-serif font-bold text-2xl text-black dark:text-red-500 mb-2">
                  {degree.degree}
                </h3>
                <div className="text-blue-900 dark:text-blue-400 font-sans text-lg mb-2">
                  {degree.institution}
                </div>
                <div className="text-gray-700 dark:text-red-400">{degree.field}</div>
                <div className="font-mono text-sm text-gray-600 dark:text-red-300 mt-2">{degree.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 animate-slide-up animate-delay-350 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {experienceData.heading}
          </h2>

          <div className="space-y-8">
            {experienceData.jobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-2xl text-black dark:text-red-500 mb-2">
                      {job.position}
                    </h3>
                    <div className="text-blue-900 dark:text-blue-400 font-sans text-lg mb-1">
                      {job.organization}
                    </div>
                    {job.location && (
                      <div className="text-gray-600 dark:text-red-300 text-sm mb-2">
                        {job.location}
                      </div>
                    )}
                  </div>
                  <div className="font-mono text-sm text-gray-600 dark:text-red-300 md:ml-4 flex-shrink-0">
                    {job.startDate} - {job.endDate}
                  </div>
                </div>

                {job.description && (
                  <p className="text-gray-700 dark:text-red-400 mb-3">
                    {parseText(job.description)}
                  </p>
                )}

                {job.responsibilities && job.responsibilities.length > 0 && (
                  <ul className="space-y-2 text-gray-700 dark:text-red-400">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-900 dark:text-blue-400 mr-2 flex-shrink-0">▸</span>
                        <span>{parseText(resp)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Certifications */}
        <section id="skills" className="mb-24 animate-slide-up animate-delay-360 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {skillsData.heading}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-blue-900 dark:text-red-500 mb-4">
                {skillsData.skills.heading}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsData.skills.items.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-full text-black dark:text-red-500 font-mono text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-blue-900 dark:text-red-500 mb-4">
                {skillsData.certifications.heading}
              </h3>
              <ul className="space-y-2 text-black dark:text-red-400">
                {skillsData.certifications.items.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-900 dark:text-blue-400 mr-2">▸</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="mb-24 animate-slide-up animate-delay-370 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {honorsData.publications.heading}
          </h2>

          {/* Scientific Articles */}
          {honorsData.publications.scientificArticles.items.length > 0 && (
            <div className="mb-12">
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-6 text-blue-900 dark:text-red-500">
                {honorsData.publications.scientificArticles.heading}
              </h3>
              <ol className="space-y-8 max-w-4xl list-decimal list-outside ml-6">
                {honorsData.publications.scientificArticles.items
                  .sort((a, b) => (b.year || 0) - (a.year || 0))
                  .slice(0, 5)
                  .map((pub, index) => {
                    const title = pub.title
                    const authors = pub.authors
                    const year = pub.year
                    const journal = pub.journal
                    const url = pub.url || pub.link

                    return (
                      <li key={index} className="pl-4 marker:text-blue-900 dark:marker:text-blue-400 marker:font-bold">
                        <div className="space-y-1">
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-900 dark:text-blue-400 hover:underline font-serif text-xl font-semibold block"
                            >
                              {title}
                            </a>
                          ) : (
                            <div className="text-black dark:text-red-500 font-serif text-xl font-semibold">
                              {title}
                            </div>
                          )}

                          {authors && (
                            <div className="text-gray-700 dark:text-red-400 text-base italic">
                              {authors}
                            </div>
                          )}

                          <div className="text-gray-600 dark:text-red-300 text-base">
                            {year && <span className="font-semibold">{year}</span>}
                            {year && journal && <span className="mx-2">•</span>}
                            {journal && <span className="italic">{journal}</span>}
                          </div>
                        </div>
                      </li>
                    )
                  })}
              </ol>
            </div>
          )}

          {/* Book Chapters */}
          {honorsData.publications.bookChapters.items.length > 0 && (
            <div className="mb-12">
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-6 text-blue-900 dark:text-red-500">
                {honorsData.publications.bookChapters.heading}
              </h3>
              <ol className="space-y-8 max-w-4xl list-decimal list-outside ml-6">
                {honorsData.publications.bookChapters.items
                  .sort((a, b) => (b.year || 0) - (a.year || 0))
                  .slice(0, 5)
                  .map((pub, index) => {
                    const title = pub.title
                    const authors = pub.authors
                    const year = pub.year
                    const journal = pub.journal
                    const url = pub.url || pub.link

                    return (
                      <li key={index} className="pl-4 marker:text-blue-900 dark:marker:text-blue-400 marker:font-bold">
                        <div className="space-y-1">
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-900 dark:text-blue-400 hover:underline font-serif text-xl font-semibold block"
                            >
                              {title}
                            </a>
                          ) : (
                            <div className="text-black dark:text-red-500 font-serif text-xl font-semibold">
                              {title}
                            </div>
                          )}

                          {authors && (
                            <div className="text-gray-700 dark:text-red-400 text-base italic">
                              {authors}
                            </div>
                          )}

                          <div className="text-gray-600 dark:text-red-300 text-base">
                            {year && <span className="font-semibold">{year}</span>}
                            {year && journal && <span className="mx-2">•</span>}
                            {journal && <span className="italic">{journal}</span>}
                          </div>
                        </div>
                      </li>
                    )
                  })}
              </ol>
            </div>
          )}

          {/* Other Literature */}
          {honorsData.publications.otherLiterature.items.length > 0 && (
            <div className="mb-12">
              <h3 className="font-serif font-bold text-2xl md:text-3xl mb-6 text-blue-900 dark:text-red-500">
                {honorsData.publications.otherLiterature.heading}
              </h3>
              <ol className="space-y-8 max-w-4xl list-decimal list-outside ml-6">
                {honorsData.publications.otherLiterature.items
                  .sort((a, b) => (b.year || 0) - (a.year || 0))
                  .slice(0, 5)
                  .map((pub, index) => {
                    const title = pub.title
                    const authors = pub.authors
                    const year = pub.year
                    const journal = pub.journal
                    const url = pub.url || pub.link

                    return (
                      <li key={index} className="pl-4 marker:text-blue-900 dark:marker:text-blue-400 marker:font-bold">
                        <div className="space-y-1">
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-900 dark:text-blue-400 hover:underline font-serif text-xl font-semibold block"
                            >
                              {title}
                            </a>
                          ) : (
                            <div className="text-black dark:text-red-500 font-serif text-xl font-semibold">
                              {title}
                            </div>
                          )}

                          {authors && (
                            <div className="text-gray-700 dark:text-red-400 text-base italic">
                              {authors}
                            </div>
                          )}

                          <div className="text-gray-600 dark:text-red-300 text-base">
                            {year && <span className="font-semibold">{year}</span>}
                            {year && journal && <span className="mx-2">•</span>}
                            {journal && <span className="italic">{journal}</span>}
                          </div>
                        </div>
                      </li>
                    )
                  })}
              </ol>
            </div>
          )}

          {/* Google Scholar Link */}
          <div className="mt-8 max-w-4xl">
            <a
              href="https://scholar.google.com/citations?user=CCHMzREAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-gray-800 border-2 border-blue-900 dark:border-blue-500 hover:border-blue-700 dark:hover:border-blue-400 rounded-lg transition-all duration-300 text-blue-900 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-sans font-semibold shadow-md hover:shadow-lg"
            >
              <SiGooglescholar className="text-2xl" />
              <span>View All Publications on Google Scholar</span>
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </section>

        {/* Teaching and Workshop Section */}
        <section id="teaching" className="mb-24 animate-slide-up animate-delay-380 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {teachingData.heading}
          </h2>

          <div className="space-y-6">
            {teachingData.workshops.map((workshop) => (
              <div key={workshop.id} className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-colors duration-300">
                <h3 className="font-serif font-bold text-xl md:text-2xl text-black dark:text-red-500 mb-3">
                  {workshop.title}
                </h3>

                <div className="space-y-2 text-gray-700 dark:text-red-300">
                  <div className="flex items-start">
                    <span className="text-blue-900 dark:text-blue-400 mr-2 flex-shrink-0">▸</span>
                    <span className="font-sans">
                      <strong>Event:</strong> {workshop.event}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="text-blue-900 dark:text-blue-400 mr-2 flex-shrink-0">▸</span>
                    <span className="font-sans">
                      <strong>Date:</strong> {workshop.date}
                    </span>
                  </div>

                  <div className="flex items-start">
                    <span className="text-blue-900 dark:text-blue-400 mr-2 flex-shrink-0">▸</span>
                    <span className="font-sans">
                      <strong>Venue:</strong> {workshop.venue}
                    </span>
                  </div>

                  {workshop.description && (
                    <div className="flex items-start mt-3">
                      <span className="text-blue-900 dark:text-blue-400 mr-2 flex-shrink-0">▸</span>
                      <p className="text-gray-600 dark:text-red-300">{workshop.description}</p>
                    </div>
                  )}

                  {workshop.url && workshop.url.trim() !== '' && (
                    <div className="mt-3">
                      <a
                        href={workshop.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-900 dark:text-blue-400 hover:underline font-sans text-sm"
                      >
                        <span>View Details</span>
                        <FaExternalLinkAlt className="text-xs" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Affiliations Section */}
        <section id="affiliations" className="mb-24 animate-slide-up animate-delay-375 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {affiliationsData.heading}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {affiliationsData.institutions.map((institution) => {
              const LogoCard = (
                <div className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg flex items-center justify-center aspect-square">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={institution.logo}
                      alt={institution.name}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 dark:group-hover:grayscale-0 dark:grayscale transition-all duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to text if image fails to load
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div class="text-center text-gray-400 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors text-sm font-serif">${institution.name}</div>`
                      }}
                    />
                  </div>
                </div>
              )

              const InstitutionName = (
                <p className="text-center text-sm text-gray-600 dark:text-red-300 mt-3 font-sans group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                  {institution.name}
                </p>
              )

              // If URL exists, wrap in anchor tag
              if (institution.url && institution.url.trim() !== '') {
                return (
                  <a
                    key={institution.id}
                    href={institution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    aria-label={institution.name}
                  >
                    {LogoCard}
                    {InstitutionName}
                  </a>
                )
              }

              // Otherwise, just render without link
              return (
                <div key={institution.id} className="group">
                  {LogoCard}
                  {InstitutionName}
                </div>
              )
            })}
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="mb-24 animate-slide-up animate-delay-550 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {honorsData.awards.heading}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {honorsData.awards.items.map((award, index) => {
              // Support both string format and object format
              const isString = typeof award === 'string'
              const text = isString ? award : award.text
              const iconName = isString ? honorsData.awards.icon : (award.icon || honorsData.awards.icon)
              const url = isString ? null : award.url
              const IconComponent = getIcon(iconName)

              return (
                <div key={index} className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-colors duration-300">
                  <div className="flex items-start gap-3">
                    <IconComponent className="text-blue-900 dark:text-blue-400 text-2xl flex-shrink-0" />
                    {url ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-900 dark:text-blue-400 hover:underline text-lg flex items-center gap-2 flex-1"
                      >
                        <span>{text}</span>
                        <FaExternalLinkAlt className="text-sm flex-shrink-0" />
                      </a>
                    ) : (
                      <span className="text-black dark:text-red-500 text-lg">{text}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Media Gallery Section - Commented Out */}
        {/* <section id="media" className="mb-24 animate-slide-up animate-delay-600 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-blue-300">
            {mediaData.heading}
          </h2>

          {mediaLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 dark:border-blue-300"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading media from Google Drive...</p>
            </div>
          )}

          {!mediaLoading && mediaItems.length > 0 && (
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
          )}

          {!mediaLoading && mediaItems.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-sans text-lg">No media items yet. Add some from the CMS or check your Google Drive API configuration!</p>
            </div>
          )}
        </section> */}

        {/* Blog Section */}
        <section id="blog" className="mb-16 animate-slide-up animate-delay-600 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900 dark:text-red-500">
            {blogData.heading}
          </h2>

          {selectedPost ? (
            /* Blog Post Detail View */
            <div className="max-w-4xl">
              <button
                onClick={() => setSelectedPost(null)}
                className="mb-6 px-4 py-2 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-blue-900 dark:hover:border-blue-500 rounded transition-all duration-300 text-black dark:text-white flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </button>

              <article className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-8">
                <div className="mb-6">
                  <h3 className="font-serif font-bold text-3xl md:text-4xl text-black dark:text-white mb-3">
                    {selectedPost.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-red-300">
                    <time className="font-mono">{new Date(selectedPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-full">{selectedPost.category}</span>
                  </div>
                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedPost.tags.map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-red-300 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <ReactMarkdown
                    components={{
                      h1: ({node, ...props}) => <h1 className="font-serif font-bold text-3xl text-blue-900 dark:text-red-500 mb-4 mt-8" {...props} />,
                      h2: ({node, ...props}) => <h2 className="font-serif font-bold text-2xl text-blue-900 dark:text-red-500 mb-3 mt-6" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-serif font-bold text-xl text-blue-900 dark:text-red-500 mb-2 mt-4" {...props} />,
                      p: ({node, ...props}) => <p className="text-black dark:text-red-400 leading-relaxed mb-4" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-2 mb-4 text-black dark:text-red-400" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-2 mb-4 text-black dark:text-red-400" {...props} />,
                      li: ({node, ...props}) => <li className="ml-4" {...props} />,
                      code: ({node, inline, ...props}) =>
                        inline ?
                          <code className="bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded font-mono text-sm" {...props} /> :
                          <code className="block bg-gray-100 dark:bg-slate-800 p-4 rounded font-mono text-sm overflow-x-auto mb-4" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-900 dark:border-blue-500 pl-4 italic text-gray-700 dark:text-red-300 my-4" {...props} />,
                      a: ({node, ...props}) => <a className="text-blue-900 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-black dark:text-white" {...props} />,
                      em: ({node, ...props}) => <em className="italic" {...props} />
                    }}
                  >
                    {selectedPost.content}
                  </ReactMarkdown>
                </div>
              </article>
            </div>
          ) : (
            /* Blog Posts List View */
            <div className="space-y-6">
              {blogData.posts
                .filter(post => post.published)
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((post) => (
                  <article
                    key={post.id}
                    className="bg-white dark:bg-slate-900 border border-gray-300 dark:border-gray-700 rounded-lg p-6 hover:border-blue-900 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <h3 className="font-serif font-bold text-2xl md:text-3xl text-black dark:text-white hover:text-blue-900 dark:hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>
                      <time className="font-mono text-sm text-gray-600 dark:text-red-300 md:ml-4 flex-shrink-0">
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </time>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded-full text-sm">
                        {post.category}
                      </span>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="text-xs text-gray-500 dark:text-red-300">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 dark:text-red-400 leading-relaxed mb-3">
                      {post.excerpt}
                    </p>

                    <div className="text-blue-900 dark:text-blue-400 font-sans text-sm hover:underline">
                      Read more →
                    </div>
                  </article>
                ))}

              {blogData.posts.filter(post => post.published).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <p className="font-sans text-lg">No blog posts yet. Check back soon!</p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-red-400 font-mono text-sm pt-12 border-t border-gray-300 dark:border-gray-700">
          <p>{personalData.footerText}</p>
        </footer>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && mediaItems.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black bg-opacity-95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-[110] text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Media Counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[110] text-white text-lg font-mono">
            {lightboxIndex + 1} / {mediaItems.length}
          </div>

          {/* Previous Button */}
          {mediaItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevMedia()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-[110] text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Previous media"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Media Content */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const currentItem = mediaItems[lightboxIndex]
              const mediaUrl = getGoogleDriveUrl(currentItem.googleDriveId, currentItem.type)

              return (
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  {/* Media Display */}
                  <div className="relative w-full h-full flex items-center justify-center mb-4">
                    {mediaUrl ? (
                      currentItem.type === 'image' ? (
                        <img
                          src={mediaUrl}
                          alt={currentItem.title}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : currentItem.type === 'video' ? (
                        <iframe
                          src={mediaUrl}
                          className="w-full h-full max-w-4xl max-h-[70vh]"
                          allow="autoplay"
                          title={currentItem.title}
                        />
                      ) : null
                    ) : (
                      <div className="text-white text-center">
                        <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p>No media available</p>
                      </div>
                    )}
                  </div>

                  {/* Media Info */}
                  <div className="text-center text-white max-w-2xl">
                    <h3 className="font-serif font-bold text-2xl mb-2">
                      {currentItem.title}
                    </h3>
                    {currentItem.description && (
                      <p className="text-gray-300 text-sm mb-2">
                        {currentItem.description}
                      </p>
                    )}
                    {currentItem.category && (
                      <span className="inline-block px-3 py-1 bg-blue-900 text-white rounded-full text-xs">
                        {currentItem.category}
                      </span>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>

          {/* Next Button */}
          {mediaItems.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextMedia()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-[110] text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Next media"
            >
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Thumbnail Strip at Bottom (Optional - for easy navigation) */}
          {mediaItems.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[110] flex gap-2 max-w-[90vw] overflow-x-auto px-4">
              {mediaItems.map((item, idx) => {
                const thumbUrl = getGoogleDriveUrl(item.googleDriveId, item.type)
                return (
                  <div
                    key={item.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setLightboxIndex(idx)
                    }}
                    className={`flex-shrink-0 w-16 h-16 cursor-pointer border-2 transition-all ${
                      idx === lightboxIndex ? 'border-blue-500 scale-110' : 'border-white border-opacity-50 hover:border-opacity-100'
                    }`}
                  >
                    {item.type === 'image' && thumbUrl ? (
                      <img
                        src={thumbUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
