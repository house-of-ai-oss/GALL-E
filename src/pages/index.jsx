import Head from "next/head"

import { CallToAction } from "@/components/CallToAction"
//import { Faqs } from '@/components/Faqs'
import { Footer } from "@/components/Footer"
//import { Header } from '@/components/Header'
import { Hero } from "@/components/Hero"
//import { Pricing } from '@/components/Pricing'
import { PrimaryFeatures } from "@/components/PrimaryFeatures"
import { SecondaryFeatures } from "@/components/SecondaryFeatures"
//import { SecondaryFeatures } from '@/components/SecondaryFeatures'
//import { Testimonials } from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <Head>
        <title>Call-AI</title>
        <meta
          name="description"
          content="The new AI-Call Center for your business."
        />
      </Head>
      {/*<Header />*/}
      <main>
        <div className="h-24"></div>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        {/*<Testimonials />*/}
        {/*<Pricing />*/}
        {/*<Faqs />*/}
      </main>
      <Footer />
    </>
  )
}
