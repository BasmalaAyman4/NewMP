import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    favItem: [],
    totalAmount: 0,
}
const favSlice = createSlice({
    name: 'fav',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.favItem.find(
                (item) => item.itemCode === newItem.itemCode
            );
            state.totalQuantity++
            if (!existingItem) {
                state.favItem.push({
                    itemCode: newItem.itemCode,
                    itemName: newItem.itemName,
                    image: newItem.image,
                    price: newItem.price,
                })
            }
            else {
                localStorage.setItem('fav', true)
            }
            state.totalAmount = state.favItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0)
        },
        deleteItem: (state, action) => {
            const id = action.payload
            const existingItem = state.favItem.find(item => item.itemCode === id)
            if (existingItem) {
                state.favItem = state.favItem.filter(item => item.itemCode !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
                localStorage.setItem('fav', false)

            }
            state.totalAmount = state.favItem.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0)
        },


    },



});
export const favAction = favSlice.actions
export default favSlice.reducer