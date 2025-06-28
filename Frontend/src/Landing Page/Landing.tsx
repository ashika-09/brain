import Layout from './components/layout'
import HomePage from './components/home-page'
import AboutSection from './components/about-section'
import TestimonialsSection from './components/testimonials-section'
import ContactSection from './components/contact-section'
import Headers from './components/Headers'

export default function Home() {
  return (
    <Layout>
      <Headers />
      <HomePage />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </Layout>
  )
}
