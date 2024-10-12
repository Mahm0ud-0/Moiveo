import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import Skeleton from 'react-loading-skeleton'

function Explore() {
  const params = useParams()
  const [pageNo, setPageNo] = useState(1)
  const [data, setData] = useState([])
  const [totalPageNo, setTotalPageNo] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        }
      })
      setLoading(false)


      setData((prev) => {
        return [
          ...prev,
          ...res.data.results
        ]
      })

      setTotalPageNo(res.data.total_pages)

    } catch (error) {
      console.log('error', error)
    }
  }


  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
      setPageNo(prev => prev + 1)
    }
  }


  useEffect(() => {
    fetchData()

  }, [pageNo])



  useEffect(() => {
    setPageNo(1)
    setData([])
    fetchData()
  }, [params.explore])




  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', window)
    }
  }, [])


  return (
    <div className='py-16 px-6'>
      <div className='container mx-auto px-3'>
        <h2 className='capitalize text-lg lg:text-2xl font-semibold my-3'>popular {params.explore} {params.explore === 'tv' && 'shows'}</h2>
{
          loading ?
          <>
            <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6' id='trend'>
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
            </div>
            <div className='container mx-auto px-3 my-10 h-[320px] w-full flex overflow-hidden gap-6' id='trend'>
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
              <Skeleton width={230} height={320} />
            </div>

          </>
            :
        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center lg:justify-start gap-3 w-full min-h-screen">
          {
              data.map((item, index) => (
                <Card data={item} key={item.id + 'explore' + index} media_type={params.explore} />
              ))
          }
        </div>}

      </div>
    </div>
  )
}

export default Explore