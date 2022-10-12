import React from "react"
import { useHistory } from "react-router-dom"
import {
	Button,
	Container,
	Form,

} from "reactstrap"
import BreadCrumb from "../../Components/Common/BreadCrumb"
import { alertService } from "../../services"
import { Formik, useFormikContext } from "formik"
import { withTranslation } from "react-i18next"
import SubmissionGroup from "../ComponentLibrary/components/SubmissionGroup"
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux"
import { submitESGData } from "../../store/submissionForm/actions"
import { data } from "../ComponentLibrary/ComponentLibrary"

const submissionFormSchema = Yup.object().shape({
	companySize: Yup.number().required('Required'),
	yearOfRecord: Yup.string().required('Required'),
	projectType: Yup.string().required('Required'),
	grossValueOfConstructionWork: Yup.number().required('Required'),
	noOfProject: Yup.number().required('Required'),
	petrolUsage: Yup.number().required('Required'),
	dieselUsage: Yup.number().required('Required'),
	amountOfElectricityHKE: Yup.number().required('Required'),
	amountOfElectricityCLP: Yup.number().required('Required'),
	annualWaterConsumption: Yup.number().required('Required'),
	totalWeightof_InertWasteDisposedPerAnnum: Yup.number().required('Required'),
	totalWeightOf_Non_InertWasteDisposedPerAnnum: Yup.number().required('Required'),
	totalWeightOf_Mixed_WasteDisposedPerAnnum: Yup.number().required('Required'),
	noOfIndustrialAccidents: Yup.number().required('Required'),
	noOfOccupationalIncident: Yup.number().required('Required'),
	numberTypeAndMagitudeOfAdvanceHealthAndSafetyTechnologiesUsed: Yup.string().required('Required'),
	noOfHoursOfTranningPMStaff: Yup.number().required('Required'),
	noOfPMStaff: Yup.number().required('Required'),
	noOfHoursOfTranningTechnicalStaff: Yup.number().required('Required'),
	noOfTechnicalStaff: Yup.number().required('Required'),
	noOfHoursOfTranning: Yup.number().required('Required'),
	noOfDirectLabor: Yup.number().required('Required'),
	noOfStaffJoiningYMSOrSimilar: Yup.number().required('Required'),
	noOfYoungStaff: Yup.number().required('Required'),
	noOfManhoursInCommunityService: Yup.number().required('Required'),
	moneyToSupportCommunityService: Yup.number().required('Required'),
	employeeSize: Yup.number().required('Required'),
	noOfStaff: Yup.number().required('Required'),
	noOfSupportingStaff: Yup.number().required('Required'),
	noOfResignationsManagementStaff: Yup.number().required('Required'),
	noOfResignationsTechnicalStaff: Yup.number().required('Required'),
	noOfResignationsDirectStaff: Yup.number().required('Required'),
	noOfResignationsSupportingStaff: Yup.number().required('Required'),
	IsAdoptedSupplyChainManagement: Yup.bool().required('Required'),
	numberAndTypeOfOrganisationAndParticipation: Yup.string().required('Required'),
	noOfHourOfAnticorruptionTranningNewStaff: Yup.number().required('Required'),
	noOfNewStaff: Yup.number().required('Required'),
	noOfHourAnticorruptionTranningExistingStaff: Yup.number().required('Required'),
	noExistingStaff: Yup.number().required('Required'),
	numberOfConvictionsRelatedToTheEnvironment: Yup.number().required('Required'),
	noOfEnvironmentalProfessionals: Yup.number().required('Required'),
	noOfEnvironmentalPersonnel: Yup.number().required('Required'),
	IsAdoptedHealthAndSafety: Yup.bool().required('Required'),
	noOfConvictionsRelatedToHealthyAndSafety: Yup.number().required('Required'),
	suspensionNoticesDueToSafetyIssues: Yup.number().required('Required'),
	numberAndTypeOfAsWellAsAchivementResultedFromParticipation: Yup.string().required('Required'),
	noOfSafetyTraningHoursManagementStaff: Yup.number().required('Required'),
	noOfSafetyTraningHoursOperationalStaff: Yup.number().required('Required'),
	noOfSafetyTraningHoursDirectLabour: Yup.number().required('Required'),
});

