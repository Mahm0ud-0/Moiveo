import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'
import moment from 'moment'
import Devidor from '../components/Devidor'
import HorizontalScrollCards from '../components/HorizontalScrollCards'
import { FaAngleDown, FaAngleUp, FaStar } from 'react-icons/fa'
import { GrStatusInfo, GrLanguage } from 'react-icons/gr'
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlineVideoLibrary, MdAccessTime } from "react-icons/md";
import Skeleton from 'react-loading-skeleton'
import VidPlay from '../components/VidPlay'

function Details() {

  const imgURL = useSelector(state => state.moiveoData.imgURL)


  // fetch details depending on the id given in the url
  const params = useParams()  // explore , id  url: /:explore/:id
  const { data, loading: dataLoading } = useFetch(`/${params?.explore}/${params?.id}`, true) // check useFetch for the second boolean parameter


  // fetch cast data based on the id
  const { data: castData, loading: castLoading } = useFetch(`/${params?.explore}/${params?.id}/credits`, true)


  // recommended and similar shows
  const { data: similar } = useFetch(`${params.explore}/${params.id}/similar`)
  const { data: recommendatoins } = useFetch(`${params.explore}/${params.id}/recommendations`)


  // play video state
  const [playVideo, setPlayVideo] = useState(false)
  const [playVideoId, setPlayVideoId] = useState('')

  // duration
  const duration = (Number(data?.runtime) / 60).toFixed(1).split('.')


  // work crew
  const directors = castData?.crew?.filter(crew => crew.job.toLowerCase() === "director").map(el => el?.name)?.join(', ')
  const writers = castData?.crew?.filter(crew => crew.job.toLowerCase() === "writer").map(el => el?.name)?.join(', ')
  const characters = castData?.crew?.filter(crew => crew.job.toLowerCase() === "characters").map(el => el?.name)?.join(', ')


  // state to control cast view
  const [showAllCast, setShowAllCast] = useState(false)


  // scroll to top when id changes (like when user clicks on a recommended movie)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.id])


  console.log(data)



  const handlePlayVid = (data) => {
    setPlayVideoId(data)
    setPlayVideo(true)
  }
  
  
  
  
  
  return (
    <div className='overflow-hidden'>

      {/* banner */}
      <div className="w-full h-[300px] lg:h-[50vh] relative">

        {/* img */}
        {
          dataLoading ? <Skeleton height={400} className='opacity-15' /> :
            <>
              <div className='w-full h-full'>
                <img src={imgURL + data?.backdrop_path} alt={data.title}
                  className='h-full w-full object-cover' />
              </div>

              {/* gradient effect */}
              <div className='absolute w-full h-full top-0 bg-gradient-to-t  from-neutral-900 to-transparent' />
            </>
        }
      </div>

      <div className='container mx-auto lg:px-9 flex flex-col lg:flex-row gap-5 lg:gap-10 items-center lg:items-start'>

        {/* poster */}
        {
          dataLoading ? <Skeleton width={240} height={320} /> :
            <div className="-mt-36 lg:-mt-40 relative mx-auto lg:mx-0 w-fit min-w-60">
              <img src={imgURL + data?.poster_path} alt={data.title}
                className='h-80 w-60 object-cover rounded shadow' />

              <button onClick={() => handlePlayVid(data)} className='bg-white px-4 py-3 w-full  text-black font-bold text-lg rounded my-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                Play Now
              </button>
            </div>
        }


        {/* text data & cast*/}
        <div className="text-center lg:text-left">

          {/* title */}
          {dataLoading ? <Skeleton width={200} height={36} /> :
            <h2 className='text-3xl md:text-5xl font-bold text-white'>{data.title || data.name || <Skeleton />}</h2>
          }

          {/* tagline */}
          {
            dataLoading ? <Skeleton width={230} height={24} /> :
              <p className='text-neutral-400 mt-2'>{data?.tagline || ''}</p>
          }

          <Devidor />

          {/* stats */}
          <div className='flex items-center gap-3 lg:gap-5 w-full flex-wrap justify-center lg:justify-start font-bold text-lg text-white'>

            {dataLoading ? <Skeleton width={100} height={28} /> :
              <p className='flex items-center gap-1'>
                <span className='text-neutral-400 text-2xl '>{<FaStar />}</span><span className='flex pt-0.5 text-sm md:text-lg'> {Number(data?.vote_average).toFixed(1)}</span>
              </p>

            }

            <span>|</span>

            {dataLoading ? <Skeleton width={100} height={28} /> :
              <p className='flex items-center gap-1 uppercase'>
                <span className='text-neutral-400 text-xl'>{<GrLanguage />}</span> {data?.original_language}
              </p>
            }
            <span>|</span>

            {Number(duration[0]) ?
              dataLoading ? <Skeleton width={100} height={28} /> :
                <p className='flex items-center gap-1 uppercase'>
                  <span className='text-neutral-400 text-2xl'>{<MdAccessTime />}</span> {duration[0]}h {duration[1] * 6}m
                </p>
              :
              dataLoading ? <Skeleton width={100} height={28} /> :
                <p className='flex items-center gap-1 uppercase'>
                  <span className='text-neutral-400 text-lg'>{<MdOutlineVideoLibrary />}</span> {data.number_of_episodes}
                </p>
            }


          </div>

          <Devidor />

          {/* desicription & stats*/}
          <div>

            {dataLoading ? <Skeleton width={200} height={32} /> :
              <h3 className='text-xl font-bold text-white mb-1 text-left px-3 lg:px-0'>Description</h3>
            }
            {dataLoading ? <Skeleton height={12} count={4} /> :
              <p className='text-justify lg:w-3/4 px-3 lg:px-0'>{data.overview}</p>
            }

            <Devidor />

            <div className='flex items-center gap-3 lg:gap-5 my-5 w-full justify-center lg:justify-start font-bold text-sm md:text-lg text-white text-center'>

              {dataLoading ? <Skeleton width={100} height={8} /> :
                <p className='flex flex-wrap items-center justify-center gap-1.5'>
                  <span className='text-neutral-400 text-xl'>{<GrStatusInfo />} </span> {data.status}
                </p>
              }
              <span>|</span>
              {dataLoading ? <Skeleton width={100} height={8} /> :
                <p className='flex flex-wrap items-center justify-center gap-1.5'>
                  <span className='text-neutral-400 text-xl'>{< LuCalendarDays />} </span> {moment(data?.release_date || data?.first_air_date).format("MMMM Do YYYY")}
                </p>
              }
            </div>

          </div>

          <Devidor />

          {/* crew */}
          {castLoading ? <Skeleton height={18} count={2} /> :
            <div>

              {
                castData?.crew?.filter(crew => crew.job == "Director")[0] &&
                <>
                  <p className='text-neutral-400 font-bold px-3 lg:px-0 text-left'>
                    <span className='text-white '>
                      Director: </span> {directors}
                  </p>
                  <Devidor />
                </>

              }
              {
                (castData?.crew?.filter(crew => crew.job == "Writer")[0] || castData?.crew?.filter(crew => crew.job == "Characters")[0]) &&
                <>
                  <p className='text-neutral-400 font-bold px-3 lg:px-0 text-left'>
                    <span className='text-white'>
                      Writer: </span> {writers || characters}
                  </p>
                  <Devidor />
                </>
              }

            </div>
          }

          {/* cast */}
          {castLoading ? <Skeleton width={200} height={32} /> :
            <h3 className='text-xl font-bold text-white my-5 px-3 text-left'>
              Cast
            </h3>
          }

          <div className={`grid grid-cols-[repeat(auto-fit,96px)] gap-5 justify-center sm:justify-between ${!showAllCast && 'h-36 lg:h-40'} transition-all overflow-hidden`}>
            {dataLoading ? <div className="flex w-fit justify-between gap-2">
              <Skeleton width={96} height={96} circle />
              <Skeleton width={96} height={96} circle />
              <Skeleton width={96} height={96} circle />
              <Skeleton width={96} height={96} circle />
            </div> :
              castData?.cast?.map((el, index) => (
                <div key={el.id + 'details' + index} className='flex flex-col items-center w-24'>

                  <div className="">
                    <img src={imgURL + el?.profile_path} alt={el?.name}
                      className='w-24 h-24 rounded-full object-cover'
                    />
                  </div>
                  <p className='font-bold w-24 text-center text-sm text-white'>{el?.name}</p>
                  <p className='font-light text-neutral-400 w-24 text-center text-sm'>{el?.character}</p>

                </div>
              ))
            }
          </div>

          <div className='w-full flex items-center !justify-center text-3xl'>
            {
              showAllCast
                ?
                <FaAngleUp className='cursor-pointer hover:scale-125' onClick={() => setShowAllCast(prev => !prev)} />
                :
                <FaAngleDown className='cursor-pointer hover:scale-125' onClick={() => setShowAllCast(prev => !prev)} />
            }
          </div>

        </div>

      </div>


      <div className='lg:px-6'>

        {/* similar */}
        <HorizontalScrollCards data={similar} heading={'similar'} media_type={params?.explore} />

        {/* recommendatoins */}
        <HorizontalScrollCards data={recommendatoins} heading={'recommended'} media_type={params?.explore} />

      </div>


      {playVideo && <VidPlay data={playVideoId} close={() => setPlayVideo(false)} mediaType={params?.explore}/>}

    </div>
  )
}

export default Details