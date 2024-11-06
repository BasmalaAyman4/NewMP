import { createSlice,current } from "@reduxjs/toolkit";
const initialState = {
    cartItems:[],
    totalAmount: 0,
    totalQuantity: 0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.itemCode === newItem.itemCode && item.itemColor === newItem.itemColor  && item.itemSize === newItem.itemSize
            );
            state.totalQuantity++
             if (!existingItem) { 
                state.cartItems.push({
                    itemCode: newItem.itemCode,
                    itemColor: newItem.itemColor,
                    itemSize: newItem.itemSize,
                    quantity: newItem.quantity,
                    price: Number(newItem.price),
                    img:newItem.img,
                    totalPrice:(Number(newItem.price))*newItem.quantity,
                    itemName:newItem.itemName,
              colorName:newItem.colorName,
              size:newItem.size,
              qty:newItem.qty,
              barCode:newItem.barCode
                })
                
             }
             else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.price)
            } 
            state.totalAmount = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0)
         
        },
        deleteItem: (state, action) => {
            const barCode= action.payload
            const existingItem = state.cartItems.find(item => item.barCode == barCode)
            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.barCode != barCode)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }
            state.totalAmount = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0)
        },
        resetCart: (state) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
        },
      
        reduceItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.itemCode === id);

            if (existingItem) {
                if (existingItem.quantity > 1) {
                    existingItem.quantity--;
                    existingItem.totalPrice -= Number(existingItem.price);
                    state.totalQuantity--;
                }
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0);
        },
        plusItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find(item => item.itemCode === id);

            if (existingItem) {

                existingItem.quantity++;
                existingItem.totalPrice += Number(existingItem.price);
                state.totalQuantity++;

            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity), 0);
        } 
    },



});
export const cartActions = cartSlice.actions
export default cartSlice.reducer