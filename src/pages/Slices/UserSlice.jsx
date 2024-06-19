import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:{
        userName: '',
        userId: '',
        userProfilePhoto: '',
        userToken: ''
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserDetails(state, action){ //payload may be userId, userName, userToken, userProfilePhoto
            state.user.userId = action.payload.user;
            state.user.userName = action.payload.userName;
            state.user.userProfilePhoto = action.payload.userProfilePhoto;
            state.user.userToken = action.payload.userToken;
        },
        logoutUser(state){ 
            state.user = {
                userName: '',
                userId: '',
                userProfilePhoto: '',
                userToken: ''
            };
            console.log('User Logged Out');
        } 
    }
});

export const { updateUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;

export const getUserDetails = (state)=> state.user.user;