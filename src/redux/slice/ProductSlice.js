import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    products: [],
    category: "",
}
export const ProductSlice = createSlice({
    name: 'ProductList',
    initialState,
    reducers: {
        updateProductList: (state, action) => {
            state.products = action.payload.product
        },
        setProductCategory: (state, action) => {
            state.category = action.payload.category;
        },
    }
})


export const {
    updateProductList,
    setProductCategory
} = ProductSlice.actions

export default ProductSlice.reducer