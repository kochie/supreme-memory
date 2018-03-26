import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import SkipPreviousIcon from "material-ui-icons/SkipPrevious";
import PlayArrowIcon from "material-ui-icons/PlayArrow";
import SkipNextIcon from "material-ui-icons/SkipNext";

import logo from "./logo.svg";
import "./App.css";

class App extends Component {
	render() {
		const {classes, theme} = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<AppBar position={"fixed"}>
						<Toolbar className={classes.toolbar}>
							<Typography variant="title" color="inherit">
								UNIHACK Email Signup
							</Typography>
						</Toolbar>
					</AppBar>
				</header>
				<div><Card className={classes.card}>
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Typography variant="headline">Live From Space</Typography>
							<Typography variant="subheading" color="textSecondary">
              Mac Miller
							</Typography>
						</CardContent>
						<div className={classes.controls}>
							<IconButton aria-label="Previous">
								{theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}
							</IconButton>
							<IconButton aria-label="Play/pause">
								<PlayArrowIcon className={classes.playIcon} />
							</IconButton>
							<IconButton aria-label="Next">
								{theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}
							</IconButton>
						</div>
					</div>
					<CardMedia
						className={classes.cover}
						image={logo}
						title="Live from space album cover"
					/>
				</Card>
				{/* <img src={logo} className="App-logo" alt="logo" /> */}
				{/* <h1 className="App-title">Welcome to React</h1> */}
				</div>

				<div>
				</div>
			</div>
		);
	}
}

const styles = (theme) => ({
	toolbar: {
		flex: 1,
		justifyContent: "center"
	},
	card: {
		display: "flex",
		justifyContent: "center",
		paddingTop: "60px",
		backgroundColor: "#222"
	},
	details: {
		display: "flex",
		flexDirection: "column",
	},
	content: {
		flex: "1 0 auto",
	},
	cover: {
		width: 151,
		height: 151,
	},
	controls: {
		display: "flex",
		alignItems: "center",
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
	},
	playIcon: {
		height: 38,
		width: 38,
	}

});

App.propTypes = {
	children: PropTypes.node,
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
