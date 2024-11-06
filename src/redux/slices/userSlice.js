import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser, logoutUser } from 'src/api/users'


const stateIntite = { 
    user: {}, 
    error: null, 
    loading: false,
    isAuth: false ,
    isError: false,
}

export const login = createAsyncThunk(
    'user/loginStatus',
    async (userInfo, thunkAPI) => {
      const response = await loginUser(userInfo)
      return response.data
    }
)

const usersSlice = createSlice({
    name: 'user',
    initialState: stateIntite,
    reducers: {
        async logout(state,action){
            const response = await logoutUser()
            state = stateIntite
            localStorage.clear()
            console.log("logout :::",response)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.isAuth = false
            state.isError = false
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isAuth = true
            state.loading = false
            state.user = action.payload
            localStorage.setItem("accessToken", action.payload?.access)
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isAuth = false
            state.loading = false
            state.isError = true
            state.user = {}
            state.error = action.payload
        })
    },
  })


export const { logout } = usersSlice.actions

export default usersSlice?.reducer