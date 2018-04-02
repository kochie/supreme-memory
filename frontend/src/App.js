import React, { Component } from "react";

import {withStyles} from "material-ui/styles";
import PropTypes from "prop-types";

import fontawesome from "@fortawesome/fontawesome";
import brands from "@fortawesome/fontawesome-free-brands";

import "./App.css";
import TitleBar from "./TitleBar";
import Form from "./Form";

import Config from "./config.json";

fontawesome.library.add(brands);

class App extends Component {
	render() {
		// const {classes} = this.props;
		return (
			<div className="App">
				<TitleBar title={Config.title}/>
				<Form steps={Config.steps}/>
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
