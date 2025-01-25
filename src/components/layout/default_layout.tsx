import React from "react";
import Header from "./header";
import Footer from "./footer";

type Props = {
	children: React.ReactNode;
};

export default function DefaultLayout({ children }: Props) {
	return (
		<>
			<Header></Header>
			<main>{children}</main>
			<Footer></Footer>
		</>
	);
}
