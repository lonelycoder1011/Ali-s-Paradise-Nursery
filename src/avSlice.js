import { createSlice } from "@reduxjs/toolkit";

export const avSlice = createSlice({
    name: "av",
    initialState: [
        {
            img: "/hyacinth.jpg",
            name: "Hyacinth",
            cost: 6,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/mint.jpg",
            name: "Mint",
            cost: 4,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/rosemary.jpg",
            name: "Rosemary",
            cost: 10,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/jasmine.jpg",
            name: "Jasmine",
            cost: 12,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/lavender.jpg",
            name: "Lavender",
            cost: 12,
            quantity: 0,
            inCart: false,
        },
    ],
    reducers: {
        incrementAvQuantity: (state, action) => {
            const item = state[action.payload];
            if (item) {
                item.quantity++;
                item.inCart = true;
            }
        },
        decrementAvQuantity: (state, action) => {
            const item = state[action.payload];
            if (item && item.quantity > 0) {
                item.quantity--;
                if (item.quantity === 0) {
                    item.inCart = false;
                }
            }
        },
    },
});

// Export actions as named exports
export const { incrementAvQuantity, decrementAvQuantity } = avSlice.actions;

// Export the reducer as default
export default avSlice.reducer;
