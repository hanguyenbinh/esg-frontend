import React from "react"
import cx from "classnames"
import lodash from "lodash"
import PropTypes from "prop-types"

import { FormGroup, FormText, Input, Label } from "reactstrap"

import classes from "./AppFormInput.module.scss"

const AppFormInput = React.forwardRef((props, ref) => {
	const {
		label,
		name,
		className,
		classes: innerClasses,
		options,
		inputProps,
		inputRef,
		type,
		multiple,
		onChange,
		onBlur,
		error,
		helperText,
		value,
		...rest
	} = props
	const htmlId = inputProps?.id || lodash.uniqueId(`app${`-${name}`}-input`)

	return (
		<FormGroup
			ref={ref}
			className={cx(className, !!innerClasses?.root && innerClasses.root, {
				[classes.error]: !!error
			})}
			{...rest}
		>
			<Label
				htmlFor={htmlId}
				className={cx(
					classes.label,
					!!innerClasses?.label && innerClasses.label
				)}
			>
				{label}
			</Label>
			<Input
				{...inputProps}
				value={value}
				name={name}
				className={cx(!!innerClasses?.input && innerClasses.input)}
				id={htmlId}
				ref={inputRef}
				type={type}
				multiple={multiple}
				onChange={onChange}
				onBlur={onBlur}
				valid={error === false}
				invalid={error === true}
			>
				{type === "select"
					? options.map((option, index) => (
							<option key={`${name}${index}`} value={option.value}>
								{option.label}
							</option>
					  ))
					: undefined}
			</Input>
			{!!helperText && (
				<FormText
					color="inherit"
					className={cx(
						classes.helperText,
						!!innerClasses?.helperText && innerClasses.helperText
					)}
				>
					{helperText}
				</FormText>
			)}
		</FormGroup>
	)
})

AppFormInput.propTypes = {
	label: PropTypes.string,
	className: PropTypes.string,
	classes: PropTypes.shape({
		root: PropTypes.string,
		label: PropTypes.string,
		input: PropTypes.string,
		helperText: PropTypes.string
	}),
	name: PropTypes.string,
	value: PropTypes.any,
	placeholder: PropTypes.string,
	type: PropTypes.oneOf(["password", "text", "number", "email", "select"]),
	multiple: PropTypes.bool,
	error: PropTypes.bool,
	helperText: PropTypes.string,
	onChange: PropTypes.func,
	onBlur: PropTypes.func
}

AppFormInput.displayName = "AppFormInput"

export default AppFormInput
