import React from 'react'
import {IoClose} from 'react-icons/io5'
import useFetch from '../hooks/useFetch'

function VidPlay({ data, close, mediaType }) {

    const {data: videoData} = useFetch(`${mediaType}/${data.id}/videos`)

    
    const [trailer] = videoData?.filter(vid => vid?.type === "Trailer")

    return (
        <section className='fixed w-full bg-neutral-700 top-0 right-0 left-0 bottom-0 z-40 bg-opacity-60 flex items-center justify-center'>
            <div className="bg-black w-full md:w-[80%] max-h-[80vh]  max-w-screen-lg rounded-lg aspect-video relative group">

                <button onClick={close} className='absolute right-2.5 top-2 text-3xl lg:opacity-0 group-hover:opacity-100 z-50 hover:text-orange-600'>
                    <IoClose />
                </button>

                <iframe src={`https://www.youtube.com/embed/${trailer?.key}`} className='w-full h-full'/>
                
            </div>
        </section>
    )
}

export default VidPlay