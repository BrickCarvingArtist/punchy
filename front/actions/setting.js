import fetch from "isomorphic-fetch";
import {server_name} from "../configs";
export const setAvator = file => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${server_name}/api/avator`, {
			method: "PATCH",
			credentials: "include",
			body: file
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "USER_AVATOR",
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
export const updateUserName = name => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${server_name}/api/profile`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: `name=${name}`,
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "USER_NAME",
			value: name,
			ok: 1
		};
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
})();