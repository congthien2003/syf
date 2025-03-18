import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../core/store/store";
import { logoutUser, setUser } from "../core/store/authSlice";

export function useAuth() {
	const dispatch = useDispatch<AppDispatch>();
	const user = useSelector((state: RootState) => state.auth.user);

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = () => {
		try {
			const token = localStorage.getItem("supabaseSession");

			if (!token) {
				dispatch(logoutUser());
				return null;
			}

			const session = JSON.parse(token);
			const now = Math.floor(Date.now() / 1000);

			// Check token expiration
			if (session.expires_at < now) {
				localStorage.removeItem("supabaseSession");
				dispatch(logoutUser());
				return null;
			}

			// If token is valid but user state is empty, update it
			if (!user && session.user) {
				dispatch(setUser(session));
			}

			return session.user;
		} catch (error) {
			console.error("Auth check failed:", error);
			localStorage.removeItem("supabaseSession");
			dispatch(logoutUser());
			return null;
		}
	};

	return user;
}
