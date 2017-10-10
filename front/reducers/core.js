import {goBack} from "react-router-redux";
export default (state = {
	title: "",
	headerType: 1,
	headerLeftButton: {},
	headerRightButton: {},
	slideOnBars: []
}, {type, value}) => {
	switch(type){
	case "PAGE_TITLE":
		try{
			document.title = value;
		}catch(e){}
		return {
			...state,
			title: value
		};
	case "HEADER_LEFT_BUTTON":
		return function(){
			value === "back" && (value = {
				icon: "back",
				onClick(){
					require("../store").store.dispatch(goBack());
				}
			});
			return {
				...state,
				headerLeftButton: value
			};
		}();
	case "HEADER_RIGHT_BUTTON":
		return {
			...state,
			headerRightButton: value
		};
	case "HEADER_TYPE":
		return {
			...state,
			headerLeftButton: {},
			headerRightButton: {},
			headerType: value
		};
	case "SLIDE_ON_BARS":
		return {
			...state,
			slideOnBars: value
		};
	default:
		return state;
	}
};