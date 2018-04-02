import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

export default ({stepImage}) => {
	if (stepImage === undefined) { 
		return null;
	}
	switch(stepImage.type) {
	case("icon"): {
		return (
			<FontAwesomeIcon icon={stepImage.source} size={"3x"}/>
		);
	}
	case("url"): {
		return (
			<img height={48} src={stepImage.source} alt={""}/>
		);
	}
	case("blob"): {
		return (
			<img src={stepImage.source} alt={""}/>
		);
	}
	case("svg"): {
		return ( stepImage.source );
	}
	default: {
		return null;
	}
	}
};