
import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";

const TitleBar = ({ classes, title }) => (	
	<AppBar position={"sticky"} className={classes.appbar}>
		<Toolbar className={classes.toolbar}>
			<Typography variant="title" color="inherit">
				{title}
			</Typography>
		</Toolbar>
	</AppBar>
);

TitleBar.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
};

const styles = () => ({
	toolbar: {
		flex: 1,
		justifyContent: "center"
	}
});

export default withStyles(styles, {withTheme: true})(TitleBar);