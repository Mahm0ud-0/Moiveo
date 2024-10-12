import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNav from './components/MobileNav'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerData, setImgURL } from './store/moiveoSlice'

function App() {

  const dispatch = useDispatch()

  const [trendingLoading, setTrendingLoading] = useState(true)
  

  const fetchTrending = async () => {

    try {

      setTrendingLoading(true)
      const res = await axios.get('/trending/all/week')
      setTrendingLoading(false)

      dispatch(setBannerData(res.data.results))

    } catch (error) {
      console.log('error', error)
    }
  }



  const fetchConfig = async () => {

    try {

      const res = await axios.get('/configuration')

      dispatch(setImgURL(res.data.images.secure_base_url + 'original'))

    } catch (error) {
      console.log('error', error)
    }
  }


  useEffect(() => {
    fetchTrending()
    fetchConfig()
  }, [])

  

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className='min-h-screen'>
        <Outlet context={[trendingLoading]}/>
      </div>
      <Footer />
      <MobileNav />
    </main>
  )
}

export default App
