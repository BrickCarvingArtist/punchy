import fetch from "isomorphic-fetch";
import {stringify} from "querystring";
import {SERVER_NAME} from "../configs";
export const setMyArticles = (queries, isRefresh) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article?${stringify(queries)}`)).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "MY_ARTICLES",
			value: data,
			isRefresh,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();
export const getAuthorProfile = author => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/profile/${author}`)).json()
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "AUTHOR_PROFILE",
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
export const setAuthorArticles = (queries, isRefresh) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article?${stringify(queries)}`)).json()
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "AUTHOR_ARTICLES",
			value: data,
			isRefresh,
			author: queries.author,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();