const SubmissionForm = (props) => {
	const T = props.t ? props.t : (value) => value;
	const submissionGroups = [
		{
			title: T('Company Info'),
			fields: [
				{
					name: 'companySize',
					label: T('Company Size'),
				},
				{
					name: 'yearOfRecord',
					label: T('Year of Record')
				},
				{
					name: 'projectType',
					label: T('Project Type')
				},
				{
					name: 'grossValueOfConstructionWork',
					label: T('Gross value of construction work (HKD)')
				},
				{
					name: 'noOfProject',
					label: T('No of project')
				},

			]
		},
		{
			title: T('Energy/Water Consumption'),
			fields: [{
				name: 'petrolUsage',
				label: T('Petrol Usage (Tonne)')
			},
			{
				name: 'dieselUsage',
				label: T('Diesel Usage (Tonne)')
			},
			{
				name: 'amountOfElectricityHKE',
				label: T('Amount of electricity - HKE (kWh)')
			},
			{
				name: 'amountOfElectricityCLP',
				label: T('Amount of electricity - CLP (kWh)')
			},
			{
				name: 'annualWaterConsumption',
				label: T('Annual water consumption (in m3)')
			},
			]
		},
		{
			title: T('Waste Production'),
			fields: [{
				name: 'totalWeightof_InertWasteDisposedPerAnnum',
				label: T('Total weight of non-inert waste disposed per annum (Tonne)')
			},
			{
				name: 'totalWeightOf_Non_InertWasteDisposedPerAnnum',
				label: T('Total weight of non-inert waste disposed per annum (Tonne)')
			},
			{
				name: 'totalWeightOf_Mixed_WasteDisposedPerAnnum',
				label: T('Total weight of mixed waste disposed per annum (Tonne)')
			},
			]
		},
		{
			title: T('Health and Safety'),
			fields: [{
				name: 'noOfIndustrialAccidents',
				label: T('No.of industrial accidents')
			},
			{
				name: 'noOfOccupationalIncident',
				label: T('No of occupational Incident')
			},
			{
				name: 'numberTypeAndMagitudeOfAdvanceHealthAndSafetyTechnologiesUsed',
				label: T('Number, type and magnitude of advance health and safety technologies used')
			},
			]
		},
		{
			title: T('Development and Training'),
			fields: [{
				name: 'noOfHoursOfTranningPMStaff',
				label: T('No of hours of training - PM staff')
			},
			{
				name: 'noOfPMStaff',
				label: T('No of PM staff')
			},
			{
				name: 'noOfHoursOfTranningTechnicalStaff',
				label: T('No of hours of training - technical staff')
			},
			{
				name: 'noOfTechnicalStaff',
				label: T('No of technical staff')
			},
			{
				name: 'noOfHoursOfTranning',
				label: T('No of hours of training - direct labor')
			},
			{
				name: 'noOfDirectLabor',
				label: T('No of direct labor')
			},
			{
				name: 'noOfStaffJoiningYMSOrSimilar',
				label: T('No of staff joining YMS or similar')
			},
			{
				name: 'noOfYoungStaff',
				label: T('"	No of young staff (age < 40)"')
			},
			]
		},
		{
			title: T('Community Investment'),
			fields: [{
				name: 'noOfManhoursInCommunityService',
				label: T('No. of manhours in community service')
			},
			{
				name: 'moneyToSupportCommunityService',
				label: T('Money to support community service')
			},
			]
		},
		{
			title: T('Employment'),
			fields: [{
				name: 'employeeSize',
				label: T('Employment Size')
			},
			{
				name: 'noOfStaff',
				label: T('No of Staff')
			},
			{
				name: 'noOfSupportingStaff',
				label: T('No of supporting staff')
			},
			{
				name: 'noOfResignationsManagementStaff',
				label: T('No of resignations - management staff')
			},
			{
				name: 'noOfResignationsTechnicalStaff',
				label: T('No of resignations - technical staff')
			},
			{
				name: 'noOfResignationsDirectStaff',
				label: T('No of resignations - direct staff')
			},
			{
				name: 'noOfResignationsSupportingStaff',
				label: T('No of resignations - supporting staff')
			},
			]
		},
		{
			title: T('In-house Codes and Guidelines Governing Supply Chain Management'),
			fields: [
				{
					name: 'IsAdoptedSupplyChainManagement',
					label: T(`Click Yes when one of followings is adopted:
				Migrated to six sigma system				
				Developed framework for risk-based quality management system				
				adopted total quality management				
				practicing strategic, alliancing or partnering based risk sharing approaches
				`),
					type: 'select',
					options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]
				}
			]
		},
		{
			title: T('In-house Codes and Guidelines Governing - Anticorruption'),
			fields: [{
				name: 'numberAndTypeOfOrganisationAndParticipation',
				label: T('Number and type of organisation and participation in anticorruption campaigns / activities')
			},
			{
				name: 'noOfHourOfAnticorruptionTranningNewStaff',
				label: T('No of hour of  anticorruption training - new staff')
			},
			{
				name: 'noOfNewStaff',
				label: T('No of new staff')
			},
			{
				name: 'noOfHourAnticorruptionTranningExistingStaff',
				label: T('no of hour anticorruption training - existing staff')
			},
			{
				name: 'noExistingStaff',
				label: T('No of existing staff')
			},
			]
		},
		{
			title: T('In-house Codes and Guidelines Governing - Environment'),
			fields: [{
				name: 'numberOfConvictionsRelatedToTheEnvironment',
				label: T('Number of convictions related to the environment')
			},
			{
				name: 'noOfEnvironmentalProfessionals',
				label: T('No. of environmental professionals')
			},
			{
				name: 'noOfEnvironmentalPersonnel',
				label: T('No. of environmental personnel')
			},
			]
		},
		{
			title: T('In-house Codes and Guidelines Governing-  Health and Safety'),
			fields: [{
				name: 'IsAdoptedHealthAndSafety',
				label: T(`Click yes when one of followings is adopted:
				Migrated to ISO 45001
				Developed framework for design for safety`),
				type: 'select',
				options: [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]
			},
			{
				name: 'noOfConvictionsRelatedToHealthyAndSafety',
				label: T('No of convictions related to health and safety')
			},
			{
				name: 'suspensionNoticesDueToSafetyIssues',
				label: T('Suspension notices due to safety issues (including those caused by subcontractors involved in a project)')
			},
			{
				name: 'numberAndTypeOfAsWellAsAchivementResultedFromParticipation',
				label: T('Number and type of as well as achievement resulted from the participation')
			},
			{
				name: 'noOfSafetyTraningHoursManagementStaff',
				label: T('No. of safety training hours - management staff')
			},
			{
				name: 'noOfSafetyTraningHoursOperationalStaff',
				label: T('No. of safety training hours - operational staff')
			},
			{
				name: 'noOfSafetyTraningHoursDirectLabour',
				label: T('No. of safety training hours - direct labour')
			},
			]
		},
	]
	const history = useHistory()

	const { values, handleSubmit } = useFormikContext()

	return (
		<Form
			onSubmit={handleSubmit}

		>
			<div className="mb-3 d-flex justify-content-end">
				<Button type="submit">Upload</Button>
			</div>
			{submissionGroups.map((group, index) => (
				<SubmissionGroup key={`SubmissionForm_${index}`} title={group.title} fields={group.fields}></SubmissionGroup>
			))}
		</Form>
	)
}

