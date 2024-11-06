import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './slices/userSlice'
import userInfoSlice from './slices/userInfoSlice';


export const store = configureStore({
  reducer: {
    loginUser: userSliceReducer,
    userInfo: userInfoSlice,
  },
});