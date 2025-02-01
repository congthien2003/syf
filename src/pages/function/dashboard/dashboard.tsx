import React, { useState } from "react";
import "./style.css";
import ButtonView from "../../../components/ui/button-view/button-view";
import { Avatar } from "../../../components/ui/avatar";
import { Checkbox } from "../../../components/ui/checkbox";
import { ListLanguages } from "../../../const/listLanguage";
export default function Dashboard() {
	const [filterLang, setFilterLang] = useState("");

	const listLanguage = ListLanguages.map((item) => (
		<Checkbox
			size="sm"
			key={item.value}
			variant={"subtle"}
			colorPalette={"green"}
			checked={filterLang == item.value}
			onClick={() => setFilterLang(item.value)}>
			{item.label}
		</Checkbox>
	));
	return (
		<>
			<div className="dashboard">
				<div
					id="slider"
					className="flex items-center justify-center flex-col">
					<div className="slider-content flex items-center justify-center flex-col">
						<h2 className="flex align-middle items-center gap-4">
							{" "}
							<i
								className="fa fa-code slider-logo"
								aria-hidden="true"></i>{" "}
							Share Your Function{" "}
						</h2>
						<p>You can add, edit, and delete your function here.</p>
					</div>
					<div className="search">
						{/* <Input placeholder="Enter function name" /> */}
						<input type="text" placeholder="Enter function name" />
						<button className="btn-search">
							Search
							<i className="fa fa-search" aria-hidden="true"></i>
						</button>
					</div>
				</div>
				<div className="container flex justify-center">
					<div className="content">
						<div className="list-filter">
							<h3>Filter</h3>
							<div className="filter">
								<h4 className="px-1 mb-2 text-sm text-gray-dark">
									Language
								</h4>
								<div className="filter-item flex flex-col pl-4">
									{listLanguage}
								</div>
							</div>
						</div>
						<div className="list">
							<div className="list__header flex items-center justify-between">
								<h4>List Function</h4>
							</div>
							<li className="info-container">
								<div className="info">
									<h5 className="name">Config Program.cs</h5>
									<p className="description">
										Config the .NET Core WebApi Project
									</p>
									<div className="author flex align-center items-center">
										<p className="flex align-center items-center gap-2">
											<Avatar name="Sabo" size="xs" />
											Sabo
										</p>
										<p>Date: 12/12/2021</p>
									</div>
								</div>
								<div className="action">
									<ButtonView name="View Code"></ButtonView>
								</div>
							</li>
							<li className="info-container">
								<div className="info">
									<h5 className="name">Function Name</h5>
									<p className="description">
										Function Description
									</p>
									<div className="author">
										<p>Author: John Doe</p>
										<p>Date: 12/12/2021</p>
									</div>
								</div>
								<div className="action">
									<ButtonView name="View Code"></ButtonView>
								</div>
							</li>
							<li className="info-container">
								<div className="info">
									<h5 className="name">Function Name</h5>
									<p className="description">
										Function Description
									</p>
									<div className="author">
										<p>Author: John Doe</p>
										<p>Date: 12/12/2021</p>
									</div>
								</div>
								<div className="action">
									<ButtonView name="View Code"></ButtonView>
								</div>
							</li>
							<li className="info-container">
								<div className="info">
									<h5 className="name">Function Name</h5>
									<p className="description">
										Function Description
									</p>
									<div className="author">
										<p>Author: John Doe</p>
										<p>Date: 12/12/2021</p>
									</div>
								</div>
								<div className="action">
									<ButtonView name="View Code"></ButtonView>
								</div>
							</li>
							<li className="info-container">
								<div className="info">
									<h5 className="name">Function Name</h5>
									<p className="description">
										Function Description
									</p>
									<div className="author">
										<p>Author: John Doe</p>
										<p>Date: 12/12/2021</p>
									</div>
								</div>
								<div className="action">
									<ButtonView name="View Code"></ButtonView>
								</div>
							</li>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
