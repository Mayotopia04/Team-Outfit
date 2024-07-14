import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    mode: 'light',
}


export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, _actions) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            // console.log(state.mode);
        }
    }
});

export const themeSliceReducer = themeSlice.reducer;
export const { changeTheme } = themeSlice.actions;

