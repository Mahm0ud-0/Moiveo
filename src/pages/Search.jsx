import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Card from '../components/Card'

function Search() {


  const location = useLocation()
  const [data, setData] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const navigate = useNavigate()


  const query = location?.search?.slice(3)


  const fetchData = async () => {
    try {

      // search multi "movies & TV & actors"
      const res = await axios.get(`/search/multi`, {
        params: {
          query: query,
          page: pageNo
        }
      })

      setData(() => {
        return [
          ...res.data.results
        ]
      })


    } catch (error) {
      console.log('error', error)
    }
  }


  useEffect(() => {
    if (query) {
      setPageNo(1)
      setData([])
      fetchData()
    }
  }, [location.search])



  const handleScroll = () => {
    if ((window.innerHeight + window.scrollY) > document.body.offsetHeight) {
      setPageNo(prev => prev + 1)
    }
  }



  useEffect(() => {

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', window)
    }
  }, [])


  useEffect(() => {
    if (query) {
      fetchData()
    }
  }, [pageNo])





  return (

    
    <div className='pt-16'>

      {/* mobiel search */}
      <div className='lg:hidden my-2 mx-2 sticky top-[72px] z-10'>

        <input type="text" placeholder='Search here...'
          onChange={(e) => navigate(`/search?q=${e.target.value}`)}
          value={query.split('%20')?.join(' ')}
          className='px-4 py-1.5 text-lg w-full bg-white rounded-full text-neutral-900 border-none outline-none'
        />

      </div>


      { query ?
      <div className='container mx-auto px-3'>
        <h2 className='capitalize text-xl lg:text-2xl font-semibold my-3'>Search Results</h2>


        <div className="grid grid-cols-[repeat(auto-fit,230px)] justify-center lg:justify-start gap-5">
          {
            data.map((item, index) => (
              <Card data={item} key={item.id + 'search' + index} media_type={item.media_type} />
            ))
          }
        </div>


      </div> 
      :
      <div className="container w-full mx-auto flex justify-center mt-40 text-xl">Search Movies & TV Shows</div>
      }

    </div>
  )
}

export default Search