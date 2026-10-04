"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import ScreenContainer from '../ScreenContainer';

export default function PhotoGalleryScreen({ onNext }) {
    const photos = [
        "/images/5.jpg",
        "/images/6.jpg",
        "/images/7.jpg",
        "/images/8.jpg",
    ]

    const [details, setDetails] = React.useState(null)

    const [sliderRef] = useKeenSlider({
        loop: true,
        detailsChanged(s) {
            setDetails(s.track.details)
        },
        initial: 2,
    })

    function scaleStyle(idx) {
        if (!details) return {}
        const slide = details.slides[idx]
        const scale_size = 0.7
        const scale = 1 - (scale_size - scale_size * slide.portion)
        return {
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
        }
    }

    return (
        <ScreenContainer>
            <motion.section
                className="flex items-center justify-center py-8 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="max-w-4xl mx-auto flex flex-col items-center justify-center w-full">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 text-balance text-center leading-tight"
                    >
                        Our Beautiful Memories
                        {/* Heading */}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-white/60 mb-2"
                    >
                        (Swipe for more➡️)
                    </motion.p>
                    {/* Photo Carousel */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: .5, duration: 1 }}
                        className='flex h-90 w-80 sm:h-100 sm:w-90'>
                        <div ref={sliderRef} className="zoom-out keen-slider cursor-grab active:cursor-grabbing">
                            {photos.map((photo, index) => (
                                <div key={index} className="keen-slider__slide zoom-out__slide">
                                    <Image
                                        src={photo}
                                        fill
                                        sizes="400px"
                                        alt={`Memory ${index + 1}`}
                                        className="object-cover rounded-2xl w-full"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                        loading="lazy"
                                        style={scaleStyle(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.button
                        onClick={onNext}
                        className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex mx-auto mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                         <motion.div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10">Read My Message 💌</span>
                    </motion.button>
                </div>
            </motion.section>
        </ScreenContainer>
    );
};
