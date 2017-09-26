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
export const setMyFavorites = (queries, isRefresh) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/article/favorite?${stringify(queries)}`)).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "MY_FAVORITES",
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
export const updateMyFavorites = value => ({
	type: "UPDATE_MY_FAVORITES",
	value
});
export const getAuthorProfile = author => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/profile/${author}`, {
			credentials: "include"
		})).json();
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
export const removeMyArticle = article_id => (async () => {
	// try{
	// 	const {
	// 		code,
	// 		data,
	// 		message
	// 	} = await (await fetch(`${SERVER_NAME}/api/article/${article_id}`, {
	// 		method: "DELETE",
	// 		credentials: "include"
	// 	})).json();
	// 	if(code){
	// 		return {
	// 			type: "DIALOG_MESSAGE",
	// 			value: message
	// 		};
	// 	}
	// 	return {
	// 		type: "UPDATE"
	// 	};
	// }catch(e){
	// 	return {
	// 		type: "DIALOG_MESSAGE",
	// 		value: "网络异常"
	// 	};
	// }
})();
export const setAuthorArticles = (queries, isRefresh) => (async () => {
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
export const focus = author => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/relation/focus`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: stringify({
				author
			}),
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "UPDATE_FOCUS",
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
export const setMyFocuses = (queries, isRefresh) => (async () => {
	try{
		const {
			code,
			data,
			message
		} = await (await fetch(`${SERVER_NAME}/api/relation/focus?${stringify(queries)}`, {
			credentials: "include"
		})).json();
		if(code){
			return {
				type: "DIALOG_MESSAGE",
				value: message
			};
		}
		return {
			type: "MY_FOCUSES",
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
export const updateMyFocuses = value => ({
	type: "UPDATE_MY_FOCUSES",
	value
});