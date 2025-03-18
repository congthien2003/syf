import { Input, Button } from "@chakra-ui/react";
import { useState, useRef, useCallback } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { AuthService } from "../core/services/AuthService";

export default function RegisterPage() {
	// Dùng useRef thay vì useState để tránh re-render khi nhập liệu
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

	const [loading, setLoading] = useState(false);

	const handleSubmit = useCallback(async () => {
		setLoading(true);
		try {
			const email = emailRef.current?.value || "";
			const password = passwordRef.current?.value || "";
			console.log("Email:", email);
			console.log("Password:", password);
			const data = await AuthService.signUp(email, password);
			console.log("Sign Up Successful:", data);
		} catch (error) {
			console.error("Sign Up Error:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<div className="flex flex-col h-screen min-h-screen items-center justify-center">
			<div className="max-w-[450px] shadow-lg p-8 rounded-md">
				<h4 className="text-center text-lg font-bold mb-6">Register</h4>
				<form onSubmit={(e) => e.preventDefault()}>
					<Input
						type="email"
						placeholder="Email"
						ref={emailRef}
						mb={4}
					/>
					<Input
						type="password"
						placeholder="Password"
						ref={passwordRef}
						mb={4}
					/>
					<Input
						type="password"
						placeholder="Confirm Password"
						ref={confirmPasswordRef}
						mb={6}
					/>
					<Button w="100%" onClick={handleSubmit} mb={4}>
						{loading ? "Loading..." : "Register"}
					</Button>
				</form>

				<div className="flex justify-center items-center">
					<span>OR</span>
				</div>

				<div className="flex gap-4 justify-center items-center mt-4">
					<Button w="30%" colorScheme="facebook">
						<FaFacebook />
						Facebook
					</Button>
					<Button w="30%" colorScheme="red">
						<FaGoogle /> Google
					</Button>
				</div>
			</div>
		</div>
	);
}
