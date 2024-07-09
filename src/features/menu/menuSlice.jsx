import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenu: 'home',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = menuSlice.actions;
export const selectActiveMenu = (state) => state.menu.activeMenu;
export default menuSlice.reducer;