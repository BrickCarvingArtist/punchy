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