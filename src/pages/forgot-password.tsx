import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { showLoading, hideLoading } from "../core/store/loadingSlice";
import { AuthService } from "../core/services/AuthService";
import { toaster } from "../components/ui/toaster";
import { RootState, AppDispatch } from "../core/store/store";

export default function ForgotPassword() {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const { error } = useSelector((state: RootState) => state.auth);
	const loading = useSelector((state: RootState) => state.loading);

	const [email, setEmail] = useState("");
	const [isSendOtp, setIsSendOtp] = useState(false);
	const [otp, setOtp] = useState("");
	const [isVerified, setIsVerified] = useState(false);
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Form validation states
	const [errors, setErrors] = useState({
		email: "",
		otp: "",
		newPassword: "",
		confirmPassword: "",
	});

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email) {
			return "Email is required";
		}
		if (!emailRegex.test(email)) {
			return "Invalid email format";
		}
		return "";
	};

	const validatePassword = (password: string) => {
		if (!password) {
			return "Password is required";
		}
		if (password.length < 6) {
			return "Password must be at least 6 characters";
		}
		return "";
	};

	const handleSubmit = async () => {
		const emailError = validateEmail(email);
		setErrors((prev) => ({ ...prev, email: emailError }));

		if (emailError) {
			return;
		}

		try {
			dispatch(showLoading());
			await AuthService.forgotPassword(email);
			toaster.success({
				title: "OTP has been sent!",
				duration: 3000,
			});
			setIsSendOtp(true);
		} catch (error) {
			console.error("Submit failed:", error);
			toaster.error({
				title: "Can't send OTP",
				duration: 3000,
			});
			setIsSendOtp(false);
		} finally {
			dispatch(hideLoading());
		}
	};

	const handleSubmitOtp = async () => {
		if (!otp) {
			setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
			return;
		}

		try {
			dispatch(showLoading());
			await AuthService.verifyOPTwithEmail(email, otp);
			setIsVerified(true);
			setErrors((prev) => ({ ...prev, otp: "" }));
			toaster.success({
				title: "OTP verified successfully!",
				duration: 3000,
			});
		} catch (error) {
			console.error("OTP verification failed:", error);
			toaster.error({
				title: "Invalid OTP",
				duration: 3000,
			});
		} finally {
			dispatch(hideLoading());
		}
	};

	const handleUpdatePassword = async () => {
		const passwordError = validatePassword(newPassword);
		const confirmError = !confirmPassword
			? "Confirm password is required"
			: newPassword !== confirmPassword
			? "Passwords do not match"
			: "";

		setErrors((prev) => ({
			...prev,
			newPassword: passwordError,
			confirmPassword: confirmError,
		}));

		if (passwordError || confirmError) {
			return;
		}

		try {
			dispatch(showLoading());
			await AuthService.updatePassword(newPassword);
			toaster.success({
				title: "Password updated successfully!",
				duration: 3000,
			});
			navigate("/auth/login");
		} catch (error) {
			console.error("Password update failed:", error);
			toaster.error({
				title: "Failed to update password",
				duration: 3000,
			});
		} finally {
			dispatch(hideLoading());
		}
	};

	function navigateRegister() {
		navigate("/auth/register");
	}

	function navigateLogin() {
		navigate("/auth/login");
	}

	return (
		<div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
			<div className="w-full max-w-[480px] p-8 mx-4">
				<div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
					{/* Border top accent */}
					<div className="h-1 w-full bg-blue-500" />

					<div className="relative z-10 p-6 md:p-8">
						<h2 className="text-2xl font-bold text-center mb-6 text-gradient">
							Reset Password
						</h2>

						<form className="space-y-4">
							{/* Email Input */}
							<div className="space-y-1">
								<div className="flex items-center gap-3">
									<FaEnvelope className="text-gray-400" />
									<div className="flex-1">
										<input
											type="email"
											value={email}
											onChange={(e) => {
												setEmail(e.target.value);
												setErrors((prev) => ({
													...prev,
													email: "",
												}));
											}}
											placeholder="Email Address"
											disabled={
												isSendOtp || loading.isLoading
											}
											className={`w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
												${errors.email ? "border-red-500" : "border-gray-300"}`}
										/>
										{errors.email && (
											<p className="mt-1 text-sm text-red-500">
												{errors.email}
											</p>
										)}
									</div>
								</div>
							</div>

							{/* OTP Input */}
							{isSendOtp && (
								<div className="space-y-1">
									<div className="flex items-center gap-3">
										<FaLock className="text-gray-400" />
										<div className="flex-1">
											<input
												type="text"
												value={otp}
												onChange={(e) => {
													setOtp(e.target.value);
													setErrors((prev) => ({
														...prev,
														otp: "",
													}));
												}}
												placeholder="OTP"
												disabled={
													isVerified ||
													loading.isLoading
												}
												className={`w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
													${errors.otp ? "border-red-500" : "border-gray-300"}`}
											/>
											{errors.otp && (
												<p className="mt-1 text-sm text-red-500">
													{errors.otp}
												</p>
											)}
										</div>
									</div>
								</div>
							)}

							{/* Password Fields */}
							{isVerified && isSendOtp && (
								<>
									<div className="space-y-1">
										<div className="flex items-center gap-3">
											<FaLock className="text-gray-400" />
											<div className="flex-1">
												<input
													type="password"
													value={newPassword}
													onChange={(e) => {
														setNewPassword(
															e.target.value
														);
														setErrors((prev) => ({
															...prev,
															newPassword: "",
														}));
													}}
													placeholder="New Password"
													disabled={loading.isLoading}
													className={`w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
														${errors.newPassword ? "border-red-500" : "border-gray-300"}`}
												/>
												{errors.newPassword && (
													<p className="mt-1 text-sm text-red-500">
														{errors.newPassword}
													</p>
												)}
											</div>
										</div>
									</div>

									<div className="space-y-1">
										<div className="flex items-center gap-3">
											<FaLock className="text-gray-400" />
											<div className="flex-1">
												<input
													type="password"
													value={confirmPassword}
													onChange={(e) => {
														setConfirmPassword(
															e.target.value
														);
														setErrors((prev) => ({
															...prev,
															confirmPassword: "",
														}));
													}}
													placeholder="Confirm New Password"
													disabled={loading.isLoading}
													className={`w-full px-4 py-2 bg-gray-50 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
														${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
												/>
												{errors.confirmPassword && (
													<p className="mt-1 text-sm text-red-500">
														{errors.confirmPassword}
													</p>
												)}
											</div>
										</div>
									</div>
								</>
							)}

							{/* Error Message */}
							{error && (
								<p className="text-sm text-red-500 text-center font-medium">
									{error}
								</p>
							)}

							{/* Action Buttons */}
							{!isSendOtp && (
								<button
									onClick={handleSubmit}
									disabled={loading.isLoading}
									className="w-full py-2 bg-blue-500 text-white rounded-md font-medium transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
									{loading.isLoading
										? "Sending OTP..."
										: "Send OTP"}
								</button>
							)}

							{isSendOtp && !isVerified && (
								<button
									onClick={handleSubmitOtp}
									disabled={loading.isLoading}
									className="w-full py-2 bg-blue-500 text-white rounded-md font-medium transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
									{loading.isLoading
										? "Verifying..."
										: "Verify OTP"}
								</button>
							)}

							{isVerified && isSendOtp && (
								<button
									onClick={handleUpdatePassword}
									disabled={loading.isLoading}
									className="w-full py-2 bg-blue-500 text-white rounded-md font-medium transition-all duration-300 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
									{loading.isLoading
										? "Updating..."
										: "Update Password"}
								</button>
							)}

							{/* Navigation Buttons */}
							<div className="flex justify-between gap-2">
								<button
									onClick={navigateRegister}
									disabled={loading.isLoading}
									className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md font-medium transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
									Sign up
								</button>
								<button
									onClick={navigateLogin}
									disabled={loading.isLoading}
									className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium transition-all duration-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
									Back to login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
