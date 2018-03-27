import React, { Component } from "react";

import {withStyles} from "material-ui/styles";
import PropTypes from "prop-types";

import "./App.css";
import TitleBar from "./TitleBar";
import Form from "./Form";

class App extends Component {
	render() {
		// const {classes} = this.props;
		return (
			<div className="App">
				<TitleBar title={"UNIHACK Email Signup"}/>
				<Form/>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const styles = {
	headerWrapper: {
		height: "100%"
	},
};

export default withStyles(styles, {withTheme: true})(App);
