import fetch from "isomorphic-fetch";
import {SERVER_NAME} from "../configs";
export const asyncAction = (setting, callback, shouldErrorAlert) => async () => {
	try{
		const {
			path,
			...settings
		} = setting,
		{
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}${path}`, {
			method: "GET",
			credentials: "include",
			...settings
		})).json();
		if(code && shouldErrorAlert){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return callback(data, code);
	}catch(e){
		return {
			type: "DIALOG_MESSAGE",
			value: "网络异常"
		};
	}
};
export const asyncFormAction = (setting, ...rest) => asyncAction.call(null, {
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	...setting
}, ...rest);