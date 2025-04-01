import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../core/store/store";
import { AuthService } from "../../core/services/AuthService";
import { Button } from "@chakra-ui/react";
import { FaUser, FaGlobe } from "react-icons/fa";
import { showLoading, hideLoading } from "../../core/store/loadingSlice";
import { toaster } from "../../components/ui/toaster";

export default function ProfilePage() {
	const dispatch = useDispatch<AppDispatch>();
	const { user } = useSelector((state: RootState) => state.auth);
	// const loading = useSelector((state: RootState) => state.loading);

	const [profileData, setProfileData] = useState({
		full_name: user.user_metadata.full_name || "",
		website: user?.user_metadata?.website || "",
		bio: user?.user_metadata?.bio || "",
		avatar_url: user?.user_metadata?.avatar_url || "",
	});

	const [isEditing, setIsEditing] = useState(false);

	const handleUpdateProfile = async () => {
		try {
			dispatch(showLoading());
			await AuthService.updateProfile(profileData);
			toaster.success({
				title: "Profile updated successfully!",
				duration: 3000,
			});
			setIsEditing(false);
		} catch (error) {
			console.error("Profile update failed:", error);
			toaster.error({
				title: "Failed to update profile",
				duration: 3000,
			});
		} finally {
			dispatch(hideLoading());
		}
	};

	return (
		<div className="h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="bg-white rounded-2xl shadow-xl overflow-hidden">
					{/* Content Section */}
					<div className="pt-20 pb-8 px-8">
						<div className="flex justify-between items-center mb-8">
							<h1 className="text-3xl font-bold text-gray-800">
								{isEditing ? (
									<input
										type="text"
										value={profileData.full_name}
										onChange={(e) =>
											setProfileData({
												...profileData,
												full_name: e.target.value,
											})
										}
										className="border-b-2 border-blue-500 focus:outline-none bg-transparent w-full"
										placeholder="Your name"
									/>
								) : (
									profileData.full_name || user?.email
								)}
							</h1>
							<Button
								colorScheme={isEditing ? "green" : "blue"}
								onClick={() => {
									if (isEditing) {
										handleUpdateProfile();
									} else {
										setIsEditing(true);
									}
								}}>
								{isEditing ? "Save Changes" : "Edit Profile"}
							</Button>
						</div>

						<div className="space-y-6">
							{/* Email */}
							<div className="flex items-center space-x-4">
								<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
									<FaUser className="text-blue-500" />
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Email
									</p>
									<p className="text-gray-800">
										{user?.email}
									</p>
								</div>
							</div>

							{/* Website */}
							<div className="flex items-center space-x-4">
								<div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
									<FaGlobe className="text-purple-500" />
								</div>
								<div className="flex-1">
									<p className="text-sm text-gray-500">
										Website
									</p>
									{isEditing ? (
										<input
											type="text"
											value={profileData.website}
											onChange={(e) =>
												setProfileData({
													...profileData,
													website: e.target.value,
												})
											}
											className="border-b-2 border-purple-500 focus:outline-none bg-transparent w-full"
											placeholder="Your website"
										/>
									) : (
										<p className="text-gray-800">
											{profileData.website || "Not set"}
										</p>
									)}
								</div>
							</div>

							{/* Bio */}
							<div className="space-y-2">
								<p className="text-sm text-gray-500">Bio</p>
								{isEditing ? (
									<textarea
										value={profileData.bio}
										onChange={(e) =>
											setProfileData({
												...profileData,
												bio: e.target.value,
											})
										}
										className="w-full h-32 p-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
										placeholder="Tell us about yourself..."
									/>
								) : (
									<p className="text-gray-800 whitespace-pre-wrap">
										{profileData.bio || "No bio yet"}
									</p>
								)}
							</div>
						</div>
					</div>

					{/* Footer Section */}
					{isEditing && (
						<div className="px-8 pb-8">
							<Button
								variant="outline"
								colorScheme="red"
								onClick={() => {
									setIsEditing(false);
									setProfileData({
										full_name:
											user?.user_metadata?.full_name ||
											"",
										website:
											user?.user_metadata?.website || "",
										bio: user?.user_metadata?.bio || "",
										avatar_url:
											user?.user_metadata?.avatar_url ||
											"",
									});
								}}
								className="w-full">
								Cancel
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
