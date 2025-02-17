import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

export function useAuth() {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [user, setUser] = useState<any>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuth = async () => {
			const { data, error } = await supabase.auth.getUser();
			if (error || !data.user) {
				navigate("/auth/login"); // Chuyển hướng nếu chưa đăng nhập
			} else {
				setUser(data.user);
			}
		};

		checkAuth();
	}, [navigate]);

	return user; // Trả về user nếu cần sử dụng trong component
}
