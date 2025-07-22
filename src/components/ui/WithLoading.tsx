import { ClipLoader } from "react-spinners";

interface WithLoadingProps {
	isLoading: boolean;
	isError: boolean;
	children: React.ReactNode;
}

export default function WithLoading({
	isLoading,
	isError,
	children,
}: WithLoadingProps) {
	if (isLoading) {
		return (
			<div className="flex justify-center items-start  scrollbar-hide mt-10 w-full">
				<ClipLoader color="#000" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p className="text-2xl text-primary font-bold">Error</p>
			</div>
		);
	}

	return children;
}
