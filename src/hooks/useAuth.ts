import { useDispatch } from "react-redux";
import { AppDispatch } from "../core/store/store";
import { logoutUser } from "../core/store/authSlice";

export function useAuth() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dispatch = useDispatch<AppDispatch>();
	const session = JSON.parse(localStorage.getItem("supabaseSession") || "");

	if (session) {
		const now = Math.floor(Date.now() / 1000); // Giây
		if (session.expires_at < now) {
			// Xử lý logout hoặc refresh
			localStorage.removeItem("supabaseSession");
			dispatch(logoutUser());
			return null;
		} else {
			return session.user;
		}
	} else {
		return null;
	}
}
