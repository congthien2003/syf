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
	user: localStorage.getItem("authUser") || "",
	session: JSON.parse(localStorage.getItem("supabaseSession")!) || null,
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

		// Lưu thông tin user vào localStorage
		localStorage.setItem("supabaseSession", JSON.stringify(data.session));
		return data;
	}
);

// Action lấy session hiện tại
export const fetchSession = createAsyncThunk("auth/fetchSession", async () => {
	const { data } = await supabase.auth.getSession();
	return data;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
	await supabase.auth.signOut();
	console.log("Logout");
	localStorage.removeItem("supabaseSession");
});

// Slice quản lý auth
const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
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
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
				state.session = null;
			});
	},
});

// Export các action và reducer
export const { setUser } = authSlice.actions;

export default authSlice.reducer;
