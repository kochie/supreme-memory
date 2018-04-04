import React from "react";
import { withStyles } from "material-ui/styles";
import { TextValidator, SelectValidator } from "react-material-ui-form-validator";
import MenuItem from "material-ui/Menu/MenuItem";
import PropTypes from "prop-types";
import {FormGroup} from "material-ui/Form";
import Typography from "material-ui/Typography";

const handleBlur = (event, ref) => ref.current.validate(event.target.value, true);

const EmailSelectionField = ({ field, classes, value, handleChange }) => {
	const validators = [];
	const errorMessages = [];
	let ref = React.createRef();

	const [addressValue, domainValue = field.items[0].value] = value.split("@");
	
	const addressUpdate = event => {
		handleChange({target:{value: `${event.target.value}@${domainValue}`}});
	};

	const domainUpdate = event => {
		handleChange({target:{value: `${addressValue}@${event.target.value}`}});
	};
    
	if (field.required) {
		validators.push("required");
		errorMessages.push("This field is required");
	}

	// if (field.type === "email") {
	//  	validators.push("isEmail");
	//	errorMessages.push("Must be a valid email address");
	//}

	return (
		<FormGroup row>
			<TextValidator
				ref={ref}
				id={field.id}
				name={field.id}
				label={field.title}
				className={classes.textField}
				helperText={field.helperText}
				required={field.required}
				value={addressValue}
				onChange={addressUpdate}
				margin="normal"
				validators={validators}
				errorMessages={errorMessages}
				onBlur={event => handleBlur(event, ref)}
				onFocus={() => ref.current.setState({isValid: true})}
			/>
			<Typography className={classes.at}>@</Typography>
			<SelectValidator
				select
				id={`${field.id}-select`}
				name={`${field.id}-select`}
				label={"domain"}
				className={classes.textField}
				value={domainValue}
				SelectProps={{
					MenuProps: {
						className: classes.menu,
					},
				}}
				onChange={domainUpdate}
				margin="normal"
				validators={validators}
				errorMessages={errorMessages}
			>
				{field.items && field.items.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</SelectValidator>
		</FormGroup>
	); 
};	

EmailSelectionField.propTypes = {
	field: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};

const styles = theme => ({
	menu:{
		width:200
	},
	at: {
		marginTop: 40
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		minWidth: 200,
	}
});

export default withStyles(styles, {withTheme: true})(EmailSelectionField);