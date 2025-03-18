import {
	Input,
	Button,
	useDisclosure,
	Text,
	Center,
	Box,
	Flex,
	Heading,
} from "@chakra-ui/react";

import {
	DialogRoot,
	DialogContent,
	DialogTitle,
	DialogBody,
	DialogBackdrop,
} from "../components/ui/dialog";
import { useState, useRef, useCallback } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AuthService } from "../core/services/AuthService";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster";

export default function RegisterPage() {
	// Dùng useRef thay vì useState để tránh re-render khi nhập liệu
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(null);

	const [loading, setLoading] = useState(false);
	const { open, onOpen, onClose } = useDisclosure();
	const [registeredEmail, setRegisteredEmail] = useState("");

	const navigate = useNavigate();

	const handleSubmit = useCallback(async () => {
		setLoading(true);
		try {
			const email = emailRef.current?.value || "";
			const password = passwordRef.current?.value || "";

			const data = await AuthService.signUp(email, password);

			if (data) {
				setRegisteredEmail(email);
				toaster.success({
					title: "Registration initiated",
					duration: 3000,
				});
				onOpen(); // Open the confirmation dialog
			}
			onOpen();
		} catch (error) {
			console.error("Sign Up Error:", error);
			toaster.error({
				title: "Registration failed!",
				duration: 3000,
			});
		} finally {
			setLoading(false);
		}
	}, [onOpen]);

	const handleGoToLogin = () => {
		onClose();
		navigate("/auth/login");
	};

	function navigateLogin() {
		navigate("/auth/login");
	}

	return (
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
							fontWeight="bold"
							color="black">
							Create Account
						</Heading>

						<form onSubmit={(e) => e.preventDefault()}>
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
									type="email"
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
								/>
							</Box>

							<Box mb={6} position="relative">
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
									placeholder="Confirm Password"
									ref={confirmPasswordRef}
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
								/>
							</Box>

							<Button
								w="100%"
								onClick={handleSubmit}
								mb={4}
								size="lg"
								bg="blue.500"
								color="white"
								_hover={{
									bg: "blue.600",
									transform: "translateY(-2px)",
									boxShadow: "lg",
								}}
								_active={{
									bg: "blue.700",
								}}
								position="relative"
								overflow="hidden"
								transition="all 0.3s ease"
								disabled={loading}>
								{loading ? "Creating Account..." : "Sign Up"}
							</Button>

							<Button
								w="100%"
								variant="outline"
								onClick={navigateLogin}
								mb={2}
								disabled={loading}
								size="lg"
								color="gray.600"
								_hover={{
									bg: "gray.50",
									color: "blue.500",
									borderColor: "blue.500",
								}}
								transition="all 0.3s ease">
								Already have an account? Log in
							</Button>
						</form>

						<Text
							fontSize="sm"
							color="gray.500"
							textAlign="center"
							mt={6}>
							By creating an account, you agree to our
							<Text
								as="span"
								color="blue.500"
								fontWeight="medium"
								mx={1}>
								Terms of Service
							</Text>
							and
							<Text
								as="span"
								color="blue.500"
								fontWeight="medium"
								mx={1}>
								Privacy Policy
							</Text>
						</Text>
					</Box>
				</Box>
			</Flex>

			{/* Confirmation Dialog */}
			<DialogRoot open={open} onOpenChange={onClose}>
				<DialogBackdrop
					style={{
						backgroundColor: "rgba(0, 0, 0, 0.4)",
						backdropFilter: "blur(8px)",
					}}
				/>
				<DialogContent
					style={{
						borderRadius: "1rem",
						backgroundColor: "white",
						boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
						maxWidth: "450px",
						overflow: "hidden",
						margin: "2rem",
						position: "relative",
					}}>
					<Box
						position="absolute"
						top={0}
						left={0}
						right={0}
						height="6px"
						bgGradient="linear(to-r, blue.400, purple.500)"
					/>

					<DialogTitle
						style={{
							textAlign: "center",
							fontSize: "1.5rem",
							fontWeight: "bold",
							paddingTop: "2rem",
							paddingBottom: "1rem",
							paddingLeft: "1.5rem",
							paddingRight: "1.5rem",
							color: "#2D3748",
						}}>
						Email Verification Required
					</DialogTitle>

					<DialogBody px={8}>
						<Center flexDirection="column" py={6}>
							<Box
								bg="blue.50"
								p={5}
								borderRadius="full"
								color="blue.500"
								fontSize="3xl"
								mb={6}
								boxShadow="0 0 0 8px rgba(66, 153, 225, 0.08)"
								transform="scale(1)"
								_hover={{ transform: "scale(1.05)" }}
								transition="transform 0.3s ease">
								<FaEnvelope />
							</Box>

							<Text
								textAlign="center"
								mb={3}
								color="gray.700"
								fontSize="md">
								We've sent a verification email to:
							</Text>

							<Text
								fontWeight="bold"
								mb={5}
								color="gray.900"
								fontSize="lg"
								p={3}
								bg="gray.50"
								borderRadius="md"
								w="100%"
								textAlign="center"
								letterSpacing="0.02em">
								{registeredEmail}
							</Text>

							<Box
								bg="blue.50"
								p={4}
								borderRadius="md"
								borderLeft="4px solid"
								borderColor="blue.400"
								w="100%">
								<Text
									textAlign="left"
									fontSize="sm"
									color="gray.700"
									lineHeight="1.7">
									Please check your inbox and click the
									verification link to complete your
									registration. The link will expire in{" "}
									<b>24 hours</b>.
								</Text>
							</Box>
						</Center>

						<Box
							display="flex"
							flexDirection="column"
							gap="0.75rem"
							paddingBottom="2rem"
							paddingX="2rem"
							backgroundColor="gray.50"
							borderTop="1px solid"
							borderColor="gray.100"
							marginTop="1rem"
							paddingTop="1.5rem">
							<Button
								colorScheme="blue"
								width="full"
								onClick={handleGoToLogin}
								size="lg"
								borderRadius="lg"
								fontWeight="bold"
								py={6}
								bgGradient="linear(to-r, blue.400, purple.500)"
								_hover={{
									bgGradient:
										"linear(to-r, blue.500, purple.600)",
									transform: "translateY(-2px)",
									boxShadow: "lg",
								}}
								transition="all 0.3s ease">
								Go to Login
							</Button>

							<Button
								variant="ghost"
								width="full"
								onClick={onClose}
								mt={1}
								color="gray.500"
								_hover={{
									bg: "gray.100",
									color: "gray.700",
								}}
								transition="all 0.3s ease">
								Close this window
							</Button>
						</Box>
					</DialogBody>
				</DialogContent>
			</DialogRoot>
		</Box>
	);
}
