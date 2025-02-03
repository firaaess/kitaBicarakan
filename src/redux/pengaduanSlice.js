import { createSlice } from "@reduxjs/toolkit";

const pengaduanSlice = createSlice({
    name: 'pengaduan',
    initialState: {
        pengaduan:[],
        pengaduanUser:[],
        pengaduanById:[]
    },
    reducers:{
        setPengaduanUser:(state, action) => {
            state.pengaduanUser = action.payload
        },
        setPengaduan:(state, action) => {
            state.pengaduan = action.payload
        },
        setPengaduanById:(state, action) => {
            state.pengaduanById = action.payload
        },
        // Aksi untuk reset pengaduan
    resetPengaduanUser: (state) => {
        state.pengaduanUser = [];
      }
    }
})

export const {setPengaduan, setPengaduanUser,setPengaduanById, resetPengaduanUser} = pengaduanSlice.actions
export default pengaduanSlice.reducer