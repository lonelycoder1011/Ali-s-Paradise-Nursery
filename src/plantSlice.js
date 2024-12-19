import { createSlice } from "@reduxjs/toolkit";

export const plantSlice = createSlice({
  name: "plant",
  initialState: [
    {
      img: "/spider_plant.jpg",
      name: "Spider Plant",
      cost: 20,
      quantity: 0,
      inCart: false,
    },
    {
      img: "/snake_plant.jpg",
      name: "Snake Plant",
      cost: 16,
      quantity: 0,
      inCart: false,
    },
    {
      img: "/rubber_plant.jpg",
      name: "Rubber Plant",
      cost: 18,
      quantity: 0,
      inCart: false,
    },
    {
      img: "/peace_lilly.jpeg",
      name: "Peace Lilly",
      cost: 21,
      quantity: 0,
      inCart: false,
    },
    {
      img: "/boston_fern.jpg",
      name: "Boston's Fern",
      cost: 13,
      quantity: 0,
      inCart: false,
    },
    {
      img: "/aloe_vera.jpg",
      name: "Aloe Vera",
      cost: 17,
      quantity: 0,
      inCart: false,
    },
  ],
  reducers: {
    incrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index]) {
        state[index].quantity++;
        state[index].inCart = true; 
      }
    },
    decrementQuantity: (state, action) => {
      const { payload: index } = action;
      if (state[index] && state[index].quantity > 0) {
        state[index].quantity--;
        if (state[index].quantity === 0) {
          state[index].inCart = false;
        }
      }
    },
  },
});

export const { incrementQuantity, decrementQuantity } = plantSlice.actions;
export default plantSlice.reducer;
