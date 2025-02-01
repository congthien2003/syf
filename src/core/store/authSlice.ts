/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../../utils/supabase";

// Định nghĩa kiểu dữ liệu
interface AuthState {
	user: any; // Có thể thay bằng kiểu User cụ thể
	session: any;
	loading: boolean;
	error: string | null;
}

// Trạng thái mặc định
const initialState: AuthState = {
	user: null,
	session: null,
	loading: false,
	error: null,
};

// Action đăng nhập với password
export const signIn = createAsyncThunk(
	"auth/signIn",
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) return rejectWithValue(error.message);
		return data;
	}
);

// Action lấy session hiện tại
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
	const { data } = await supabase.auth.getSession();
	return data;
});

// Slice quản lý auth
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		signOut: (state) => {
			state.user = null;
			state.session = null;
			state.error = null;
			state.loading = false;
		},
	}, // Nếu cần reducer thường thì thêm vào đây
	extraReducers: (builder) => {
		builder
			.addCase(signIn.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.user = action.payload.user;
				state.session = action.payload.session;
			})
			.addCase(signIn.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(
				fetchSession.fulfilled,
				(state, action: PayloadAction<any>) => {
					state.user = action.payload.user;
					state.session = action.payload.session;
				}
			)
			.addCase(signOut.type, (state) => {
				state.user = null;
				state.session = null;
			});
	},
});

// Export các action và reducer
export const { signOut } = authSlice.actions;

export default authSlice.reducer;
