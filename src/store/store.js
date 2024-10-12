import { configureStore } from '@reduxjs/toolkit'
import moiveoReducer from './moiveoSlice'


export const store = configureStore({
  reducer: {
    moiveoData: moiveoReducer
  },
})