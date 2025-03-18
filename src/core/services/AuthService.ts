import supabase from "../../utils/supabase";
export class AuthService {
	static async signUp(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) throw error;
		return data.user;
	}

	// Đăng nhập người dùng
	static async signIn(email: string, password: string) {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) throw error;
		return data.user;
	}

	// Đăng nhập với OAuth (Google, GitHub,...)
	static async signInWithProvider(provider: "google" | "github") {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider,
		});
		if (error) throw error;
		return data;
	}

	// Đăng xuất
	static async signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		return true;
	}

	// Lấy thông tin người dùng hiện tại
	static async getUser() {
		const { data } = await supabase.auth.getUser();
		return data.user;
	}

	static async getSessions() {
		const { data } = await supabase.auth.getSession();
		return data ?? null;
	}

	static async getSessionsByLocalStorage() {
		const session = localStorage.getItem("supabase_session");
		if (!session) return null;
		return JSON.parse(session);
	}
}
