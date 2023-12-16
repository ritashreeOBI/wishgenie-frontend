import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    variantId:0,
    templateTypes:{},
    templates:[],
    templateVariants:[],
    selectedType:'',
    selectedVaraintDetails:{},
    pending:false,
    printTechnique:'',
    mainProduct:{}
}

const templateSlice = createSlice({
    name:'templateSlice',
    initialState,
    reducers:{
        mainProductSetter(state , action){
        state.mainProduct = action.payload
        },
        variantIdSetter( state , action){
           state.variantId = action.payload
        },
        templateSetter(state , action){
             state.templateTypes = action.payload
        },
        templatesSetter(state , action){
            state.templates = action.payload
        },
        varaintsSetter(state , action){
            state.templateVariants = action.payload
        },
        loadingState(state, action){
        state.pending = action.payload
        },
        setAreaType(state, {payload}){
          state.selectedType = payload
        },
        setSelectedVariantDetail(state, {payload}){
            state.selectedVaraintDetails = payload
        },
        setPrintTechnique(state , {payload}){
            state.printTechnique = payload
        }
    }

    
})


export const {variantIdSetter,loadingState , mainProductSetter,setAreaType,setSelectedVariantDetail,setPrintTechnique,  templateSetter,templatesSetter,varaintsSetter} = templateSlice.actions
export default templateSlice.reducer;