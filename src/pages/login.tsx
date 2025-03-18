import { useRef } from "react";
import { Button, Input, Text } from "@chakra-ui/react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { RootState, AppDispatch } from "../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../core/store/authSlice";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error } = useSelector((state: RootState) => state.auth);

	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const handleSubmit = async () => {
		if (emailRef.current != null && passwordRef.current != null) {
			const email = emailRef.current.value;
			const password = passwordRef.current.value;
			dispatch(signIn({ email, password }))
				.unwrap()
				.then(() => {
					navigate("/sharing");
				})
				.catch(() => {
					navigate("/auth/login");
				});
		}
	};

	function handleSocialLogin(provider: string) {
		console.log(`Login with ${provider}`);
		// API call for social login (Facebook/Google)
	}

	return (
		<>
			<div className="flex flex-col h-screen min-h-screen items-center justify-center">
				<div className="max-w-[450px] shadow-lg p-8 rounded-md">
					<h4 className="text-center text-lg font-bold mb-4">
						Login
					</h4>

					<form onSubmit={handleSubmit} className="px-2">
						<Input
							type="text"
							name="username"
							placeholder="Username"
							ref={emailRef}
							mb={4}
						/>
						<Input
							type="password"
							name="password"
							placeholder="Password"
							ref={passwordRef}
							mb={6}
						/>
						{error && (
							<Text mb={4} color="red.500">
								{error}
							</Text>
						)}

						<Button
							w="100%"
							onClick={handleSubmit}
							mb={2}
							disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</Button>

						<Button
							w="100%"
							variant="outline"
							onClick={handleSubmit}
							mb={6}>
							Register
						</Button>
					</form>

					<div className="flex justify-center items-center">
						<Text mx={4} color="gray.500">
							OR
						</Text>
					</div>

					<div className="flex gap-4 justify-center items-center mt-4">
						<Button
							w="30%"
							colorScheme="facebook"
							onClick={() => handleSocialLogin("Facebook")}>
							<FaFacebook />
							Facebook
						</Button>
						<Button
							w="30%"
							colorScheme="red"
							onClick={() => handleSocialLogin("Google")}>
							<FaGoogle /> Google
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
