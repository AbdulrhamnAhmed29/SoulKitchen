import React from 'react'
import { motion } from 'framer-motion'
import HeroSection from '../generalsComponents/home/HeroSection'
import MenuSection from '../features/products/component/MenuSection'
import DigitalMenu from '../features/products/component/DigitalMenu'
import VisitUs from '../generalsComponents/home/VisitUs'
import Testimonials from '../features/Testimonials/Testimonials'
import ActionSection from '../generalsComponents/home/ActionSection'

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } // 
    }
}

function Home() {
    return (
        <div className="bg-black">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
            >
                <HeroSection />
            </motion.div>


            <MenuSection />

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <DigitalMenu />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <VisitUs />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <Testimonials />
            </motion.div>
            <ActionSection />
        </div>
    )
}

export default Home