const UploadESGData = (props) => {
	const dispatch = useDispatch();
	const email = sessionStorage.getItem("email");
	const handleSubmit = async (values) => {
		const { isConfirmed } = await alertService.fireDialog({
			title: "Confirmation Page",
			content: (
				<div className="text-center">
					{/* <p className="mb-0">Version 1</p> */}
					<p className="mb-0">Year of Record: {values.yearOfRecord}</p>
					<p className="mb-0">...</p>
					<p className="mb-0">
						<b>Energy Consumption</b>
					</p>
					<p className="mb-0">Petrol Usage: {values.petrolUsage}</p>
					<p>Diesel: {values.dieselUsage}</p>
					<p className="mb-0 ">
						<b>
							By clicking the 'confirm' button, you acknowledge that the
							submitted details are correct.
							<br /> Please check your details carefully before continuing.
							<br />
							<br />
							The contents will subsequently be hashed and stored on Blockchain
						</b>
					</p>
				</div>
			),
			confirmButtonProps: {
				text: "Confirm"
			},
			cancelButtonProps: {
				show: true,
				text: "Cancel"
			}
		})
		if (isConfirmed) {

			dispatch(submitESGData({ ...values, email }, props.history))
			// history.push("/submissions-history")
		}
		// ... handle api on redux
	}

	const initialValues = React.useMemo(() => {
		return {
			companySize: '1',
			yearOfRecord: '1',
			projectType: '1',
			grossValueOfConstructionWork: '1',
			noOfProject: '1',
			petrolUsage: '1',
			dieselUsage: '1',
			amountOfElectricityHKE: '1',
			amountOfElectricityCLP: '1',
			annualWaterConsumption: '1',
			totalWeightof_InertWasteDisposedPerAnnum: '1',
			totalWeightOf_Non_InertWasteDisposedPerAnnum: '1',
			totalWeightOf_Mixed_WasteDisposedPerAnnum: '1',
			noOfIndustrialAccidents: '1',
			noOfOccupationalIncident: '1',
			numberTypeAndMagitudeOfAdvanceHealthAndSafetyTechnologiesUsed: '1',
			noOfHoursOfTranningPMStaff: '1',
			noOfPMStaff: '1',
			noOfHoursOfTranningTechnicalStaff: '1',
			noOfTechnicalStaff: '1',
			noOfHoursOfTranning: '1',
			noOfDirectLabor: '1',
			noOfStaffJoiningYMSOrSimilar: '1',
			noOfYoungStaff: '1',
			noOfManhoursInCommunityService: '1',
			moneyToSupportCommunityService: '1',
			employeeSize: '1',
			noOfStaff: '1',
			noOfSupportingStaff: '1',
			noOfResignationsManagementStaff: '1',
			noOfResignationsTechnicalStaff: '1',
			noOfResignationsDirectStaff: '1',
			noOfResignationsSupportingStaff: '1',
			IsAdoptedSupplyChainManagement: false,
			numberAndTypeOfOrganisationAndParticipation: '1',
			noOfHourOfAnticorruptionTranningNewStaff: '1',
			noOfNewStaff: '1',
			noOfHourAnticorruptionTranningExistingStaff: '1',
			noExistingStaff: '1',
			numberOfConvictionsRelatedToTheEnvironment: '1',
			noOfEnvironmentalProfessionals: '1',
			noOfEnvironmentalPersonnel: '1',
			IsAdoptedHealthAndSafety: false,
			noOfConvictionsRelatedToHealthyAndSafety: '1',
			suspensionNoticesDueToSafetyIssues: '1',
			numberAndTypeOfAsWellAsAchivementResultedFromParticipation: '1',
			noOfSafetyTraningHoursManagementStaff: '1',
			noOfSafetyTraningHoursOperationalStaff: '1',
			noOfSafetyTraningHoursDirectLabour: '1'
		}
	}, [])

	return (
		<Formik initialValues={initialValues} validationSchema={submissionFormSchema} onSubmit={handleSubmit}>
			<div className="page-content">
				<Container fluid>
					<BreadCrumb title="Upload ESG Data" />
					<SubmissionForm />
				</Container>
			</div>
		</Formik>
	)
}

export default withTranslation()(UploadESGData)