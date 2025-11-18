import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
      {/* Organic background pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(251, 191, 36, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 40% 90%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <header className="mb-24 animate-fade-in">
          <div className="mb-6">
            <h1 className="font-serif font-black text-7xl md:text-8xl lg:text-9xl mb-4 text-gradient leading-none">
              Chandan Kumar Pandey
            </h1>
            <div className="font-sans text-2xl md:text-3xl text-stone-300 font-light tracking-wide">
              Ecologist <span className="text-amber-500">×</span> Data Scientist
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-8 font-mono text-sm">
            <a href="mailto:chandanpandey0404@gmail.com"
               className="px-4 py-2 bg-stone-800/50 hover:bg-amber-900/30 border border-stone-700 hover:border-amber-700 rounded transition-all duration-300">
              chandanpandey0404@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/ckp1990"
               target="_blank"
               rel="noopener noreferrer"
               className="px-4 py-2 bg-stone-800/50 hover:bg-amber-900/30 border border-stone-700 hover:border-amber-700 rounded transition-all duration-300">
              LinkedIn
            </a>
            <div className="px-4 py-2 bg-stone-800/50 border border-stone-700 rounded">
              Bengaluru, India
            </div>
          </div>
        </header>

        {/* Summary Section */}
        <section className="mb-24 animate-slide-up animate-delay-100">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-8 text-amber-400">
            About
          </h2>
          <div className="font-sans text-lg md:text-xl leading-relaxed text-stone-300 space-y-4 max-w-4xl">
            <p>
              Doctoral student exploring the intricate tapestry of population ecology, hierarchical modelling,
              and large mammal ecology under the mentorship of Dr. N. Samba Kumar.
            </p>
            <p>
              Passionate about leveraging <span className="text-amber-400 font-semibold">Machine Learning</span> and{' '}
              <span className="text-amber-400 font-semibold">Artificial Intelligence</span> to decipher complex
              patterns governing species populations and their determinants.
            </p>
            <p className="text-stone-400 italic">
              Whether treading through dense forests, observing wildlife in natural habitats, or analyzing
              computational models, I'm driven by the quest to decode nature's algorithms and preserve
              our planet's biodiversity.
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section className="mb-24 animate-slide-up animate-delay-200">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-amber-400">
            Experience
          </h2>

          <div className="space-y-12">
            {/* Centre for Wildlife Studies - Doctoral Fellow */}
            <div className="border-l-2 border-emerald-700 pl-6 hover:border-amber-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100">
                  Centre for Wildlife Studies
                </h3>
                <span className="font-mono text-sm text-amber-500">Jul 2022 - Present</span>
              </div>
              <div className="font-sans text-xl text-emerald-400 mb-4">Doctoral Fellow</div>
              <p className="text-stone-400 italic mb-2">Bengaluru, Karnataka, India</p>
            </div>

            {/* Centre for Wildlife Studies - Research Assistant */}
            <div className="border-l-2 border-emerald-700 pl-6 hover:border-amber-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100">
                  Centre for Wildlife Studies
                </h3>
                <span className="font-mono text-sm text-amber-500">Feb 2019 - Jul 2022</span>
              </div>
              <div className="font-sans text-xl text-emerald-400 mb-4">Research Assistant: Analysis and Programming</div>
              <ul className="space-y-2 text-stone-300 list-disc list-inside">
                <li>Oversee database development using <span className="font-mono text-amber-400">SQL</span> for camera trap images,
                    line transect, and long-term monitoring projects</li>
                <li>Written code snippets in <span className="font-mono text-amber-400">R</span> and{' '}
                    <span className="font-mono text-amber-400">Python</span> for automatic data retrieval,
                    reducing processing time by <span className="text-emerald-400 font-semibold">90%</span></li>
                <li>Develop statistical models to estimate wildlife populations from camera trap and line transect data</li>
                <li>Implementation on cloud-computational cluster (NCBS), reducing analysis time by{' '}
                    <span className="text-emerald-400 font-semibold">99%</span></li>
                <li>Lead machine learning project with Prof. Kartic Subr (University of Edinburgh) to automate
                    classification of individual felines using deep learning (AlexNet and WSDDN)</li>
                <li>Manuscript preparation for peer-reviewed journals</li>
              </ul>
            </div>

            {/* Adavi Trust */}
            <div className="border-l-2 border-emerald-700 pl-6 hover:border-amber-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100">
                  Adavi Trust
                </h3>
                <span className="font-mono text-sm text-amber-500">Mar 2019 - Jan 2020</span>
              </div>
              <div className="font-sans text-xl text-emerald-400 mb-4">Research Associate</div>
              <p className="text-stone-400 italic mb-2">Chennekothapalli Village, Anantapur District, Andhra Pradesh</p>
              <p className="text-stone-300">
                Research consultancy in designing questions and applications for conservation work
                with Timbuktu Collective
              </p>
            </div>

            {/* Self-employed Researcher */}
            <div className="border-l-2 border-emerald-700 pl-6 hover:border-amber-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100">
                  Self-employed
                </h3>
                <span className="font-mono text-sm text-amber-500">Aug 2018 - Jan 2019</span>
              </div>
              <div className="font-sans text-xl text-emerald-400 mb-4">Freelance Researcher</div>
              <p className="text-stone-300">
                Data analysis and experimental design consultancy using statistical tools in R and Python
              </p>
            </div>

            {/* IISc */}
            <div className="border-l-2 border-emerald-700 pl-6 hover:border-amber-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100">
                  Centre for Ecological Sciences, IISc
                </h3>
                <span className="font-mono text-sm text-amber-500">Jun 2018 - Aug 2018</span>
              </div>
              <div className="font-sans text-xl text-emerald-400 mb-4">Research Assistant</div>
              <ul className="space-y-2 text-stone-300 list-disc list-inside">
                <li>Analysis of biotic/abiotic factors in Leucocytozoon transmission in Himalayan bird species</li>
                <li>Developed Generalized Linear Mixed Effect Models for parasite prevalence and intensity analysis</li>
                <li>Built Phylogeny Tree using Bayesian models</li>
                <li>Automated genetic data mining from web sources, reducing effort by 10×</li>
              </ul>
            </div>

            {/* TIFR */}
            <div className="border-l-2 border-emerald-700 pl-6 hover:border-amber-500 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-3">
                <h3 className="font-serif font-bold text-2xl md:text-3xl text-stone-100">
                  Tata Institute of Fundamental Research
                </h3>
                <span className="font-mono text-sm text-amber-500">Aug 2013 - May 2018</span>
              </div>
              <div className="font-sans text-xl text-emerald-400 mb-4">Junior Research Scholar</div>
              <p className="text-stone-300">
                Designed and executed collaborative projects across multiple educational institutes at
                National Centre for Biological Sciences, TIFR
              </p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-24 animate-slide-up animate-delay-300">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-amber-400">
            Education
          </h2>

          <div className="space-y-8">
            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-6 hover:border-amber-700 transition-colors duration-300">
              <h3 className="font-serif font-bold text-2xl text-stone-100 mb-2">
                Doctor of Philosophy (PhD)
              </h3>
              <div className="text-emerald-400 font-sans text-lg mb-2">
                Manipal Institute of Technology
              </div>
              <div className="text-stone-400">
                Ecology, Evolution, Systematics, and Population Biology
              </div>
              <div className="font-mono text-sm text-amber-500 mt-2">June 2023</div>
            </div>

            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-6 hover:border-amber-700 transition-colors duration-300">
              <h3 className="font-serif font-bold text-2xl text-stone-100 mb-2">
                Master's Degree (M.Sc in Biology by Research)
              </h3>
              <div className="text-emerald-400 font-sans text-lg mb-2">
                Tata Institute of Fundamental Research, Mumbai
              </div>
              <div className="text-stone-400">Ecology</div>
              <div className="font-mono text-sm text-amber-500 mt-2">2013 - 2016</div>
            </div>

            <div className="bg-stone-900/40 border border-stone-800 rounded-lg p-6 hover:border-amber-700 transition-colors duration-300">
              <h3 className="font-serif font-bold text-2xl text-stone-100 mb-2">
                Bachelor's Degree
              </h3>
              <div className="text-emerald-400 font-sans text-lg mb-2">
                Sri Jayachamarajendra College of Engineering, Mysore
              </div>
              <div className="text-stone-400">Biotechnology</div>
              <div className="font-mono text-sm text-amber-500 mt-2">2009 - 2013</div>
            </div>
          </div>
        </section>

        {/* Skills & Certifications */}
        <section className="mb-24 animate-slide-up animate-delay-400">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-amber-400">
            Skills & Certifications
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-emerald-400 mb-4">Top Skills</h3>
              <div className="flex flex-wrap gap-3">
                {['Research and Development (R&D)', 'Ecological Research', 'Field Biology',
                  'Statistical Modeling', 'Machine Learning', 'Python', 'R', 'SQL'].map((skill) => (
                  <span key={skill} className="px-4 py-2 bg-emerald-900/30 border border-emerald-800 rounded-full text-stone-300 font-mono text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-emerald-400 mb-4">Certifications</h3>
              <ul className="space-y-2 text-stone-300">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">▸</span>
                  GIS Data Formats, Design and Quality
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">▸</span>
                  Fundamentals of GIS
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">▸</span>
                  Overview of Geocomputation and Geo-web services
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">▸</span>
                  Data Visualization
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">▸</span>
                  The Data Scientist's Toolbox
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Honors & Publications */}
        <section className="mb-16 animate-slide-up animate-delay-500">
          <h2 className="font-serif font-bold text-4xl md:text-5xl mb-12 text-amber-400">
            Honors & Publications
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-2xl text-emerald-400 mb-4">Awards</h3>
              <ul className="space-y-3 text-stone-300">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2 text-xl">★</span>
                  <span>Annual Talk-2017, Best Poster Award</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2 text-xl">★</span>
                  <span>British Ecological Society Training and Travel Grant</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2 text-xl">★</span>
                  <span>KaggleX BIPOC Mentorship Award</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif font-bold text-2xl text-emerald-400 mb-4">Publications</h3>
              <div className="text-stone-300 italic">
                "Understanding the variation in wood densities of trees and its implications
                for carbon assessments"
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-stone-500 font-mono text-sm pt-12 border-t border-stone-800">
          <p>© 2025 Chandan Kumar Pandey. Decoding nature's algorithms.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
