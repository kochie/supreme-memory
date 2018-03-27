import React from "react";
import Card, { CardContent, CardMedia } from "material-ui/Card";
import { withStyles } from "material-ui/styles";
import IconButton from "material-ui/IconButton";
import SkipPreviousIcon from "material-ui-icons/SkipPrevious";
import PlayArrowIcon from "material-ui-icons/PlayArrow";
import SkipNextIcon from "material-ui-icons/SkipNext";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import Grid from "material-ui/Grid";

import logo from "./logo.svg";

const Header = ({classes, theme}) => {
	return (
		<Grid container className={classes.paper}>
			<Grid item xs={12}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.cover}
						image={logo}
						title="Live from space album cover"
					/>
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
				
				</Card>
			</Grid>
		</Grid>
	);
};

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const styles = (theme) => ({
	grid: {
		flexGrow: 1,
		paddingTop: 40,
		paddingBottom: 16,
		backgroundColor: "#222",
		justifyContent: "center"
	},
	card: {
		maxWidth: 600,
		display: "flex",
		justifyContent: "center",
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

export default withStyles(styles, { withTheme: true })(Header);