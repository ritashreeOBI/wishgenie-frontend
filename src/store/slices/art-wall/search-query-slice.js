const { createSlice } = require("@reduxjs/toolkit")


const initialState = {
    query:'',
    category:''
}

const searchQuerySlice = createSlice({
    initialState,
    name:'searchQuery',
    reducers:{
        setSearchQuery: (state , {payload}) =>{
            state.query = payload
        }
    }
})

export const { setSearchQuery} = searchQuerySlice.actions;

export default searchQuerySlice.reducer

