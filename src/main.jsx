import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'
import axios from 'axios'
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { SkeletonTheme } from 'react-loading-skeleton'


// axios setup
axios.defaults.baseURL = "https://api.themoviedb.org/3"
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`




createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </SkeletonTheme>
  // </StrictMode>,
)
