import React from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import MenuItem from "material-ui/Menu/MenuItem";
import PropTypes from "prop-types";
import {FormGroup} from "material-ui/Form";
import Typography from "material-ui/Typography";

const EmailSelectionField = ({ field, classes, value, handleChange }) => {

	const [addressValue, domainValue = field.items[0].value] = value.split("@");
	
	const addressUpdate = event => {
		handleChange({target:{value: `${event.target.value}@${domainValue}`}});
	};

	const domainUpdate = event => {
		handleChange({target:{value: `${addressValue}@${event.target.value}`}});
	};

	return (
		<FormGroup row>
			<TextField	
				id={field.id}
				label={field.title}
				className={classes.textField}
				helperText={field.helperText}
				required={field.required}
				value={addressValue}
				onChange={addressUpdate}
				margin="normal"
			/>
			<Typography className={classes.at}>@</Typography>
			<TextField
				select
				id={`${field.id}-select`}
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
			>
				{field.items && field.items.map(option => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
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