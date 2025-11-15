import React, { lazy } from 'react'
import Header from './components/lazy/components/Header'
import Banner from './components/lazy/components/Banner'
import LazyWrapper from './components/lazy/LazyWrapper'

// Lazy imports
const Slider = lazy(() => import('./components/lazy/components/Slider'))
const Testimonials = lazy(() =>
  import('./components/lazy/components/Testimonials')
)
const About = lazy(() => import('./components/lazy/components/About'))
const ContactForm = lazy(() =>
  import('./components/lazy/components/ContactForm')
)
const Footer = lazy(() => import('./components/lazy/components/Footer'))

function App2() {
  return (
    <main>
      <Header />
      <Banner />

      <LazyWrapper>
        <Slider />
      </LazyWrapper>

      <LazyWrapper>
        <Testimonials />
      </LazyWrapper>

      <LazyWrapper>
        <About />
      </LazyWrapper>

      <LazyWrapper>
        <ContactForm />
      </LazyWrapper>

      <LazyWrapper>
        <Footer />
      </LazyWrapper>
    </main>
  )
}

export default App2
