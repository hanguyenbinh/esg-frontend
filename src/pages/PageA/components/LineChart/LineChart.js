import React from "react"

import cx from "classnames"

import PropTypes from "prop-types"

import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController
} from "chart.js"
import { Chart } from "react-chartjs-2"

import classes from "./LineChart.module.scss"
import {
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row,
	UncontrolledDropdown
} from "reactstrap"

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController
)

const LineChart = (props) => {
	const { title, data } = props

	return (
		<Card className={cx("m-0", classes.chart)}>
			{!!title && (
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
			)}
			<CardBody className={cx(`p-0`, classes.chartContent)}>
				<Chart data={data} />
			</CardBody>
		</Card>
	)
}

LineChart.propTypes = {
	title: PropTypes.string,
	data: PropTypes.shape({
		labels: PropTypes.array,
		datasets: PropTypes.arrayOf(
			PropTypes.shape({
				type: PropTypes.oneOf(["bar", "line"]),
				label: PropTypes.string,
				borderColor: PropTypes.string,
				borderWidth: PropTypes.number,
				fill: PropTypes.bool,
				data: PropTypes.array
			})
		)
	}),
	onOptionChange: PropTypes.func
}

export default React.memo(LineChart)
