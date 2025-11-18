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
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <header className="mb-24 animate-fade-in">
          <div className="mb-6">
            <h1 className="font-serif font-black text-7xl md:text-8xl lg:text-9xl mb-4 text-gradient leading-none">
              {personalData.name}
            </h1>
            <div className="font-sans text-2xl md:text-3xl text-gray-700 font-light tracking-wide">
              {personalData.title} <span className="text-gray-400">{personalData.separator}</span> {personalData.subtitle}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 font-mono text-sm">
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
        <section className="mb-24 animate-slide-up animate-delay-100">
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
        <section className="mb-24 animate-slide-up animate-delay-200">
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
        <section className="mb-24 animate-slide-up animate-delay-300">
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
        <section className="mb-24 animate-slide-up animate-delay-400">
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
        <section className="mb-16 animate-slide-up animate-delay-500">
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
              <div className="text-black italic">
                {honorsData.publications.items.map((pub, index) => (
                  <p key={index}>"{pub}"</p>
                ))}
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
