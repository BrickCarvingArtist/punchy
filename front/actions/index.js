import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
import {SERVER_NAME} from "../configs";
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
	setFooterType: value => ({
		type: "FOOTER_TYPE",
		value
	})
};
export const setUser = () => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/profile`, {
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "NOT_AUTHORIZED"
			};
		}
		return {
			type: "USER",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const authorize = tel => {
	if(!tel){
		return {
			type: "DIALOG_MESSAGE",
			value: "请先登录一下下"
		};
	}
	return {
		type: "WHATEVER"
	};
};
export const getDetail = id => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/${id}`)).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "ARTICLE_DETAIL",
			value: data,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();