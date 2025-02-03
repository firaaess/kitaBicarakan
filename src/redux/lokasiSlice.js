import { createSlice } from "@reduxjs/toolkit";

const lokasiSlice = createSlice({
    name: 'lokasi',
    initialState:{
        lokasi: []
    }, reducers :{
        setLokasi: (state, action) => {
            state.lokasi = action.payload;
        }
    }
})
export const {setLokasi} = lokasiSlice.actions
export default lokasiSlice.reducer