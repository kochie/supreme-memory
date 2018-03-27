import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Stepper, { Step, StepLabel, StepContent } from "material-ui/Stepper";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

function getSteps() {
	return ["Select campaign settings", "Create an ad group", "Create an ad"];
}

function getStepContent(step) {
	switch (step) {
	case 0:
		return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
	case 1:
		return "An ad group contains one or more ads which target a shared set of keywords.";
	case 2:
		return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
	default:
		return "Unknown step";
	}
}

class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeStep: 0,
		};
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

	render() {
		const { classes } = this.props;
		const steps = getSteps();
		const { activeStep } = this.state;

		return (
			<Grid container className={classes.gridRoot}>
				<Grid item xs={12}>
					<Grid container justify="center">
						<Grid item className={activeStep !== steps.length ? classes.grid : classes.gridEnd}>
							<div className={activeStep !== steps.length ? classes.root : classes.rootEnd}>
								<Stepper activeStep={activeStep} orientation="vertical">
									{steps.map((label, index) => {
										return (
											<Step key={label} className={classes.step}>
												<StepLabel>{label}</StepLabel>
												<StepContent>
													<Typography>{getStepContent(index)}</Typography>
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
				</Grid>
			</Grid>
		);
	}
}

Form.propTypes = {
	classes: PropTypes.object,
};

const styles = theme => ({
	grid: {
		width: "60%",
		minWidth: 700
	},
	gridEnd: {
		minWidth: 300,
	},
	root:{
		textAlign: "left"
	},
	rootEnd: {
		textAlign: "center",
		minWidth: 300
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
	step:{
		//minWidth: 700,
		//width: "60vw",
		//maxWidth: 1100
	}
});

export default withStyles(styles)(Form);