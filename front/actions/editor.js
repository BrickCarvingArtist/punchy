import fetch from "isomorphic-fetch";
import {server_name} from "../configs";
import {stringify} from "querystring";
export const saveAll = ({...value}) => ({
	type: "DRAFT_ALL",
	value
});
export const insert = article => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${server_name}/api/article`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: stringify(article),
			credentials: "include"
		})).json();
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
export const update = (id, article) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${server_name}/api/article/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: stringify(article),
			credentials: "include"
		})).json();
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
export const clearDraft = value => ({
	type: "CLEAR_DRAFT",
	value
});