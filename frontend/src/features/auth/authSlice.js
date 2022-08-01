import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//2. Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));

//1.Create initial state
const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// 5. Register user
export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login user (from service and pass to extra reducer)
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Create a logout function and pass in a header
export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
});

//3.Create auth slice for reducers
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        //4. Regular reducer to be able to dispatch after register
        reset: state => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    //6. Create extra reducer for pending fullfield and rejected and pass in register form
    extraReducers: builder => {
        builder

            // Case for register
            .addCase(register.pending, state => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                //message from ----> thunkAPI.rejectWithValue(message);
                state.message = action.payload;
                state.user = null;
            })

            // Case for login (pass in login page)
            .addCase(login.pending, state => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })

            // Case for logout
            .addCase(logout.fulfilled, state => {
                state.user = null;
            });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
