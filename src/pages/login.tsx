import { useRef } from "react";
import { Button, Input, Text, Box, Flex, Heading } from "@chakra-ui/react";
import { RootState, AppDispatch } from "../core/store/store";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../core/store/authSlice";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLock } from "react-icons/fa";
import { showLoading, hideLoading } from "../core/store/loadingSlice";
import { AuthService } from "../core/services/AuthService";
import { toaster } from "../components/ui/toaster";

export default function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { error } = useSelector((state: RootState) => state.auth);
	const loading = useSelector((state: RootState) => state.loading);

	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const handleSubmit = async () => {
		if (emailRef.current != null && passwordRef.current != null) {
			const email = emailRef.current.value;
			const password = passwordRef.current.value;

			try {
				// Show global loading indicator
				dispatch(showLoading());

				const result = await dispatch(
					signIn({ email, password })
				).unwrap();

				if (result) {
					navigate("/sharing");
				}
			} catch (error) {
				console.error("Login failed:", error);
				toaster.error({ title: "Login Failed", duration: 3000 });
				navigate("/auth/login");
			} finally {
				// Hide global loading indicator
				dispatch(hideLoading());
			}
		}
	};

	async function handleSocialLogin(provider: string) {
		switch (provider) {
			case "github": {
				await AuthService.signInWithProvider("github");
				break;
			}
			default:
				break;
		}
		// API call for social login (Facebook/Google)
	}

	function navigateRegister() {
		navigate("/auth/register");
	}

	function navigateRestore() {
		navigate("/auth/forgot-password");
	}

	return (
		<div className="bg-cyan-200 w-screen min-h-screen flex items-center justify-center">
			<Box
				className="min-h-screen flex items-center justify-center"
				bgGradient="linear(to-br, blue.50, white, purple.50)">
				<Flex
					direction="column"
					align="center"
					justify="center"
					w="100%"
					py={12}>
					<Box
						px={{ base: 4, md: 10 }}
						py={8}
						maxW="480px"
						w="100%"
						bg="white"
						boxShadow="xl"
						rounded="xl"
						borderTop="5px solid"
						borderColor="blue.500"
						position="relative"
						overflow="hidden"
						_before={{
							content: '""',
							position: "absolute",
							top: "-10px",
							right: "-10px",
							width: "100px",
							height: "100px",
							borderRadius: "full",
							background: "blue.50",
							zIndex: 0,
						}}
						_after={{
							content: '""',
							position: "absolute",
							bottom: "-50px",
							left: "-50px",
							width: "150px",
							height: "150px",
							borderRadius: "full",
							background: "purple.50",
							zIndex: 0,
						}}>
						<Box position="relative" zIndex={1}>
							<Heading
								as="h2"
								size="lg"
								textAlign="center"
								mb={6}
								bgGradient="linear(to-r, blue.400, purple.500)"
								bgClip="text"
								color="black"
								fontWeight="bold">
								Welcome Back
							</Heading>

							<form
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit();
								}}>
								<Box mb={5} position="relative">
									<Box
										position="absolute"
										left={3}
										top="12px"
										color="gray.500"
										zIndex={2}>
										<FaEnvelope />
									</Box>
									<Input
										type="text"
										name="username"
										placeholder="Email address"
										ref={emailRef}
										variant="outline"
										size="lg"
										bg="gray.50"
										pl={10}
										borderRadius="md"
										_focus={{
											bg: "white",
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500",
										}}
										_hover={{ bg: "gray.100" }}
										disabled={loading.isLoading}
									/>
								</Box>

								<Box mb={5} position="relative">
									<Box
										position="absolute"
										left={3}
										top="12px"
										color="gray.500"
										zIndex={2}>
										<FaLock />
									</Box>
									<Input
										type="password"
										name="password"
										placeholder="Password"
										ref={passwordRef}
										variant="outline"
										size="lg"
										bg="gray.50"
										pl={10}
										borderRadius="md"
										_focus={{
											bg: "white",
											borderColor: "blue.500",
											boxShadow: "0 0 0 1px blue.500",
										}}
										_hover={{ bg: "gray.100" }}
										disabled={loading.isLoading}
									/>
								</Box>

								{error && (
									<Text
										mb={4}
										color="red.500"
										fontSize="sm"
										fontWeight="medium"
										textAlign="center">
										{error}
									</Text>
								)}

								<button
									type="submit"
									onClick={handleSubmit}
									disabled={loading.isLoading}
									className="w-full min-w-[200px] py-3 mb-4 bg-blue-500 text-white rounded-md font-medium transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
									{loading.isLoading ? (
										<div className="flex items-center justify-center gap-2">
											<span>Signing In...</span>
										</div>
									) : (
										"Sign In"
									)}
								</button>

								<Button
									w="100%"
									variant="outline"
									onClick={navigateRegister}
									mb={2}
									size="lg"
									color="gray.600"
									_hover={{
										bg: "gray.50",
										color: "blue.500",
										borderColor: "blue.500",
									}}
									transition="all 0.3s ease"
									disabled={loading.isLoading}>
									Don't have an account? Sign up
								</Button>
							</form>
							<h4 className="text-center text-bold text-md">
								Or
							</h4>
							<div className="flex items-center justify-center mt-2">
								<Button
									onClick={() => handleSocialLogin("github")}>
									<FaGithub />
									Github
								</Button>
							</div>

							<Text
								fontSize="sm"
								color="gray.500"
								textAlign="center"
								mt={6}>
								<Text
									as="span"
									color="blue.500"
									fontWeight="medium"
									cursor="pointer"
									onClick={navigateRestore}>
									Forgot your password?
								</Text>
							</Text>
						</Box>
					</Box>
				</Flex>
			</Box>
		</div>
	);
}
