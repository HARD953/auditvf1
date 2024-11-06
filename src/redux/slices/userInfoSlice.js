import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers:{
        putUserInfo: (state,action)=>{
            state.data = action.payload;
        },
        deleteUserInfo : (state)=>{
            state.data = null;
        }
    }
})

export const { putUserInfo , deleteUserInfo} = userInfoSlice.actions;
export default userInfoSlice.reducer