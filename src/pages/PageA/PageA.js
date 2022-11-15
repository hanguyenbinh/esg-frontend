import React from "react"

import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Table
} from "reactstrap"

import BreadCrumb from "src/Components/Common/BreadCrumb"
import LineChart from "./components/LineChart"

const labels = ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]

const data = {
	labels,
	datasets: [
		{
			type: "line",
			label: "Corporate (kWh/$100M)",
			borderColor: "#3577f1",
			borderWidth: 4,
			fill: false,
			data: labels.map(() => Math.round(Math.random() * 100))
		},
		{
			type: "line",
			label: "Building (kWh/$100M)",
			borderColor: "#f06548",
			borderWidth: 4,
			fill: true,
			data: labels.map(() => Math.round(Math.random() * 100))
		}
	]
}

function PageA() {
	return (
		<div className="page-content">
			<Container fluid>
				<BreadCrumb title="Dashboards" />
				<Row className="mb-3">
					<Col sm={12} md={6}>
						<LineChart title="Corporate - Fuel Consumption (kWh)" data={data} />
					</Col>
					<Col sm={12} md={6}>
						<Card>
							<CardBody>
								<FormGroup>
									<Label>Indicator</Label>
									<Input type="select">
										{[{ value: 1, label: "Fuel Consumption" }].map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</Input>
								</FormGroup>
								<Row>
									<Col sm={12} md={6}>
										<FormGroup>
											<Label>Basis 1</Label>
											<Input type="select">
												{[{ value: 1, label: "Building" }].map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</Input>
										</FormGroup>
									</Col>
									<Col sm={12} md={6}>
										<FormGroup>
											<Label>Basis 2</Label>
											<Input type="select">
												{[{ value: 1, label: "Corporate" }].map((option) => (
													<option key={option.value} value={option.value}>
														{option.label}
													</option>
												))}
											</Input>
										</FormGroup>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<h5 className="mb-3">Summary</h5>

				<Row className="mb-3">
					{[
						{
							title: "Top 4 Participations",
							labels: ["Company", "No of Plays"],
							data: [
								["Company A", "1,021 times"],
								["Company B", "300 times"],
								["Company C", "1,000 times"],
								["Company D", "1,0563 times"]
							]
						},
						{
							title: "Top 4 Participants",
							labels: ["Company", "Players"],
							data: [
								["Company A", "80 players"],
								["Company B", "75 players"],
								["Company C", "60 players"],
								["Company D", "50 players"]
							]
						},
						{
							title: "Top 4 Participants Rate",
							labels: ["Company", "Rate"],
							data: [
								["Company A", "70%"],
								["Company B", "53%"],
								["Company C", "44%"],
								["Company D", "41%"]
							]
						},
						{
							title: "Top 4 Participants Prize",
							labels: ["Company", "No of redemption"],
							data: [
								["Company A - Coupon", "50"],
								["Company B - Prize A", "41"],
								["iWatch", "32"],
								["Gift Card", "30"]
							]
						}
					].map((item, index) => (
						<Col key={index} sm={12} md={3}>
							<Card>
								<CardHeader>
									<CardTitle className="mb-0">{item.title}</CardTitle>
								</CardHeader>
								<Table bordered className="mb-0">
									<thead>
										<tr>
											{item.labels.map((label) => (
												<th key={label}>{label}</th>
											))}
										</tr>
									</thead>
									<tbody>
										{item.data.map((dataItems, dataItemsIndex) => (
											<tr key={dataItemsIndex}>
												{dataItems.map((dataItem) => (
													<td key={dataItem}>{dataItem}</td>
												))}
											</tr>
										))}
									</tbody>
								</Table>
							</Card>
						</Col>
					))}
				</Row>
				<Card>
					<CardBody>
						<div className="d-flex mb-2">
							<Input className="me-2" type="select" style={{ width: 120 }}>
								{[{ id: 1, label: "Company A" }].map((item) => (
									<option key={item.id}>{item.label}</option>
								))}
							</Input>
							<Input type="select" style={{ width: 120 }}>
								{[{ id: 1, label: "Company A" }].map((item) => (
									<option key={item.id}>{item.label}</option>
								))}
							</Input>
						</div>
						<Row className="mb-2">
							<Col sm={12} md={6}>
								Start-End Date: 22 Aug 01 - 22 Dec 31 (In Progress)
							</Col>
							<Col sm={12} md={6}>
								No of Plays left: 437 times
							</Col>
						</Row>

						<Row>
							{[
								{
									title: "Participations",
									labels: ["Days", "No of Plays"],
									data: [
										["Today", "10 times"],
										["Last 7 days", "300 times"],
										["Last 30 days", "1,000 times"],
										["Since Day 1", "1,563 times"]
									]
								},
								{
									title: "New Joiners",
									labels: ["Days", "New Players"],
									data: [
										["Today", "+5 player"],
										["Last 7 days", "+24 players"],
										["Last 30 days", "+67 players"],
										["Since Day 1", "+70 players"]
									]
								}
							].map((item, index) => (
								<Col key={index} sm={12} md={3}>
									<h5 className="mx-2 mb-3">{item.title}</h5>
									<Table bordered className="mb-0">
										<thead>
											<tr>
												{item.labels.map((label) => (
													<th key={label}>{label}</th>
												))}
											</tr>
										</thead>
										<tbody>
											{item.data.map((dataItems, dataItemsIndex) => (
												<tr key={dataItemsIndex}>
													{dataItems.map((dataItem) => (
														<td key={dataItem}>{dataItem}</td>
													))}
												</tr>
											))}
										</tbody>
									</Table>
								</Col>
							))}
						</Row>
					</CardBody>
				</Card>
			</Container>
		</div>
	)
}

export default PageA
