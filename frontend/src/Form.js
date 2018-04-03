import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepLabel, StepContent } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";
import StepIcon from "./StepIcon";
import Field from "./Field";
import EmailSelectionField from "./EmailSelectionField";
import { ValidatorForm } from "react-material-ui-form-validator";

function addToDepends(depends, defaultFormat, fieldID, subkeyfields = []){
	const fields = [...(new Set(defaultFormat.match(/\${[\w-]*}/g)))].map(exp=>exp.slice(2,-1));
	fields.forEach(field => {
		depends[field] = depends.field ? [...depends[field], fieldID] : [fieldID];
	});
	subkeyfields.forEach(subkey => {
		if (fieldID !== subkeyfields.keyfield) {
			depends[subkey.keyfield] = depends[subkey.keyfield] ? [...depends[subkey.keyfield], fieldID] : [fieldID];
		}
	});
}

function computeSubkeyfield(subkeyfield, value) {
	switch(subkeyfield.fn){
	case "split": {
		let val = value.split(subkeyfield.args[0]);
		return val[subkeyfield.args[1]];
	}
	case "lower": {
		return value.toLowerCase();
	}
	default: {
		throw new TypeError("Unknown subkey function");
	}
	}
} 

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
			onChange: this.makeChangeFn(props.steps),
			defaultFormats: this.getFormats(props.steps),
			dependentFields: this.getDependents(props.steps),
			form: this.getFormData(props.steps)
		};
	}

	updateDependents(value, id) {
		const fields = {};
		const { dependentFields, defaultFormats, form, onChange } = this.state;
		dependentFields[id] && dependentFields[id].forEach(depField => {
			let newValue = defaultFormats[depField].format;
			defaultFormats[depField].keyfields.forEach(keyfield => {
				newValue = newValue.replace(`\${${keyfield}}`, keyfield === id ? value : form[keyfield]);
			});
			defaultFormats[depField].subkeyfields.forEach(subkeyfield => {
				newValue = newValue.replace(
					`$[${subkeyfield.subkey}]`, 
					computeSubkeyfield(subkeyfield, id === subkeyfield.keyfield ? value : form[subkeyfield.keyfield])
				);
			});
			fields[depField] = newValue;
			onChange[depField]({target: {value: newValue}});
		});
		return fields;
	}

	getFormats(steps) {
		const formats = {};
		steps.forEach(step => {
			step.form && step.form.fields.forEach(field => {
				field.defaultFormat && (formats[field.id] = {
					"format": field.defaultFormat,
					"keyfields": [...(new Set(field.defaultFormat.match(/\${[\w-]*}/g)))].map(exp=>exp.slice(2,-1)),
					"subkeyfields": field.subKeyFields ? [...field.subKeyFields] : []
				});
			});
		});
		return formats;
	}

	makeChangeFn(steps) {
		const onChange = {};
		steps.forEach(step => {
			step.form && step.form.fields.forEach(field => {
				onChange[field.id] = this.handleChange(field.id);
			});
		});
		return onChange;
	}

	getDependents(steps) {
		const depends = {};
		steps.forEach(step => {
			step.form && step.form.fields.forEach(field => {
				field.defaultFormat && addToDepends(depends, field.defaultFormat, field.id, field.subKeyFields);
			});
		});
		return depends;
	}

	getFormData(steps) {
		const formValue = {};
		steps.forEach(step => {
			step.form && step.form.fields.forEach(field => {
				if (field.type === "emailSelection") {
					formValue[field.id] = `@${field.items[0].value}` || "";
				} else {
					formValue[field.id] = field.defaultValue || "";
				}
			});
		});
		return formValue;
	}

	handleNext() {
		this.setState({
			activeStep: this.state.activeStep + 1,
		});
	}

	handleBack() {
		this.setState({
			activeStep: this.state.activeStep - 1,
		});
	}

	handleReset()  {
		this.setState({
			activeStep: 0,
		});
	}

	handleChange(id) {
		return (event) => {
			const value = event.target.value;
			const depends = this.updateDependents(value.trim(), id);
			this.setState((prevState) => ({form: 
				{ ...prevState.form, [id]: value, ...depends}
			}));
		};
	}

	render() {
		const { classes, steps } = this.props;
		const { activeStep } = this.state;

		return (
			<Grid container justify={"center"} className={classes.gridRoot}>
				<Grid item xs={12} sm={10} lg={5}>
					<div className={activeStep !== steps.length ? classes.root : classes.rootEnd}>
						<Stepper activeStep={activeStep} orientation="vertical">
							{steps.map((step, index) => {
								return (
									<Step key={index} className={classes.step}>
										<StepLabel>{step.title}</StepLabel>
										<StepContent>
											<Grid className={classes.content} direction={"row"} alignItems={"center"} container>
												{step.stepImage ? ( 
													<Grid sm={2} item container justify={"center"}>
														<Grid item>
															<StepIcon stepImage={step.stepImage}/>
														</Grid>
													</Grid>
												) : null }
												<Grid item sm={step.stepImage ? 10 : 12}>
													<Typography>{step.content}</Typography>
												</Grid>
											</Grid>
											{step.form ? <Grid container direction={"row"}>
												<Grid item>
													<ValidatorForm autoComplete={"off"}>
														{step.form.fields.map((field, index) => {
															if (field.type === "emailSelection"){
																return <EmailSelectionField 
																	key={index} 
																	field={field} 
																	value={this.state.form[field.id]}
																	handleChange={this.state.onChange[field.id]} 
																/>;
															}
															return <Field
																key={index} 
																field={field} 
																value={this.state.form[field.id]} 
																handleChange={this.state.onChange[field.id]} 
															/>;
														})}
													</ValidatorForm>
												</Grid>
											</Grid> : null}
											<div className={classes.actionsContainer}>
												<div>
													<Button
														disabled={activeStep === 0}
														onClick={() => this.handleBack()}
														className={classes.button}
													>Back</Button>
													<Button
														variant="raised"
														color="primary"
														onClick={() => this.handleNext()}
														className={classes.button}
													>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
												</div>
											</div>
										</StepContent>
									</Step>
								);
							})}
						</Stepper>
						{activeStep === steps.length && (
							<Paper square elevation={0} className={classes.resetContainer}>
								<Typography>All steps completed - you&quot;re finished</Typography>
								<Button onClick={() => this.handleReset()} className={classes.button}>Reset</Button>
							</Paper>
						)}
					</div>
				</Grid>
			</Grid>
		);
	}
}

Form.propTypes = {
	classes: PropTypes.object,
	steps: PropTypes.array
};

const styles = theme => ({
	root:{
		textAlign: "left"
	},
	rootEnd: {
		textAlign: "center",
	},
	button: {
		marginTop: theme.spacing.unit,
		marginRight: theme.spacing.unit,
	},
	actionsContainer: {
		marginBottom: theme.spacing.unit * 2,
	},
	resetContainer: {
		padding: theme.spacing.unit * 3,
		justifyContent: "center"
	},
	content: {
		marginTop: 10
	}
});

export default withStyles(styles, {withTheme: true})(Form);