import { createSlice } from "@reduxjs/toolkit";

export const sectionthreeSlice = createSlice({
    name: "sectionthree",
    initialState: [
        {
            img: "/dahlias.jpg",
            name: "Dahlias",
            cost: 7,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/scarlet_gilia.jpg",
            name: "Scarlet Gilia",
            cost: 14,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/sunflower.jpg",
            name: "Sunflower",
            cost: 5,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/hibiscus.jpg",
            name: "Hibiscus",
            cost: 18,
            quantity: 0,
            inCart: false,
        },
        {
            img: "/bougainvillea.jpg",
            name: "Bougainvillea",
            cost: 9,
            quantity: 0,
            inCart: false,
        },
    ],
    reducers: {
        incrementsectionthreeQuantity: (state, action) => {
            const item = state[action.payload];
            if (item) {
                item.quantity++;
                item.inCart = true;
            }
        },
        decrementsectionthreeQuantity: (state, action) => {
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
export const { incrementsectionthreeQuantity, decrementsectionthreeQuantity } = sectionthreeSlice.actions;

// Export the reducer as default
export default sectionthreeSlice.reducer;
