
import {asyncAction, SHOULD_NOT_FEEDBACK} from "./utils";
export const setMessage = value => ({
	type: "DIALOG_MESSAGE",
	value
});
export const basis = {
	setMessage,
	setTitle: value => ({
		type: "PAGE_TITLE",
		value
	}),
	setHeaderLeftButton: (value = {}) => ({
		type: "HEADER_LEFT_BUTTON",
		value
	}),
	setHeaderRightButton: (value = {}) => ({
		type: "HEADER_RIGHT_BUTTON",
		value
	}),
	setHeaderType: value => ({
		type: "HEADER_TYPE",
		value
	}),
	setFooterType: value => ({
		type: "FOOTER_TYPE",
		value
	})
};
export const setSlideOnBar = value => ({
	type: "SLIDE_ON_BARS",
	value
});
export const setUser = asyncAction({
	path: "/api/profile"
}, (data, code) => code ? {
	type: "NOT_AUTHORIZED"
} : {
	type: "USER",
	value: data,
	ok: 1
}, SHOULD_NOT_FEEDBACK);
export const authorize = tel => tel ? {
	type: "WHATEVER"
} : {
	type: "DIALOG_MESSAGE",
	value: "请先登录一下下"
};