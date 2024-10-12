import React from 'react'
import Banner from '../components/Banner'
import { useSelector } from 'react-redux'
import HorizontalScrollCards from '../components/HorizontalScrollCards'
import useFetch from '../hooks/useFetch'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useOutletContext } from 'react-router-dom'


function Home() {

  const [trendingLoading] = useOutletContext()

  const trending = useSelector(state => state.moiveoData.bannerData)

  // now playing
  const { data: nowPlaying, loading: nowPlayingLoading } = useFetch('/movie/now_playing')

  // top rated movies
  const { data: topRated, loading: topRatedLoading } = useFetch('/movie/top_rated')

  // top rated TV shows
  const { data: topRatedTvShows, loading: topRatedTvLoading } = useFetch('tv/top_rated')

  // top rated on air TV
  const { data: OnAirTvShows, loading: onAirLoading } = useFetch('tv/on_the_air')




  return (
    <div>
      <Banner loading={trendingLoading} />
      <div className='lg:px-6'>

        {trendingLoading ?
          <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6'id='trend'>
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
          </div>
          :
          <HorizontalScrollCards heading={'Trending'} data={trending} isTrend={true} />
        }
        
        {nowPlayingLoading ?
          <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6'>
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
          </div>
          : <HorizontalScrollCards heading={'Now Playing'} data={nowPlaying} media_type={'movie'} />
        }

        {topRatedLoading ?
          <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6'>
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
          </div>
          :
          <HorizontalScrollCards heading={'Top Rated Movies'} data={topRated} media_type={'movie'} />
        }

        {topRatedTvLoading ?
          <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6'>
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
          </div>
          :
          <HorizontalScrollCards heading={'Top Rated TV Shows'} data={topRatedTvShows} media_type={'tv'} />}

        {onAirLoading ?
          <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6'>
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
            <Skeleton width={230} height={320} />
          </div>
          :
          <HorizontalScrollCards heading={'On The Air TV Shows'} data={OnAirTvShows} media_type={'tv'} />
        }
      </div>
    </div>
  )
}

export default Home