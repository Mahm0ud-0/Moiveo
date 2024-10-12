import React, { useRef } from 'react'
import Card from './Card'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'


function HorizontalScrollCards({ heading, data = [], isTrend, media_type}) {


    const containerRef = useRef()


    const handleNext = () => {
        containerRef.current.scrollLeft += 254  // card width + gap = 230 + 24 = 254 
    }

    const handlePrev = () => {
        containerRef.current.scrollLeft -= 254
    }


    return (

        //  trending section
        <div className='container mx-auto px-3 my-10'>
            <h2 className='text-xl lg:text-2xl font-bold mb-3 text-white capitalize'>{heading}</h2>


            {/* trending cards container */}
            <div className='relative'>

                <div ref={containerRef} className='grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll relative w-full h-[320px] z-10 transition-all scroll-smooth'>
                    {
                        data.map((movie, index) => (
                            <Card key={movie.id + "heading" + index} data={movie} index={index + 1} trending={isTrend} media_type={media_type}/>
                        ))
                    }
                </div>

                {/* next & prev buttons */}
                <div className='absolute top-0 hidden lg:flex justify-between w-full h-full items-center'>

                    <button onClick={handlePrev} className={`cursor-pointer hover:backdrop-blur-md backdrop-blur-[2px] p-3 bg-neutral-400/30 hover:bg-neutral-50/20 rounded-full text-2xl z-10 text-neutral-300 flex items-center justify-center transition-all shadow-md -ml-8`}>
                        <FaAngleLeft className='w-7 h-7' />
                    </button>

                    <button onClick={handleNext} className={`cursor-pointer hover:backdrop-blur-md backdrop-blur-[2px] p-3 bg-neutral-400/30 hover:bg-neutral-50/20 rounded-full text-2xl z-10 text-neutral-300 flex items-center justify-center transition-all shadow-md -mr-8`}>
                        <FaAngleRight className='w-7 h-7' />
                    </button>
                </div>

            </div>

        </div>




    )
}

export default HorizontalScrollCards