import { createSlice } from "@reduxjs/toolkit";
import { info } from "console";

const initialState : {files: any , recipentInfo:any} = {
    files:[],
    recipentInfo :{
        "name": "Yash Purohit",
        "address1": "19749 Dearborn St",
        "city": "Chatsworth",
        "state_code": "CA",
        "state_name": "California",
        "country_code": "US",
        "country_name": "United States",
        "zip": "91311",
        "email": "yash@onebillionideas.io"
    }
    

}

const orderSlice = createSlice({
    name:'Order Info',
    initialState,
    reducers:{
       
        uploadedImages(state , {payload }){
             state.files = [...state.files , payload]
        },
        updateRecipentInfo(state , {payload }){
            state.recipentInfo = payload
       },
    }

})

export const {uploadedImages , updateRecipentInfo} = orderSlice.actions;

export default  orderSlice.reducer ;