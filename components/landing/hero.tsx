"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { LayoutGroup, motion } from "framer-motion"
import { TextRotate } from "@/components/ui/text-rotate"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"

const exampleImages = [
  {
    url: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2000&auto=format&fit=crop",
    title: "Student studying with tutor",
  },
  {
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2000&auto=format&fit=crop",
    title: "Students in library",
  },
  {
    url: "https://images.unsplash.com/photo-1503676382389-4809596d5290?q=80&w=2000&auto=format&fit=crop",
    title: "Online tutoring session",
  },
  {
    url: "https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=2000&auto=format&fit=crop",
    title: "Student writing in notebook",
  },
  {
    url: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=2000&auto=format&fit=crop",
    title: "Tutoring classroom",
  },
  {
    url: "https://images.unsplash.com/photo-1510936111840-6cef99faf2a9?q=80&w=2000&auto=format&fit=crop",
    title: "Online learning on laptop",
  },
  {
    url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2000&auto=format&fit=crop",
    title: "Exam preparation",
  },
  {
    url: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=2000&auto=format&fit=crop",
    title: "Young students working in classroom",
  },
]

export function Hero() {
  return (
    <section className="w-full h-[85vh] overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative bg-background">
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src={exampleImages[0].url}
            alt={exampleImages[0].title}
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src={exampleImages[1].url}
            alt={exampleImages[1].title}
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.img
            src={exampleImages[2].url}
            alt={exampleImages[2].title}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[3].url}
            alt={exampleImages[3].title}
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.img
            src={exampleImages[4].url}
            alt={exampleImages[4].title}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-3xl sm:text-5xl md:text-7xl lg:text-7xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight font-extrabold tracking-tight space-y-1 md:space-y-4"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span>Find the perfect </span>
          <LayoutGroup>
            <motion.span layout className="flex whitespace-pre">
              <motion.span
                layout
                className="flex whitespace-pre"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              >
                tutor for{" "}
              </motion.span>
              <TextRotate
                texts={[
                  "math",
                  "science",
                  "coding",
                  "reading",
                  "everything",
                  "your child"
                ]}
                mainClassName="overflow-hidden pr-3 text-primary py-0 pb-2 md:pb-4 rounded-xl"
                staggerDuration={0.03}
                staggerFrom="last"
                rotationInterval={3000}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </motion.h1>
        <motion.p
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center text-muted-foreground pt-4 sm:pt-8 md:pt-10 lg:pt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Connect with verified university students and graduates who excel academically.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20">
          <motion.button
            className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-primary-foreground bg-primary px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-xl"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="/tutors" className="flex items-center">
              Find a Tutor <span className="ml-2 font-serif text-xl border border-primary-foreground/30 px-2 rounded-full leading-none">→</span>
            </Link>
          </motion.button>
          <motion.button
            className="sm:text-base md:text-lg lg:text-xl font-medium tracking-tight bg-muted/80 backdrop-blur-sm text-foreground hover:bg-muted border border-border px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-sm"
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
              delay: 0.7,
              scale: { duration: 0.2 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", damping: 30, stiffness: 400 },
            }}
          >
            <Link href="/become-tutor">Become a Tutor</Link>
          </motion.button>
        </div>
      </div>
    </section>
  )
}
