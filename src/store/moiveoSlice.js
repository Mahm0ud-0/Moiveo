import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    bannerData: [],
    imgURL: ''
}

export const moiveoSlice = createSlice({
    name: "moiveo",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload
        },
        setImgURL: (state, action) => {
            state.imgURL = action.payload
        }
    },
})

export const { setBannerData, setImgURL } = moiveoSlice.actions



export default moiveoSlice.reducer