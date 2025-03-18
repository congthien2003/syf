import { Spinner, Center } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { selectLoading } from "../../../core/store/loadingSlice";
export default function Loading() {
	const isLoading = useSelector(selectLoading);

	if (!isLoading) return null; // Ẩn khi không tải

	return (
		<Center
			position="fixed"
			top={0}
			left={0}
			w="100vw"
			h="100vh"
			bg="rgba(0,0,0,0.5)"
			zIndex={1000}>
			<Spinner size="xl" color="white" />
		</Center>
	);
}
