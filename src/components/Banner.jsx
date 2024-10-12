import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'


function Banner({ loading }) {

    const bannerData = useSelector(state => state.moiveoData.bannerData)
    const imgURL = useSelector(state => state.moiveoData.imgURL)
    const [currentImg, setCurrentImg] = useState(0)



    const handleNext = () => {
        if (currentImg < bannerData.length - 1) {
            setCurrentImg(prevState => prevState + 1)
        }

    }

    const handlePrev = () => {
        if (currentImg > 0) {
            setCurrentImg(prevState => prevState - 1)
        }
    }


    useEffect(() => {

        const interval = setInterval(() => {
            if (currentImg < bannerData.length - 1) {
                handleNext()
            }
            else {
                setCurrentImg(0)
            }
        }, 5000)

        return () => clearInterval(interval)

    }, [bannerData, imgURL, currentImg]) // must add "currendtImg" to the dependencies array  
    // in order to prevent stale closure situiation



    return (
        <section className='w-full h-full'>
            {loading ? <Skeleton height={500} className='opacity-15' /> :
            <div className='flex min-h-full max-h-[95vh] overflow-hidden w-full'>
                {
                    bannerData.map((data, index) => (
                        <div key={data.id + "bannerHome" + index} className='min-w-full min-h-[450px] lg:min-h-full relative transition-all group' style={{ transform: `translateX(-${currentImg * 100}%)` }}>

                            {/* banner img */}
                            <div className='w-full h-full overflow-hidden'>
                                <img src={imgURL + data.backdrop_path} alt="movie banner" className='h-full w-full object-cover' />
                            </div>


                            {/* button next and prev image */}
                            <div className="absolute top-0 w-full h-full hidden items-center justify-between px-3 group-hover:lg:flex">

                                <button onClick={handlePrev} className={`cursor-pointer backdrop-blur-md p-3 bg-neutral-400 hover:bg-neutral-50 hover:bg-opacity-20  bg-opacity-20 rounded-full text-2xl z-10 text-neutral-300 flex items-center justify-center transition-all shadow-md ${!currentImg > 0 && 'opacity-0'}`}>
                                    <FaAngleLeft className='w-7 h-7' />
                                </button>

                                <button onClick={handleNext} className={`cursor-pointer backdrop-blur-md p-3 bg-neutral-400 hover:bg-neutral-50 hover:bg-opacity-20  bg-opacity-20 rounded-full text-2xl z-10 text-neutral-300 flex items-center justify-center transition-all shadow-md ${currentImg == bannerData.length - 1 && 'opacity-0'}`}>
                                    <FaAngleRight className='w-7 h-7' />
                                </button>
                            </div>



                            {/* banner gradient effect */}
                            <div className='absolute top-0 bg-gradient-to-t from-neutral-900 to-transparent h-full w-full' />


                            <div className='container mx-auto lg:px-6'>
                                {/* text */}
                                <div className='container w-full mx-auto absolute bottom-0 max-w-md px-3'>

                                    {/* title */}
                                    <h2 className='font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl'>
                                        {data?.title || data?.name}
                                    </h2>

                                    {/* overview */}
                                    <p className='text-ellipsis line-clamp-3 my-2'>
                                        {data.overview}
                                    </p>

                                    <div className='flex items-center gap-4 font-bold'>
                                        <p>
                                            Rating : {Number(data.vote_average).toFixed(1)}
                                        </p>

                                        <span>|</span>

                                        <p>
                                            View : {Number(data.popularity).toFixed(0)}
                                        </p>

                                    </div>

                                    <button className='bg-white px-4 py-2  text-black font-bold rounded my-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                        Play Now
                                    </button>
                                </div>
                            </div>

                        </div>
                    )
                    )
                }
            </div>}
        </section>
    )
}

export default Banner