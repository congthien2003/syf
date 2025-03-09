import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logoutUser } from "../core/store/authSlice";
import supabase from "../utils/supabase";
import { AppDispatch } from "../core/store/store";

const AuthProvider = () => {
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const restoreSession = async () => {
			const { data: sessionData } = await supabase.auth.getSession();
			if (sessionData?.session) {
				dispatch(setUser(sessionData.session.user));
				console.log("restore session " + sessionData.session.user);

				localStorage.setItem(
					"supabaseSession",
					JSON.stringify(sessionData.session)
				);
			}
		};

		restoreSession();

		// Lắng nghe thay đổi session
		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (event, session) => {
				if (session) {
					dispatch(setUser(session.user));
					localStorage.setItem(
						"supabaseSession",
						JSON.stringify(session)
					);
				} else {
					dispatch(logoutUser());
				}
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, [dispatch]);

	return null;
};

export default AuthProvider;
