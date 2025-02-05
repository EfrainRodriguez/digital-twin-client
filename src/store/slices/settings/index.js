import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    themeMode: 'dark'
  },
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    }
  }
});

export const { setThemeMode } = settingsSlice.actions;

export default settingsSlice.reducer;
