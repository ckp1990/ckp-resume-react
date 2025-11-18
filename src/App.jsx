import React from 'react'
import personalData from './data/personal.json'
import aboutData from './data/about.json'
import experienceData from './data/experience.json'
import educationData from './data/education.json'
import skillsData from './data/skills.json'
import honorsData from './data/honors.json'

function App() {
  // Helper function to parse HTML tags in text
  const parseText = (text) => {
    if (!text) return null

    // Replace <strong> tags
    let parts = text.split(/(<strong>.*?<\/strong>)/g)
    parts = parts.flatMap(part => {
      if (part.startsWith('<strong>') && part.endsWith('</strong>')) {
        const content = part.replace(/<\/?strong>/g, '')
        return <span key={Math.random()} className="font-semibold">{content}</span>
      }
      // Replace <em> tags
      if (part.includes('<em>') || part.includes('</em>')) {
        return part.split(/(<em>.*?<\/em>)/g).map((emPart, i) => {
          if (emPart.startsWith('<em>') && emPart.endsWith('</em>')) {
            const content = emPart.replace(/<\/?em>/g, '')
            return <span key={i} className="text-gray-700 italic">{content}</span>
          }
          return emPart
        })
      }
      // Replace <code> tags
      if (part.includes('<code>') || part.includes('</code>')) {
        return part.split(/(<code>.*?<\/code>)/g).map((codePart, i) => {
          if (codePart.startsWith('<code>') && codePart.endsWith('</code>')) {
            const content = codePart.replace(/<\/?code>/g, '')
            return <span key={i} className="font-mono font-semibold">{content}</span>
          }
          return codePart
        })
      }
      return part
    })

    return parts
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="font-serif font-bold text-xl text-blue-900">
              {personalData.name}
            </div>
            <div className="hidden md:flex space-x-8 font-sans text-sm">
              <a href="#about" className="text-gray-700 hover:text-blue-900 transition-colors">About</a>
              <a href="#experience" className="text-gray-700 hover:text-blue-900 transition-colors">Experience</a>
              <a href="#education" className="text-gray-700 hover:text-blue-900 transition-colors">Education</a>
              <a href="#skills" className="text-gray-700 hover:text-blue-900 transition-colors">Skills</a>
              <a href="#honors" className="text-gray-700 hover:text-blue-900 transition-colors">Honors</a>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-blue-900">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <header id="home" className="mb-24 animate-fade-in">
          {/* Profile Image Placeholder */}
          {personalData.profileImage ? (
            <div className="flex justify-center mb-8">
              <img
                src={personalData.profileImage}
                alt={personalData.name}
                className="w-48 h-48 rounded-full object-cover border-4 border-blue-900 shadow-lg"
              />
            </div>
          ) : (
            <div className="flex justify-center mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-blue-900 shadow-lg flex items-center justify-center">
                <svg className="w-24 h-24 text-blue-900" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          )}

          <div className="mb-6 text-center">
            <h1 className="font-serif font-black text-7xl md:text-8xl lg:text-9xl mb-4 text-gradient leading-none">
              {personalData.name}
            </h1>
            <div className="font-sans text-2xl md:text-3xl text-gray-700 font-light tracking-wide">
              {personalData.title} <span className="text-gray-400">{personalData.separator}</span> {personalData.subtitle}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8 font-mono text-sm">
            <a href={`mailto:${personalData.email}`}
               className="px-4 py-2 bg-white hover:bg-blue-50 border border-gray-300 hover:border-blue-900 rounded transition-all duration-300 text-black">
              {personalData.email}
            </a>
            <a href={personalData.linkedin}
               target="_blank"
               rel="noopener noreferrer"
               className="px-4 py-2 bg-white hover:bg-blue-50 border border-gray-300 hover:border-blue-900 rounded transition-all duration-300 text-black">
              {personalData.linkedinDisplay}
            </a>
            <div className="px-4 py-2 bg-white border border-gray-300 rounded text-black">
              {personalData.location}
            </div>
          </div>
        </header>

        {/* Summary Section */}
        <section id="about" className="mb-24 animate-slide-up animate-delay-100 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-8 text-blue-900">
            {aboutData.heading}
          </h2>
          <div className="font-sans text-lg md:text-xl leading-relaxed text-black space-y-4 max-w-4xl">
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index}>{parseText(paragraph)}</p>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 animate-slide-up animate-delay-200 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900">
            {experienceData.heading}
          </h2>

          <div className="space-y-12">
            {experienceData.jobs.map((job) => (
              <div key={job.id} className="border-l-2 border-blue-900 pl-6 hover:border-blue-600 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                  <h3 className="font-serif font-bold text-2xl md:text-3xl text-black">
                    {job.organization}
                  </h3>
                  <span className="font-mono text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <div className="font-sans text-xl text-blue-900 mb-4">{job.position}</div>
                {job.location && (
                  <p className="text-gray-600 italic mb-2">{job.location}</p>
                )}
                {job.description && (
                  <p className="text-black">{job.description}</p>
                )}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <ul className="space-y-2 text-black list-disc list-inside">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{parseText(resp)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-24 animate-slide-up animate-delay-300 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900">
            {educationData.heading}
          </h2>

          <div className="space-y-8">
            {educationData.degrees.map((degree) => (
              <div key={degree.id} className="bg-white border border-gray-300 rounded-lg p-6 hover:border-blue-900 transition-colors duration-300">
                <h3 className="font-serif font-bold text-2xl text-black mb-2">
                  {degree.degree}
                </h3>
                <div className="text-blue-900 font-sans text-lg mb-2">
                  {degree.institution}
                </div>
                <div className="text-gray-700">{degree.field}</div>
                <div className="font-mono text-sm text-gray-600 mt-2">{degree.year}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Certifications */}
        <section id="skills" className="mb-24 animate-slide-up animate-delay-400 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900">
            {skillsData.heading}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-blue-900 mb-4">
                {skillsData.skills.heading}
              </h3>
              <div className="flex flex-wrap gap-3">
                {skillsData.skills.items.map((skill, index) => (
                  <span key={index} className="px-4 py-2 bg-white border border-gray-300 rounded-full text-black font-mono text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-blue-900 mb-4">
                {skillsData.certifications.heading}
              </h3>
              <ul className="space-y-2 text-black">
                {skillsData.certifications.items.map((cert, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-900 mr-2">▸</span>
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Honors & Publications */}
        <section id="honors" className="mb-16 animate-slide-up animate-delay-500 scroll-mt-20">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-blue-900">
            {honorsData.heading}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-blue-900 mb-4">
                {honorsData.awards.heading}
              </h3>
              <ul className="space-y-3 text-black">
                {honorsData.awards.items.map((award, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-900 mr-2 text-xl">★</span>
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-blue-900 mb-4">
                {honorsData.publications.heading}
              </h3>
              <div className="text-black italic space-y-3">
                {honorsData.publications.items.map((pub, index) => {
                  // Support both string format and object format
                  const isString = typeof pub === 'string'
                  const title = isString ? pub : pub.title
                  const link = isString ? null : pub.link

                  return (
                    <p key={index}>
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-900 hover:underline"
                        >
                          "{title}"
                        </a>
                      ) : (
                        `"${title}"`
                      )}
                    </p>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 font-mono text-sm pt-12 border-t border-gray-300">
          <p>{personalData.footerText}</p>
        </footer>
      </div>
    </div>
  )
}

export default App
