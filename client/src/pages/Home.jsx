import React from 'react'
import Hero from '../components/Hero'
import Tabs from '../components/Tabs'
import Steps from '../components/Steps'
import WhyChooseUs from '../components/WhyChooseUs'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero />
      <Tabs />
      <Steps />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}

export default Home