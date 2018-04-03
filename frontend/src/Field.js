import React from "react";
import { withStyles } from "material-ui/styles";
// import TextField from "material-ui/TextField";
import { TextValidator } from "react-material-ui-form-validator";
import MenuItem from "material-ui/Menu/MenuItem";
import PropTypes from "prop-types";

const Field = ({field, classes, handleChange, value}) => {
	const validators = [];
	const errorMessages = [];
    
	if (field.required) {
		validators.push("required");
		errorMessages.push("This field is required");
	}

	return (
		<TextValidator	
			id={field.id}
			label={field.title}
			select={field.type === "select"}
			className={classes.textField}
			helperText={field.helperText}
			fullWidth={field.fullWidth ? true : false}
			type={field.type}
			required={field.required}
			value={value || (field.items && field.items[0].value) || ""}
			onChange={handleChange}
			SelectProps={{
				MenuProps: {
					className: classes.menu,
				},
			}}
			validators={validators}
			errorMessages={errorMessages}
			margin="normal"
		>
			{field.items && field.items.map(option => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextValidator>
	);
};

Field.propTypes = {
	field: PropTypes.object.isRequired,
	classes: PropTypes.object.isRequired,
	handleChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired
};

const styles = theme => ({
	menu:{
		width:200
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		minWidth: 200,
	}
});

export default withStyles(styles, {withTheme: true})(Field);