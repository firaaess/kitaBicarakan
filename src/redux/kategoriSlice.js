import { createSlice } from "@reduxjs/toolkit";

const kategoriSlice = createSlice({
    name: 'kategori',
    initialState:{
        kategori: []
    }, reducers :{
        setKategori: (state, action) => {
            state.kategori = action.payload;
        }
    }
})
export const {setKategori} = kategoriSlice.actions
export default kategoriSlice.reducer