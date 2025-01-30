import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    results: null,
    selectedImage: null,
};

 
const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        storeResults: (state, action) => {
            state.results = action.payload;
        },
        storeSelectedImage: (state, action) =>{
            state.selectedImage = action.payload;
        }
    }
});

export const { storeResults, storeSelectedImage } = resultsSlice.actions;
export default resultsSlice.reducer; 